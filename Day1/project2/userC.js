import fs from "fs/promises"

const readfile = async () => {
    try {
        const data = await fs.readFile('./users.json', 'utf8');
        return JSON.parse(data || "[]");
    } catch {
        return []
    }
}

const globalWriteFile = async (json) => {
    const data = JSON.stringify(json)
    await fs.writeFile('./users.json', data)
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await readfile()
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const users = await readfile()
        const jsonFind = users.find(user => Number(req.params.id) === user.id);
        if (jsonFind) {
            res.send(jsonFind);
        } else {
            res.status(404).json({});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addUser = async (req, res) => {
    try {
        const users = await readfile()
        const newUser = { name: req.body.name, id: users.length + 1 };
        users.push(newUser);
        await globalWriteFile(users);
        res.json({ message: "Added successfully.", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editUserByID = async (req, res) => {
    try {
        const read = await readfile()
        const itemId = req.params.id;
        const itemName = req.body.name;
        const update = read.find(user => user.id == itemId
        )
        if (update) {
            update.name = itemName;
            await globalWriteFile(read);
            res.json("You have successfully edited.");
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

export const delUser = async (req, res) => {
    try {
        const read = await readfile()
        const itemId = req.params.id;
        const del = read.findIndex(user => user.id == itemId);
        if (del != -1) {
            read.splice(del, 1);
            await globalWriteFile(read)
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