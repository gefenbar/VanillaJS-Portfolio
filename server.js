const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Connect to MongoDB (you need to have MongoDB installed and running)
mongoose.connect('mongodb://localhost:27017/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the schema and model for the counts
const countSchema = new mongoose.Schema({
  views: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 },
});

const Count = mongoose.model('Count', countSchema);

// Middleware to increase the view count when the website loads
app.get('/api/views', async (req, res) => {
  try {
    // Fetch the current view count
    let count = await Count.findOne();
    if (!count) {
      // If no count exists, create a new one
      count = new Count();
    }

    // Increase the view count
    count.views++;
    await count.save();

    res.json({ views: count.views });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to increase the download count when the download button is clicked
app.post('/api/downloads', async (req, res) => {
  try {
    // Fetch the current download count
    let count = await Count.findOne();
    if (!count) {
      // If no count exists, create a new one
      count = new Count();
    }

    // Increase the download count
    count.downloads++;
    await count.save();

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
