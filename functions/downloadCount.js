// downloadCount.js

let downloadCount = 0;

exports.handler = async (event, context) => {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify({ downloadCount }),
    };
  } else {
    downloadCount++;
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Download count incremented successfully." }),
    };
  }
};
