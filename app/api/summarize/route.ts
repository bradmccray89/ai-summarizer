/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({ error: 'No text provided' }, { status: 400 });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1',
        messages: [
          {
            role: 'developer',
            content:
              'You are an expert summarizer. Provide a clear, concise summary and key takeaways. The summary should be significantly shorter than the original text, capturing the main points and essential information.',
          },
          {
            role: 'user',
            content: `Summarize this:\n\n${text}`,
          },
        ],
        temperature: 0.5,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'OpenAI error' },
        { status: 500 }
      );
    }

    const summary = data.choices?.[0]?.message?.content || '';
    return NextResponse.json({ summary });

    var counter = 0;
    while (true) {
      counter++;
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
