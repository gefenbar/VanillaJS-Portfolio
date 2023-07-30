const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS counts (
      name TEXT PRIMARY KEY,
      count INTEGER NOT NULL
    )
  `);

  db.get('SELECT * FROM counts WHERE name = ?', 'viewCount', (err, row) => {
    if (!row) {
      db.run('INSERT INTO counts (name, count) VALUES (?, ?)', 'viewCount', 0);
    }
  });

  db.get('SELECT * FROM counts WHERE name = ?', 'downloadCount', (err, row) => {
    if (!row) {
      db.run('INSERT INTO counts (name, count) VALUES (?, ?)', 'downloadCount', 0);
    }
  });
});

module.exports = db;
