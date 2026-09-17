import { generatePresentation } from './ai-service';

async function testAI() {
  const projectInfo = `A web application that predicts house prices using React, TensorFlow.js, and a Random Forest algorithm. Users input property features (square footage, number of rooms, location) and get price predictions with interactive charts. The app uses Next.js for the frontend and includes user authentication.`;

  console.log('Testing AI service with project:', projectInfo);
  const result = await generatePresentation(projectInfo);

  console.log('\n=== Result ===');
  console.log('Script:', result.script);
  console.log('Keywords:', result.keywords);
  console.log('Explanations:', result.explanations);
  console.log('Viva Questions:', result.viva);
}

testAI().catch(console.error);