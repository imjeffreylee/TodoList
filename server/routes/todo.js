const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET /todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    const sorted = todos.sort((a, b) => {
      if (a.complete && !b.complete) return 1;
      if (!a.complete && b.complete) return -1;
      return b.timestamp - a.timestamp;
    });
    res.json(sorted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /todos
router.post('/', async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
      complete: req.body.complete || false,
      timestamp: Date.now(),
    });

    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /todos/:id
router.patch('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text,
        complete: req.body.complete,
        timestamp: Date.now(),
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

// DELETE /todos/:id
router.delete('/:id', async (req, res) => {
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

module.exports = router;
