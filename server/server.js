const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect('mongodb://localhost:27017/TodoList', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected'))
  .catch(console.error);

const todosRouter = require('./routes/todo');
app.use('/todos', todosRouter);

app.listen(3001, () => console.log('Server is running on port 3001'));
