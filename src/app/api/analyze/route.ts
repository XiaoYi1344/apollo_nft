// app/api/analyze/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // chỉ server-side
});

export async function POST(req: NextRequest) {
  const { fileName } = await req.json();

  try {
    const prompt = `Analyze this file named "${fileName}" and provide 3-5 NFT properties in JSON array format.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
    });

    const text = response.choices[0].message?.content || '[]';
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = [{ trait_type: 'Color', value: 'Blue', confidence: 0.9 }];
    }

    return NextResponse.json(parsed);
  } catch (err) {
    return NextResponse.json({ error: 'AI analysis failed' }, { status: 500 });
  }
}
