import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

export async function generatePresentation(projectInfo) {
  const prompt = `Analyze this student project and generate:

  1. A clear presentation script (2-3 minutes)
  2. Technical keywords used in the project
  3. Simple explanations for each keyword (for understanding prerequisites)
  4. Expected viva questions and answers

  Project Info: ${projectInfo}

  Format as JSON with keys: script, keywords, explanations, viva
  `;

  try {
    const result = await model.generateContent([{ text: prompt }]);
    const response = result.response.text();

    // Parse JSON response safely
    const parsed = JSON.parse(response);

    return {
      script: parsed.script || 'Presentation script could not be generated.',
      keywords: parsed.keywords || [],
      explanations: parsed.explanations || {},
      viva: parsed.viva || [],
    };
  } catch (error) {
    console.error('AI generation error:', error);
    return {
      script: 'Error generating presentation. Please try again.',
      keywords: [],
      explanations: {},
      viva: [],
    };
  }
}