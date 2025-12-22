import express from "express";
import fs from "fs/promises"

const app = express()
const port = 8000

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Wolcome to server")
})

try {
    app.get("/users", async (req, res) => {
        const file = await fs.readFile('./users.json', 'utf8')
        const json = JSON.parse(file)
        res.send(json)
    })
} catch (error) {
    console.error(error)
}

app.get("/users/:id", async (req, res) => {
    try {
        const file = await fs.readFile('./users.json', 'utf8')
        const json = JSON.parse(file);
        const jsonFind = json.filter((user) => req.params.id == user.id);
        if (jsonFind.length > 0) {
            res.send(jsonFind)
        } else {
            res.status(404)
            res.send({})
        }
    } catch (error) {
        res.status(500)
        res.json({ error })
    }
})

try {
    app.post("/users", async (req, res) => {
        const file = await fs.readFile('./users.json', 'utf8')
        const json = JSON.parse(file);
        const newUser = { name: req.body.name, id: json.length + 1 }
        json.push(newUser)
        const string = JSON.stringify(json)
        const newFile = await fs.writeFile('./users.json', string, () => { })
        res.send(newFile)
    })
} catch (error) {
    console.error(error)
}

app.put("/users/:id", async (req, res) => {
    const file = await fs.readFile('./users.json', 'utf-8');
    const json = JSON.parse(file);
    const itemId = req.params.id;
    const itemName = req.body.name;
    const update = json.find((user) => user.id == itemId
    )
    if (update) {
        update.name = itemName
        const myFile = JSON.stringify(json)
        const newJson = await fs.writeFile('./users.json', myFile)
        res.json(newJson)
    }
    else {
        res.status(404)
        res.send()
    }
})

app.delete("/users/:id", async (req, res) => {
    const file = await fs.readFile('./users.json', 'utf-8');
    const json = JSON.parse(file);
    const itemId = req.params.id;
    const del = json.findIndex((user) => user.id == itemId)
    if (del != -1) {
        json.splice(del, 1)
        const myFile = JSON.stringify(json)
        await fs.writeFile('./users.json', myFile)
        res.json({ "deleted": true })
    }
    else {
        res.status(404)
        res.send()
    }
})


app.listen(port, () => {
    console.log(`server runing on http://localhost:${port}`);
})