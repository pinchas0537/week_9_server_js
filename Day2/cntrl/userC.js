import { readfile, writefile } from "./readInWriteFile.js"

const path = './data/users.json'

export const getAllUsers = async (req, res) => {
    try {
        const users = await readfile(path)
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

export const addUser = async (req, res) => {
    try {
        const user = await readfile(path)
        const newUser = { name: req.body.name, password: req.body.password }
        if (req.body.name && req.body.password) {
            user.push(newUser)
            await writefile(path, user)
            res.json(newUser)
        } else { res.status(400).json({ "message": "Missing name or password!" }) }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

export const editUserById = async (req, res) => {
    try {
        const read = await readfile(path)
        const username = req.params.username;
        const name = req.body.name;
        const password = req.body.password;

        const update = read.find(user => user.name == username
        )
        if (update) {
            if (name) update.name = name
            if (password) update.nickname = password
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

export const deleteUser = async (req,res) => {
    try {
        const read = await readfile(path)
        const username = req.params.username;
        const del = read.findIndex(user => user.name == username);
        if (del != -1) {
            read.splice(del, 1);
            await writefile(path, read)
            res.json({ "deleted": true });
        }
        else {
            res.status(404);
            res.json({});
        }
    } catch (error) {
        res.status(500);
        res.json({ error :error.message});
    }
};