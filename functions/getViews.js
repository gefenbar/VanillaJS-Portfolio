const faunadb = require('faunadb');
const { Get, Collection, Match, Index } = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
});

exports.handler = async function (event, context) {
  try {
    const response = await client.query(
      Get(Match(Index('views_count')))
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