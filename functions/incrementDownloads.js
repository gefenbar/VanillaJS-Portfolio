//functions/incrementDownloads.js
const faunadb = require('faunadb');
const { Update, Collection, Lambda, Match, Index } = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET, // The FaunaDB secret key should be stored as an environment variable in Netlify
});

exports.handler = async function (event, context) {
  try {
    await client.query(
      Update(Match(Index('downloads_count')), { data: { count: Lambda('x', Add(1, 'x')) } })
    );

    return {
      statusCode: 204,
      body: '',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' }),
    };
  }
};
