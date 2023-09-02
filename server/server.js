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

const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/todo', async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
    });

    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/todo/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text,
        complete: req.body.complete,
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/todo/:id', async (req, res) => {
  try {
    const result = await Todo.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3001, () => console.log('Server is running on port 3001'));
