import { Router } from "express";
import { TODO } from "../models/todos";
const router = Router();

const todos: Record<string, TODO> = {};

router.get('/', (req, res, next) => {
    if(todos){
        const todoList = Object.values(todos);
        res.status(200).json({todos: todoList});
    }else{
        res.status(404).json({message: 'No data to show!'})
    }
});

router.post('/todo', (req, res, next) => {
    const text = req.body.text;
    const id = new Date().toISOString();
    const newTodo: TODO = {id, text};

    todos[id] = newTodo;

    res.status(200).json({message: 'Data Saved Successfully!'});
});

router.delete('/delete/:deletId', (req, res, next) => {
    const id = req.params.deletId;
    const data = todos[id];
    if (data){
        delete todos[id];
        res.status(200).json({message: 'Data Deleted Successfully!'})
    }else{    
        res.status(404).json({message: 'Delete Id not found!'});
    }
});

router.put('/edit/:editId', (req, res, next) => {
    const id = req.params.editId;
    const text = req.body.text;

    const data = todos[id];
    if(data){
        data.text = text;
        return res.status(200).json({ message: 'Edited Successfully!' });
    }
    res.status(404).json({message: 'Edit Id not found!'});
});

export default router;