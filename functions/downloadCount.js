// serverless-function-download.js

const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbFilePath = path.join(__dirname, 'data', 'downloadCount.db');

// Create and open the SQLite database connection
const db = new sqlite3.Database(dbFilePath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to the database.');
  }
});

// Create a table to store the download count if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS download_counts (
    id INTEGER PRIMARY KEY,
    count INTEGER DEFAULT 0
  );
`);

let downloadCount = 0;

// Read the download count from the database on server startup
db.get('SELECT count FROM download_counts WHERE id = 1', (err, row) => {
  if (err) {
    console.error('Error reading download count from the database:', err);
  } else {
    if (row) {
      downloadCount = row.count;
    } else {
      // Insert the initial download count into the database
      db.run('INSERT INTO download_counts (id, count) VALUES (?, ?)', [1, downloadCount], (err) => {
        if (err) {
          console.error('Error inserting initial download count:', err);
        }
      });
    }
  }
});

exports.handler = async function (event, context) {
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify({ downloadCount }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  } else if (event.httpMethod === 'POST') {
    downloadCount++;
    console.log('Incremented downloadCount:', downloadCount); // Log the incremented count for debugging

    // Update the download count in the database
    db.run('UPDATE download_counts SET count = ? WHERE id = ?', [downloadCount, 1], (err) => {
      if (err) {
        console.error('Error updating download count in the database:', err);
      }
    });

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
