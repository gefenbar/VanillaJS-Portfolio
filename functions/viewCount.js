const db = require('./db');

exports.handler = async (event, context) => {
  if (event.httpMethod === "GET") {
    db.get('SELECT count FROM counts WHERE name = ?', 'viewCount', (err, row) => {
      if (err) {
        console.error('Error reading viewCount:', err);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Error reading viewCount' }),
        };
      } else {
        const viewCount = row.count;
        return {
          statusCode: 200,
          body: JSON.stringify({ viewCount }),
        };
      }
    });
  } else {
    db.run('UPDATE counts SET count = count + 1 WHERE name = ?', 'viewCount', (err) => {
      if (err) {
        console.error('Error updating viewCount:', err);
      }
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "View count incremented successfully." }),
    };
  }
};
