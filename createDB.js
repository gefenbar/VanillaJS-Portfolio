// createDB.js

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

// Create a table to store the download count
db.run(`
  CREATE TABLE IF NOT EXISTS download_counts (
    id INTEGER PRIMARY KEY,
    count INTEGER DEFAULT 0
  );
`, (err) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Table created successfully.');
  }

  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed.');
    }
  });
});
