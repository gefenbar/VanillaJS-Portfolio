// serverless-function-download.js

const fs = require('fs');

const downloadCountFilePath = 'downloadCount.json';

let downloadCount;

// Read the download count from the storage (e.g., a file) on server startup
try {
  const data = fs.readFileSync(downloadCountFilePath, 'utf8');
  downloadCount = parseInt(data, 10);
  if (isNaN(downloadCount)) {
    downloadCount = 0;
  }
} catch (err) {
  console.error('Error reading download count file:', err);
  downloadCount = 0;
}

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
    console.log('Incremented downloadCount:', downloadCount); // Log the incremented count for debugging

    // Update the download count in the storage (e.g., a file)
    try {
      fs.writeFileSync(downloadCountFilePath, downloadCount.toString(), 'utf8');
      console.log('Download count updated successfully:', downloadCount); // Log the updated count for debugging
    } catch (err) {
      console.error('Error updating download count:', err);
    }

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
