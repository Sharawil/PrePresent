import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(request: NextRequest) {
  try {
    const { projectInfo } = await request.json();

    if (!projectInfo || !projectInfo.trim()) {
      return NextResponse.json(
        { error: 'Project information is required' },
        { status: 400 }
      );
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `Analyze this student project and generate a presentation plan:

Project Info: ${projectInfo}

Return ONLY a valid JSON object matching this structure (no markdown formatting, no code blocks):
{
  "script": "A clear, well-structured presentation script (2-3 minutes long)",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "explanations": {
    "keyword1": "Simple explanation of what this is and why it's used",
    "keyword2": "Simple explanation of what this is and why it's used"
  },
  "viva": [
    { "question": "Expected viva question?", "answer": "Clear, concise answer" }
  ]
}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'groq/compound',
      response_format: { type: 'json_object' },
    });

    const responseText = chatCompletion.choices[0]?.message?.content || '{}';
    const parsed = JSON.parse(responseText);

    return NextResponse.json({
      script: parsed.script || 'Presentation script could not be generated.',
      keywords: parsed.keywords || [],
      explanations: parsed.explanations || {},
      viva: parsed.viva || [],
    });
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate presentation' },
      { status: 500 }
    );
  }
}