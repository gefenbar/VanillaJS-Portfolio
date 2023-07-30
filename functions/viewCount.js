// serverless-function-view.js

const fs = require('fs');

const viewCountFilePath = 'viewCount.json';

let viewCount = 0;

// Read the initial view count from the storage (e.g., a file) on server startup
try {
  const data = fs.readFileSync(viewCountFilePath, 'utf8');
  viewCount = parseInt(data, 10);
} catch (err) {
  console.error('Error reading view count file:', err);
}

exports.handler = async function (event, context) {
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify({ viewCount }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  } else if (event.httpMethod === 'POST') {
    viewCount++;
    console.log('Incremented viewCount:', viewCount); // Log the incremented count for debugging

    // Update the view count in the storage (e.g., a file)
    try {
      fs.writeFileSync(viewCountFilePath, viewCount.toString(), 'utf8');
      console.log('View count updated successfully:', viewCount); // Log the updated count for debugging
    } catch (err) {
      console.error('Error updating view count:', err);
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
