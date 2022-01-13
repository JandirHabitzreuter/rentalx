import express, { Router } from "express";

const app = express();

app.use(express.json());
app.use(Router);

app.listen(3333, () => console.log("Server is running!"));
