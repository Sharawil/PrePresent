import fetch from 'node-fetch';

async function testWebAPI() {
  const projectInfo = `A web application that predicts house prices using React, TensorFlow.js, and a Random Forest algorithm. Users input property features (square footage, number of rooms, location) and get price predictions with interactive charts. The app uses Next.js for the frontend and includes user authentication.`;

  try {
    const response = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectInfo }),
    });

    const result = await response.json();
    console.log('Response:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}

testWebAPI();