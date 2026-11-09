import {
  asyncHandler,
  makeSlug,
  readBuildBody,
  requireAuth,
  storeBuild,
  writeActiveSlug,
} from '../../lib/demoAdmin.js';

export default asyncHandler(async function uploadDemo(req, res) {
  requireAuth(req);
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Use POST.' });
    return;
  }

  const body = await readBuildBody(req);
  const slug = makeSlug(req.query?.label);
  const blob = await storeBuild(slug, body);
  await writeActiveSlug(slug);

  res.status(201).json({
    build: {
      slug,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
      url: blob.url,
    },
    active: slug,
  });
});
