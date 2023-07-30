const fs = require('fs');
const path = require('path');

const viewCountFile = path.join(__dirname, 'viewCount.json');
let viewCount = 0;
console.log('viewCount '+ viewCount)
try {
  const data = fs.readFileSync(viewCountFile, 'utf8');
  viewCount = JSON.parse(data).count;
} catch (error) {
  console.error('Error reading viewCount file:', error);
}

exports.handler = async (event, context) => {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify({ viewCount }),
    };
  } else {
    viewCount++;
    try {
      fs.writeFileSync(viewCountFile, JSON.stringify({ count: viewCount }), 'utf8');
    } catch (error) {
      console.error('Error writing viewCount file:', error);
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "View count incremented successfully." }),
    };
  }
};
