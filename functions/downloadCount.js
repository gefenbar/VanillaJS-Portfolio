const fs = require('fs');
const path = require('path');

const downloadCountFile = path.join(__dirname, 'downloadCount.json');
let downloadCount = 0;

try {
  const data = fs.readFileSync(downloadCountFile, 'utf8');
  downloadCount = JSON.parse(data).count;
} catch (error) {
  console.error('Error reading downloadCount file:', error);
}

exports.handler = async (event, context) => {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify({ downloadCount }),
    };
  } else {
    downloadCount++;
    try {
      fs.writeFileSync(downloadCountFile, JSON.stringify({ count: downloadCount }), 'utf8');
    } catch (error) {
      console.error('Error writing downloadCount file:', error);
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Download count incremented successfully." }),
    };
  }
};
