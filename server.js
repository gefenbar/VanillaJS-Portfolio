const express = require('express');
const cors = require('cors');
const app = express();
let viewCount = 0;

app.use(cors()); // Allow all origins, you can restrict it to specific domains if needed

app.get('/api/view', (req, res) => {
  viewCount++;
  res.json({ viewCount });
});

app.listen(3004, () => {
  console.log('Server running on port 3004');
});
