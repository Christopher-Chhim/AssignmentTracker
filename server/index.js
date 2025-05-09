const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const assignmentRoutes = require('./routes/assignments');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/assignments', assignmentRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

