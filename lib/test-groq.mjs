import dotenv from 'dotenv';
dotenv.config();

console.log('GROQ_API_KEY loaded:', !!process.env.GROQ_API_KEY);

import { generatePresentation } from './ai-service-groq.mjs';

async function testGroqAI() {
  const projectInfo = `A web application that predicts house prices using React, TensorFlow.js, and a Random Forest algorithm. Users input property features (square footage, number of rooms, location) and get price predictions with interactive charts. The app uses Next.js for the frontend and includes user authentication.`;

  console.log('Testing Groq AI service with project...');
  const result = await generatePresentation(projectInfo);

  console.log('\n=== Presentation Script ===');
  console.log(result.script);

  console.log('\n=== Technical Keywords ===');
  console.log(result.keywords);

  console.log('\n=== Concept Explanations ===');
  console.log(JSON.stringify(result.explanations, null, 2));

  console.log('\n=== Expected Viva Questions ===');
  console.log(JSON.stringify(result.viva, null, 2));
}

testGroqAI().catch(console.error);