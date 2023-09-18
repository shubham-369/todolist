"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const todos = {};
router.get('/', (req, res, next) => {
    if (todos) {
        const todoList = Object.values(todos);
        res.status(200).json({ todos: todoList });
    }
    else {
        res.status(404).json({ message: 'No data to show!' });
    }
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const id = new Date().toISOString();
    const newTodo = { id, text: body.text };
    todos[id] = newTodo;
    res.status(200).json({ message: 'Data Saved Successfully!' });
});
router.delete('/delete/:todoId', (req, res, next) => {
    const params = req.params;
    const data = todos[params.todoId];
    if (data) {
        delete todos[params.todoId];
        res.status(200).json({ message: 'Data Deleted Successfully!' });
    }
    else {
        res.status(404).json({ message: 'Delete Id not found!' });
    }
});
router.put('/edit/:todoId', (req, res, next) => {
    const params = req.params;
    const body = req.body;
    const data = todos[params.todoId];
    if (data) {
        data.text = body.text;
        return res.status(200).json({ message: 'Edited Successfully!' });
    }
    res.status(404).json({ message: 'Edit Id not found!' });
});
exports.default = router;
