const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const port = 9000

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));


mongoose.connect('mongodb://root:csnet123@ds121406.mlab.com:21406/csnet_db',
  {
    useNewUrlParser: true
  }
);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get('/', (req, res) => {
  return res.send('Hello World!');
});

