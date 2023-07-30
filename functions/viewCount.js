const sqlite3 = require('sqlite3');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const dbFile = path.join(__dirname, process.env.DB_FILENAME || 'mydatabase.db');
const db = new sqlite3.Database(dbFile);

// Create the database table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS viewCounts (
    id INTEGER PRIMARY KEY,
    count INTEGER NOT NULL
  )
`);

// Get the view count from the database
let viewCount = 0;

db.get('SELECT count FROM viewCounts WHERE id = 1', (err, row) => {
  if (err) {
    console.error('Error reading view count from the database:', err);
  } else {
    if (row) {
      viewCount = row.count;
    } else {
      // If no record found, insert the initial count
      db.run('INSERT INTO viewCounts (id, count) VALUES (?, ?)', [1, viewCount]);
    }
  }
});

exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify({ viewCount }),
    };
  } else {
    viewCount++;

    // Update the view count in the database
    db.run('UPDATE viewCounts SET count = ? WHERE id = ?', [viewCount, 1], (err) => {
      if (err) {
        console.error('Error updating view count in the database:', err);
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'View count incremented successfully.' }),
    };
  }
};
