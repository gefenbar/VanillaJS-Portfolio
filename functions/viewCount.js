// viewCount.js

let viewCount = 0;

exports.handler = async (event, context) => {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify({ viewCount }),
    };
  } else {
    viewCount++;
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "View count incremented successfully." }),
    };
  }
};
