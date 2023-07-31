const faunadb = require('faunadb');
const { Update, Collection, Lambda, Match, Index, Add } = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
});

exports.handler = async function (event, context) {
  try {
    await client.query(
      Update(Match(Index('downloads_count')), { data: { count: Add(1, Lambda('x', 'x')) } })
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
