import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch'; // or built-in fetch in Node 18+

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    res.status(400).send('Invalid ID');
    return;
  }

  // Build Cloudinary URL
  const cloudinaryUrl = `https://res.cloudinary.com/dr6cnnvma/image/upload/${id}.png`;

  try {
    const response = await fetch(cloudinaryUrl);

    if (!response.ok) {
      res.status(response.status).send('Image not found on Cloudinary');
      return;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Set content type from Cloudinary response
    const contentType = response.headers.get('content-type') || 'image/png';

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Cache-Control', 'public, max-age=3600'); // optional caching
    res.status(200).end(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error fetching image');
  }
}
