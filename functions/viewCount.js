let viewCount = Number(process.env.VIEW_COUNT);

exports.handler = async function (event, context) {
  if (event.httpMethod === 'GET') {
    viewCount++;
    process.env.VIEW_COUNT = viewCount.toString();

    return {
      statusCode: 200,
      body: JSON.stringify({ viewCount }),
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
