// serverless-function.js

const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbFilePath = path.join(__dirname, 'data', 'viewCount.db');

// Create and open the SQLite database connection
const db = new sqlite3.Database(dbFilePath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to the database.');
  }
});

// Create a table to store the view count if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS view_counts (
    id INTEGER PRIMARY KEY,
    count INTEGER DEFAULT 0
  );
`);

let viewCount = 0;

// Read the view count from the database on server startup
db.get('SELECT count FROM view_counts WHERE id = 1', (err, row) => {
  if (err) {
    console.error('Error reading view count from the database:', err);
  } else {
    if (row) {
      viewCount = row.count;
    } else {
      // Insert the initial view count into the database
      db.run('INSERT INTO view_counts (id, count) VALUES (?, ?)', [1, viewCount], (err) => {
        if (err) {
          console.error('Error inserting initial view count:', err);
        }
      });
    }
  }
});

exports.handler = async function (event, context) {
  if (event.httpMethod === 'GET') {
    viewCount++;
    // Update the view count in the database
    db.run('UPDATE view_counts SET count = ? WHERE id = ?', [viewCount, 1], (err) => {
      if (err) {
        console.error('Error updating view count in the database:', err);
      }
    });

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
