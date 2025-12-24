import express from "express";
import agentRouter from "./routers/agentR.js";
import usersRouter from "./routers/userR.js";
import reportRouter from "./routers/reportsR.js"

const app = express();
const port = 3000;

app.use(express.json());

app.use("/agents", agentRouter);

app.use("/users", usersRouter);

app.use("/reports",reportRouter)

app.get("/", (req, res) => {
    res.send("Wolcome to server!")
});

app.listen(port, () => {
    console.log(`server runing on http://localhost:${port}`)
});