import { GoogleGenerativeAI } from '@google/generative-ai';

export async function testModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash', 'gemini-1.0-pro'];

  for (const modelName of models) {
    try {
      console.log(`Testing model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Hello! Answer with "OK"');
      console.log(`Success for ${modelName}:`, result.response.text());
      return;
    } catch (err) {
      console.error(`Failed for ${modelName}:`, err.message);
    }
  }
}