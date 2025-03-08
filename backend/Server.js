const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//mongoDB  connection
const uri = "mongodb://localhost:27017/cd "

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));


const birdSchema = new mongoose.Schema({
    type: String,
    number: Number,
    eggsPerDay: Number,
    inBasket: Boolean,
    mortality: Number,
    purchasePrice: Number,
});

const Bird = mongoose.model('Bird', birdSchema);

const farmSchema = new mongoose.Schema({
    name: String,
    location: String,
    owner: String,
    // ... other farm-related fields
});

const Farm = mongoose.model('Farm', farmSchema);

const feedSchema = new mongoose.Schema({
    name: String,
    type: String, // e.g., "starter", "grower", "finisher"
    price: Number,
    // ... other feed-related fields
});

const Feed = mongoose.model('Feed', feedSchema);


// --- API Routes ---

// Birds
app.get('/api/birds', async (req, res) => {
    try {
        const birds = await Bird.find();
        res.json(birds);
    } catch (error) {
        console.error("Error fetching birds:", error);
        res.status(500).json({ error: "Failed to fetch birds" });
    }
});

app.post('/api/birds/add', async (req, res) => {
    try {
        const newBird = new Bird(req.body);
        await newBird.save();
        res.status(201).json(newBird);
    } catch (error) {
        console.error("Error adding bird:", error);
        res.status(500).json({ error: "Failed to add bird" });
    }
});

// ... (other bird routes: update, delete, etc.)

// Farms
app.get('/api/farms', async (req, res) => {
    try {
        const farms = await Farm.find();
        res.json(farms);
    } catch (error) {
        console.error("Error fetching farms:", error);
        res.status(500).json({ error: "Failed to fetch farms" });
    }
});

app.post('/api/farms/add', async (req, res) => {
    try {
        const newFarm = new Farm(req.body);
        await newFarm.save();
        res.status(201).json(newFarm);
    } catch (error) {
        console.error("Error adding farm:", error);
        res.status(500).json({ error: "Failed to add farm" });
    }
});

// ... (other farm routes)

// Feeds
app.get('/api/feeds', async (req, res) => {
    try {
        const feeds = await Feed.find();
        res.json(feeds);
    } catch (error) {
        console.error("Error fetching feeds:", error);
        res.status(500).json({ error: "Failed to fetch feeds" });
    }
});

app.post('/api/feeds/add', async (req, res) => {
    try {
        const newFeed = new Feed(req.body);
        await newFeed.save();
        res.status(201).json(newFeed);
    } catch (error) {
        console.error("Error adding feed:", error);
        res.status(500).json({ error: "Failed to add feed" });
    }
});

// ... (other feed routes)

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});