exports.handler = async function (event, context) {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  // Retrieve the view count from the environment variable
  let viewCount = process.env.VIEW_COUNT ? parseInt(process.env.VIEW_COUNT) : 0;

  // Increment the view count
  viewCount++;

  // Return the updated view count in the response
  return {
    statusCode: 200,
    body: JSON.stringify({ viewCount }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  };
};
