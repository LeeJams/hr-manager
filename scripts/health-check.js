#!/usr/bin/env node

/**
 * Health Check Script for Blue-Green Deployment
 * Checks if the application is running and responding correctly
 */

const http = require('http');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const TIMEOUT = parseInt(process.env.HEALTH_CHECK_TIMEOUT || '5000', 10);

function checkHealth() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: HOST,
      port: PORT,
      path: '/',
      method: 'GET',
      timeout: TIMEOUT,
    };

    const req = http.request(options, (res) => {
      if (res.statusCode === 200 || res.statusCode === 307) {
        console.log(`✓ Health check passed (Status: ${res.statusCode})`);
        resolve(true);
      } else {
        console.error(`✗ Health check failed (Status: ${res.statusCode})`);
        reject(new Error(`Unexpected status code: ${res.statusCode}`));
      }
    });

    req.on('timeout', () => {
      req.destroy();
      console.error(`✗ Health check timeout after ${TIMEOUT}ms`);
      reject(new Error('Health check timeout'));
    });

    req.on('error', (error) => {
      console.error(`✗ Health check error: ${error.message}`);
      reject(error);
    });

    req.end();
  });
}

async function main() {
  console.log(`Checking health of ${HOST}:${PORT}...`);

  try {
    await checkHealth();
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
}

main();