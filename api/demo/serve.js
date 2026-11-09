import { Readable } from 'node:stream';
import { asyncHandler, openBuildStream, readActiveSlug } from '../../lib/demoAdmin.js';

const FALLBACK_BUILD = '/jogos/default.html';

export default asyncHandler(async function serveDemo(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.status(405).json({ error: 'Use GET.' });
    return;
  }

  res.setHeader('Cache-Control', 'no-store');

  const slug = await readActiveSlug();
  if (!slug) {
    res.redirect(302, FALLBACK_BUILD);
    return;
  }

  const stream = await openBuildStream(slug);
  if (!stream) {
    res.redirect(302, FALLBACK_BUILD);
    return;
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Demo-Build', slug);
  Readable.fromWeb(stream).pipe(res);
});
