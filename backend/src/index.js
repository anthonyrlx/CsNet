const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(cors());
app.use(express.json());

app.use(express.static('frontend/public/'));

app.get('/', (req, res) => {
  return res.sendFile('index.html');
});

app.use(require('./routes'));

mongoose.connect('mongodb://root:csnet123@ds121406.mlab.com:21406/csnet_db',
  {
    useNewUrlParser: true
  }
);

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

