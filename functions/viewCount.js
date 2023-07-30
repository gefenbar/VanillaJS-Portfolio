// serverless-function.js

const DataStore = require('data-store');
const viewCountStore = new DataStore({ path: 'viewCount.json' });

let viewCount = viewCountStore.get('count', 0);

exports.handler = async function (event, context) {
  if (event.httpMethod === 'GET') {
    viewCount++;
    viewCountStore.set('count', viewCount); // Update the view count in the data store

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
