// serverless-function.js

const fs = require('fs');
const path = require('path');

const viewCountFilePath = path.join(__dirname, 'data', 'viewCount.json');
const downloadCountFilePath = path.join(__dirname, 'data', 'downloadCount.json');

let viewCount;
let downloadCount;

// Read the view count from the storage (e.g., a file) on server startup
try {
  const viewCountData = fs.readFileSync(viewCountFilePath, 'utf8');
  const viewCountJson = JSON.parse(viewCountData);
  viewCount = viewCountJson.viewCount || 0;
} catch (err) {
  console.error('Error reading view count file:', err);
  viewCount = 0;
}

// Read the download count from the storage (e.g., a file) on server startup
try {
  const downloadCountData = fs.readFileSync(downloadCountFilePath, 'utf8');
  const downloadCountJson = JSON.parse(downloadCountData);
  downloadCount = downloadCountJson.downloadCount || 0;
} catch (err) {
  console.error('Error reading download count file:', err);
  downloadCount = 0;
}

exports.handler = async function (event, context) {
  if (event.httpMethod === 'GET') {
    viewCount++;
    // Update the view count in the storage (e.g., a file)
    try {
      const viewCountJsonData = { viewCount };
      fs.writeFileSync(viewCountFilePath, JSON.stringify(viewCountJsonData), 'utf8');
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
  } else if (event.httpMethod === 'POST') {
    downloadCount++;
    // Update the download count in the storage (e.g., a file)
    try {
      const downloadCountJsonData = { downloadCount };
      fs.writeFileSync(downloadCountFilePath, JSON.stringify(downloadCountJsonData), 'utf8');
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
