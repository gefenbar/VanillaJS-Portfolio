// serverless-function.js

const fs = require('fs');
const lockFile = require('lockfile');

const viewCountFilePath = 'viewCount.json';
const lockFilePath = 'viewCount.lock';

let viewCount = 0;

// Read the view count from the storage (e.g., a file) on server startup
try {
  lockFile.lockSync(lockFilePath); // Acquire the lock to prevent conflicts
  const data = fs.readFileSync(viewCountFilePath, 'utf8');
  viewCount = parseInt(data, 10);
  if (isNaN(viewCount)) {
    viewCount = 0;
  }
} catch (err) {
  console.error('Error reading view count file:', err);
  viewCount = 0;
} finally {
  lockFile.unlockSync(lockFilePath); // Release the lock
}

exports.handler = async function (event, context) {
  if (event.httpMethod === 'GET') {
    viewCount++;
    // Update the view count in the storage (e.g., a file)
    try {
      lockFile.lockSync(lockFilePath); // Acquire the lock to prevent conflicts
      fs.writeFileSync(viewCountFilePath, viewCount.toString(), 'utf8');
    } catch (err) {
      console.error('Error updating view count:', err);
    } finally {
      lockFile.unlockSync(lockFilePath); // Release the lock
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ viewCount }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }
};
