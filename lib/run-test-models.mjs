import dotenv from 'dotenv';
dotenv.config();

import { testModels } from './test-models.mjs';

testModels().catch(console.error);