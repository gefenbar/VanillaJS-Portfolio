// serverless-function-view.js

const fs = require('fs');

const viewCountFilePath = 'viewCount.json';

let viewCount = 0;

// Read the initial view count from the storage (e.g., a file) on server startup
fs.readFile(viewCountFilePath, 'utf8', (err, data) => {
  if (!err) {
    viewCount = Number(data);
  }
});

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
    // Update the view count in the storage (e.g., a file)
    fs.writeFile(viewCountFilePath, viewCount.toString(), 'utf8', (err) => {
      if (err) {
        console.error('Error updating view count:', err);
      } else {
        return {
          statusCode: 200,
          body: JSON.stringify({ viewCount }),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        };
      }
    });
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }
};
