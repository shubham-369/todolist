import express from "express";
import todos from "./routes/todos";

const app = express();
app.use(express.json());

app.use(todos);

app.listen(3000);