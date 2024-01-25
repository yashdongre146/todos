import { Router } from "express";
import { Todo } from "../models/todo";

const todos: Todo[] = [];

const router = Router();

router.get('/', (req, res, next) => {
    res.json(todos);
});

router.post('/', (req, res, next) => {
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: req.body.text
    };

    todos.push(newTodo);

    res.status(201).json({ success: true, data: newTodo });
});

// Use a POST request for the delete operation with the /delete path
router.post('/delete', (req, res, next) => {
    const index = todos.findIndex(todo => todo.id === req.body.id);

    if (index !== -1) {
        todos.splice(index, 1);
        res.json({ success: true, data: "Success" });
    } else {
        res.status(404).json({ success: false, message: 'Todo not found' });
    }
});

// Use a POST request for the edit operation with the /edit path
router.post('/edit', (req, res, next) => {
    const text = req.body.text;
    const todoToEdit = todos.find(todo => todo.id === req.body.id);

    if (todoToEdit) {
        todoToEdit.text = text;
        res.json({ success: true, data: "Success" });
    } else {
        res.status(404).json({ success: false, message: 'Todo not found' });
    }
});

export default router;
