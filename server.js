const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'client', 'build')));

const LOCALHOST = 'mongodb://localhost:27017/TodoList';
const DEPLOYED = process.env.MONGODB_URI;

mongoose
  .connect(DEPLOYED, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected'))
  .catch(console.error);

const todosRouter = require('./routes/todo');
app.use('/todos', todosRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(process.env.PORT || 3001, () =>
  console.log('Server is running on port 3001')
);
