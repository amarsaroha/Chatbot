const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send(' Backend is working');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;




