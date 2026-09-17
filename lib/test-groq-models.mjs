import dotenv from 'dotenv';
dotenv.config();

import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function testModels() {
  try {
    const models = await groq.models.list();
    console.log('Available models:');
    models.data.forEach(m => console.log(' -', m.id));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testModels();