const db = require('./db');

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod === 'GET') {
      db.get('SELECT count FROM counts WHERE name = ?', 'downloadCount', (err, row) => {
        if (err) {
          console.error('Error reading downloadCount:', err);
          return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error reading downloadCount' }),
          };
        } else {
          const downloadCount = row.count;
          return {
            statusCode: 200,
            body: JSON.stringify({ downloadCount }),
          };
        }
      });
    } else {
      db.run('UPDATE counts SET count = count + 1 WHERE name = ?', 'downloadCount', (err) => {
        if (err) {
          console.error('Error updating downloadCount:', err);
          return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error updating downloadCount' }),
          };
        } else {
          return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Download count incremented successfully.' }),
          };
        }
      });
    }
  } catch (error) {
    console.error('Internal server error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
