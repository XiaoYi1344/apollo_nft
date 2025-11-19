import type { NextApiRequest, NextApiResponse } from 'next';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { Readable } from 'stream';
import sharp from 'sharp';

const pipelineAsync = promisify(pipeline);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, banner } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing image id' });
  }

  try {
    // Build actual storage URL (replace this with your real storage path)
    const imageUrl = `https://mybucket.s3.amazonaws.com/${id}`;

    const response = await fetch(imageUrl);
    if (!response.ok) return res.status(502).json({ error: 'Failed to fetch image' });

    // Cache 5 minutes
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    res.setHeader('Content-Type', contentType);

    const reader = response.body?.getReader();
    if (!reader) return res.status(500).end();

    const stream = new Readable({
      async read() {
        const { done, value } = await reader.read();
        if (done) this.push(null);
        else this.push(Buffer.from(value));
      },
    });

    // Resize banner images only
    const transformer = banner === 'true'
      ? sharp().resize({ width: 1200 }).jpeg({ quality: 80 })
      : sharp();

    await pipelineAsync(stream, transformer, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
