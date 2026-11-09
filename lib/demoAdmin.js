import crypto from 'node:crypto';
import { del, get, list, put } from '@vercel/blob';

export const MAX_BUILD_BYTES = 4 * 1024 * 1024;

const BUILDS_PREFIX = 'jogos/builds/';
const ACTIVE_PATH = 'jogos/active.txt';
const ACCESS = 'public';
const SLUG_PATTERN = /^[a-z0-9][a-z0-9._-]{4,79}$/;

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function buildPath(slug) {
  return `${BUILDS_PREFIX}${slug}.html`;
}

export function assertValidSlug(slug) {
  if (typeof slug !== 'string' || !SLUG_PATTERN.test(slug)) {
    throw new HttpError(400, 'Nome de build invalido.');
  }
  return slug;
}

export function isAuthorized(req) {
  const secret = process.env.DEMO_ADMIN_TOKEN;
  if (!secret) return false;
  const provided = req.headers['x-demo-passcode'];
  if (typeof provided !== 'string' || provided.length === 0) return false;
  const expected = crypto.createHash('sha256').update(secret).digest();
  const actual = crypto.createHash('sha256').update(provided).digest();
  return crypto.timingSafeEqual(expected, actual);
}

export function requireAuth(req) {
  if (!isAuthorized(req)) {
    throw new HttpError(401, 'Passcode incorreto.');
  }
}

export function asyncHandler(handler) {
  return async function requestHandler(req, res) {
    try {
      await handler(req, res);
    } catch (error) {
      const status = error instanceof HttpError ? error.status : 500;
      const message = error instanceof HttpError ? error.message : 'Falha interna.';
      if (status === 500) console.error('[demo-admin]', error);
      if (!res.headersSent) {
        res.status(status).json({ error: message });
      } else {
        res.end();
      }
    }
  };
}

async function readRawBytes(req, maxBytes, tooLargeMessage) {
  if (Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === 'string') return Buffer.from(req.body, 'utf8');

  const declared = Number(req.headers['content-length']);
  if (Number.isFinite(declared) && declared > maxBytes) throw new HttpError(413, tooLargeMessage);

  const chunks = [];
  let received = 0;
  let overflow = false;
  await new Promise((resolve, reject) => {
    req.on('data', (chunk) => {
      received += chunk.length;
      if (received > maxBytes) {
        // Segue drenando o corpo sem guardar, para o cliente receber o 413 em vez de cair a conexão.
        overflow = true;
        chunks.length = 0;
        return;
      }
      if (!overflow) chunks.push(chunk);
    });
    req.on('end', resolve);
    req.on('error', reject);
  });
  if (overflow) throw new HttpError(413, tooLargeMessage);

  const body = Buffer.concat(chunks);
  if (body.length > maxBytes) throw new HttpError(413, tooLargeMessage);
  return body;
}

export async function readBuildBody(req) {
  const body = await readRawBytes(
    req,
    MAX_BUILD_BYTES,
    `Arquivo acima de ${Math.floor(MAX_BUILD_BYTES / 1024 / 1024)} MB. O limite por upload e o tamanho maximo de uma requisicao no Vercel.`
  );
  if (body.length === 0) throw new HttpError(400, 'Arquivo vazio.');
  const head = body
    .subarray(0, 512)
    .toString('utf8')
    .replace(/^\uFEFF/, '')
    .trimStart()
    .toLowerCase();
  if (!head.startsWith('<!doctype html') && !head.startsWith('<html')) {
    throw new HttpError(415, 'O arquivo precisa ser um HTML standalone (comecando com <!doctype html>).');
  }
  return body;
}

export function makeSlug(label) {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, '0');
  const stamp =
    `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}` +
    `-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const clean = String(label ?? '')
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 28)
    .replace(/-+$/, '');
  const suffix = crypto.randomBytes(2).toString('hex');
  return clean ? `${stamp}-${clean}-${suffix}` : `${stamp}-${suffix}`;
}

export async function readActiveSlug() {
  const result = await get(ACTIVE_PATH, { access: ACCESS, useCache: false });
  if (!result?.stream) return null;
  const slug = (await new Response(result.stream).text()).trim();
  return SLUG_PATTERN.test(slug) ? slug : null;
}

export async function writeActiveSlug(slug) {
  await put(ACTIVE_PATH, assertValidSlug(slug), {
    access: ACCESS,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'text/plain; charset=utf-8',
    cacheControlMaxAge: 60,
  });
}

export async function listBuilds() {
  const { blobs } = await list({ prefix: BUILDS_PREFIX, limit: 100 });
  return blobs
    .map((blob) => ({
      slug: blob.pathname.slice(BUILDS_PREFIX.length).replace(/\.html$/, ''),
      size: blob.size,
      uploadedAt: blob.uploadedAt,
      url: blob.url,
    }))
    .filter((build) => SLUG_PATTERN.test(build.slug))
    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
}

export async function storeBuild(slug, body) {
  return put(buildPath(slug), body, {
    access: ACCESS,
    addRandomSuffix: false,
    allowOverwrite: false,
    contentType: 'text/html; charset=utf-8',
    cacheControlMaxAge: 60 * 60 * 24 * 365,
  });
}

export async function removeBuild(slug) {
  await del(buildPath(assertValidSlug(slug)));
}

export async function openBuildStream(slug) {
  const result = await get(buildPath(assertValidSlug(slug)), { access: ACCESS });
  return result?.stream ?? null;
}
