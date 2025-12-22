import express from "express";
import userRoutes from "./usersR.js"

const app = express()
const port = 8000

app.use(express.json());

app.use("/users", userRoutes)

app.get("/", (req, res) => {
    res.send("Wolcome to server")
})

app.listen(port, () => {
    console.log(`server runing on http://localhost:${port}`);
})