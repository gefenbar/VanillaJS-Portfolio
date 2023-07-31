//functions/getViews.js
const faunadb = require('faunadb');
const { GET, Collection, Lambda, Match, Index } = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET, // The FaunaDB secret key should be stored as an environment variable in Netlify
});

exports.handler = async function (event, context) {
  try {
    const response = await client.query(
      GET(Match(Index('views_count')))
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ views: response.data.count }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' }),
    };
  }
};
