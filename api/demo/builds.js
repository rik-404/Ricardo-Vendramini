import {
  HttpError,
  asyncHandler,
  assertValidSlug,
  listBuilds,
  readActiveSlug,
  removeBuild,
  requireAuth,
  writeActiveSlug,
} from '../../lib/demoAdmin.js';

export default asyncHandler(async function demoBuilds(req, res) {
  requireAuth(req);

  if (req.method === 'GET') {
    const [builds, active] = await Promise.all([listBuilds(), readActiveSlug()]);
    res.status(200).json({ active, builds });
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Use GET ou POST.' });
    return;
  }

  const action = req.query?.action;
  const slug = assertValidSlug(req.query?.slug);
  const current = await readActiveSlug();

  if (action === 'activate') {
    await writeActiveSlug(slug);
    res.status(200).json({ active: slug });
    return;
  }

  if (action === 'delete') {
    if (slug === current) {
      throw new HttpError(409, 'Este build esta ativo. Ative outro antes de apagar.');
    }
    await removeBuild(slug);
    res.status(200).json({ active: current, removed: slug });
    return;
  }

  throw new HttpError(400, 'Acao desconhecida.');
});
