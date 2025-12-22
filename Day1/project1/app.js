import express from "express";

const app = express()
const port = 8000

app.use(express.json());

app.post("/", (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

app.get("/", (req, res) => {
    res.send("Welcome to my server")
})

app.get("/greet", (req, res) => {
    res.json({ "msg": `hi from get endpoint, ${new Date()}` })
})

app.get("/greet/:name", (req, res) => {
    console.log(`i got name:${req.params.name}`)
    res.json({ "msg": `got name:${req.params.name}` })
})

try {
    app.get("/test", async (req, res) => {
        const re = await fetch("http://localhost:8000/greet/Bob")
        const text = await re.json()
        text.msg.includes("Beb") ? res.json({ "result": "ok" }) : res.send({ "result": "fail" })
    })
} catch (error) {
    console.error(error)
}

try {
    app.post("/action", async (req, res) => {
        if (req.body.action === "joke") {
            const re = await fetch("https://official-joke-api.appspot.com/random_joke")
            let json = await re.json()
            json = json.setup + json.punchline
            json = json.toUpperCase()
            res.send({joke:json})
        }
        else if (req.body.action === "cat fact") {
            const re = await fetch("https://api.thecatapi.com/v1/images/search?limit=11&breed_ids=beng&api_key=live_94kEXwmEosoXNRAum9V7OGntC4kvuBBgX8fk9mRZpZ991zAp9YT6r7gahwlD8Sfe")
            const json = await re.json()
            res.send({length:json.length})
        }
        else {
            res.status(400)
            res.send({ "msg": "body is malformed" })
        }
    })
} catch (error) {
    console.error(error)
}

app.listen(port, () => {
    console.log(`server runing on http://localhost:${port}`);
})