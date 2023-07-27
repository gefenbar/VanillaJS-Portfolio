let downloadCount = Number(process.env.DOWNLOAD_COUNT || 0);

exports.handler = async function (event, context) {
  if (event.httpMethod === 'GET') {
    downloadCount++;
    process.env.DOWNLOAD_COUNT = downloadCount.toString();

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
