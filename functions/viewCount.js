const fs = require('fs');
const path = require('path');

const viewCountFile = path.join(__dirname, 'viewCount.json');
let viewCount = 0;

// Read the current view count from the file
fs.readFile(viewCountFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading viewCount file:', err);
  } else {
    viewCount = JSON.parse(data).count;
  }
});

exports.handler = async (event, context) => {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify({ viewCount }),
    };
  } else {
    viewCount++;
    // Write the updated count to the file
    fs.writeFile(viewCountFile, JSON.stringify({ count: viewCount }), 'utf8', (err) => {
      if (err) {
        console.error('Error writing viewCount file:', err);
      }
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "View count incremented successfully." }),
    };
  }
};
