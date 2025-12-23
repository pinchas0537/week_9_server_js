import { readfile, writefile } from "./readInWriteFile.js"

const path = './data/agent.json'
export const getAllAgent = async (req, res) => {
    try {
        const agents = await readfile(path)
        res.json(agents)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getAgentById = async (req, res) => {
    try {
        const egents = await readfile(path)
        const egent = egents.find(egen => Number(req.params.id) === egen.id);
        if (egent) {
            res.json(egent);
        } else {
            res.status(404).json({});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addAgent = async (req, res) => {
    try {
        const agent = await readfile(path)
        const newAgent = { id: agent.length + 1, name: req.body.name, nickname: req.body.nickname, reportsCount: 0 }
        if (req.body.name && req.body.nickname) {
            agent.push(newAgent)
            await writefile(path, agent)
            res.json(newAgent)
        }else{res.status(400).json({"message":"Missing name or nickname!"})}
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const editAgentById = async (req, res) => {
    try {
        const read = await readfile(path)
        const id = req.params.id;
        const name = req.body.name;
        const nickname = req.body.nickname;

        const update = read.find(user => user.id == id
        )
        if (update) {
            if (name) update.name = name;
            if (nickname) update.nickname = nickname;
            await writefile(path, read);
            res.json({ "messege": "You have successfully edited." });
        }
        else {
            res.status(404);
            res.send();
        }
    } catch (error) {
        res.status(500);
        res.json({ error: error.message });
    }
};

export const delAgent = async (req, res) => {
    try {
        const read = await readfile(path)
        const id = req.params.id;
        const del = read.findIndex(user => user.id == id);
        if (del != -1) {
            read.splice(del, 1);
            await writefile(path, read)
            res.json({ "deleted": true });
        }
        else {
            res.status(404);
            res.send();
        }
    } catch (error) {
        res.status(500);
        res.json({ error });
    }
};