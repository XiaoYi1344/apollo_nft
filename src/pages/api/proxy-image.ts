// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { url } = req.query;

//   if (!url || typeof url !== 'string') {
//     return res.status(400).json({ error: 'Missing url query parameter' });
//   }

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       return res.status(502).json({ error: 'Failed to fetch image' });
//     }

//     const contentType = response.headers.get('content-type') || 'image/jpeg';
//     const buffer = await response.arrayBuffer();

//     res.setHeader('Content-Type', contentType);
//     res.send(Buffer.from(buffer));
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

// import type { NextApiRequest, NextApiResponse } from 'next';
// import { pipeline } from 'stream';
// import { promisify } from 'util';
// import { Readable } from 'stream';

// const pipelineAsync = promisify(pipeline);

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { url } = req.query;

//   if (!url || typeof url !== 'string') {
//     return res.status(400).json({ error: 'Missing url query parameter' });
//   }

//   try {
//     const response = await fetch(url);
//     if (!response.ok) return res.status(502).json({ error: 'Failed to fetch image' });

//     res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');

//     // response.body là ReadableStream (Web) → convert sang Node.js Readable
//     const reader = response.body?.getReader();
//     if (!reader) return res.status(500).end();

//     const stream = new Readable({
//       async read() {
//         const { done, value } = await reader.read();
//         if (done) {
//           this.push(null);
//         } else {
//           this.push(Buffer.from(value));
//         }
//       },
//     });

//     await pipelineAsync(stream, res);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }


import type { NextApiRequest, NextApiResponse } from 'next';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { Readable } from 'stream';
import sharp from 'sharp';

const pipelineAsync = promisify(pipeline);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing url query parameter' });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) return res.status(502).json({ error: 'Failed to fetch image' });

    // Cache 5 phút
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

    // Resize ảnh banner max width 1200px, giữ avatar size nguyên
    const isBanner = req.query.banner === 'true';
    const transformer = isBanner
      ? sharp().resize({ width: 1200 }).jpeg({ quality: 80 })
      : sharp();

    await pipelineAsync(stream, transformer, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
