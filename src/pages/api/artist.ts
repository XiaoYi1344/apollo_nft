import type { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing image id' });
  }

  try {
    // Build Cloudinary URL
    const cloudUrl = `https://res.cloudinary.com/dr6cnnvma/image/upload/v1763435987/${id}.png`;

    const response = await fetch(cloudUrl);
    if (!response.ok) return res.status(502).json({ error: 'Failed to fetch image' });

    // Cache 5 phút
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');

    const contentType = response.headers.get('content-type') || 'image/png';
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

    await pipelineAsync(stream, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
