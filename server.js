const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas (replace <your-mongodb-atlas-connection-string> with your actual connection string)
const connectionString = 'mongodb+srv://gefenbar:<password>@cluster0.sqrolij.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});

// Create a schema and model for the counts collection
const countSchema = new mongoose.Schema({
  viewCount: {
    type: Number,
    default: 0,
  },
  downloadCount: {
    type: Number,
    default: 0,
  },
});

const Count = mongoose.model('Count', countSchema);

app.use(cors());
app.use(bodyParser.json());

// Get the current view count from the database
app.get('/api/view-count', async (req, res) => {
  try {
    const count = await Count.findOne();
    res.json({ viewCount: count.viewCount });
  } catch (error) {
    console.error('Error retrieving view count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get the current download count from the database
app.get('/api/download-count', async (req, res) => {
  try {
    const count = await Count.findOne();
    res.json({ downloadCount: count.downloadCount });
  } catch (error) {
    console.error('Error retrieving download count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Increment the download count in the database
app.post('/api/increment-download', async (req, res) => {
  try {
    await Count.findOneAndUpdate({}, { $inc: { downloadCount: 1 } });
    const updatedCount = await Count.findOne();
    res.json({ downloadCount: updatedCount.downloadCount });
  } catch (error) {
    console.error('Error incrementing download count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
