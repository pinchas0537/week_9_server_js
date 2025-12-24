import express from "express";
import constantsRouter from "./roouters/contactsR.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/contacts",constantsRouter);

app.get("/", (req, res) => {
    res.send("Wolcome to CRM")
});

app.listen(port, () => {
    console.log(`server runing on http://localhost:${port}`)
});