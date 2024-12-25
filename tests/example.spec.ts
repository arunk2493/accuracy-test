import { test, expect } from '@playwright/test';
import { LMStudioAPI } from '../src/utils/lm-studio-helper';
import { config } from '../src/config/framework.config';
import { beforeEach } from 'node:test';

// Initialize the LM Studio API client with the base URL from config
const lmStudioAPI = new LMStudioAPI(config.baseUrl);

const requestBody = {
  "model": "meta-llama-3.1-8b-instruct",
  "messages": [ 
    { "role": "user", "content": "Capital of France" }
  ], 
  "temperature": 0.7, 
  "max_tokens": -1,
  "stream": false
};

test.describe('LM Studio API Tests', () => {
  
  // Test to validate that the model starts and responds correctly
  test('Validate model response to a prompt', async () => {
      
    // Query the model using the defined prompt
    const response = await lmStudioAPI.queryModel(requestBody);

    // Log the model response
    console.log('Model Response:', response);

    // Validate that the model's response matches the expected output
    expect(response.choices[0].message.content).toContain('Paris')
  });
});