// serverless-function-download.js

const fs = require('fs');

const downloadCountFilePath = 'downloadCount.json';

let downloadCount = 0;

// Read the initial download count from the storage (e.g., a file) on server startup
fs.readFile(downloadCountFilePath, 'utf8', (err, data) => {
  if (!err) {
    downloadCount = Number(data);
  }
});

exports.handler = async function (event, context) {
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify({ downloadCount }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  } else if (event.httpMethod === 'POST') {
    downloadCount++;
    // Update the download count in the storage (e.g., a file)
    fs.writeFile(downloadCountFilePath, downloadCount.toString(), 'utf8', (err) => {
      if (err) {
        console.error('Error updating download count:', err);
      }
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ downloadCount }),
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
