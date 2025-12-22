import fs from "fs/promises"

const globalReadFile = await fs.readFile('./users.json', 'utf8');
const globalJson = JSON.parse(globalReadFile);

const globalWriteFile = async () => {
    const data = JSON.stringify(globalJson)
    await fs.writeFile('./users.json', data)
}

export const getAllUsers = async (req, res) => {
    try {
        globalReadFile
        globalJson
        res.send(globalJson);
    } catch (error) {
        res.status(500);
        res.json({ error });
    }
};

export const getUserById = async (req, res) => {
    try {
        globalReadFile;
        globalJson;
        const jsonFind = globalJson.find(user => req.params.id == user.id);
        if (jsonFind) {
            res.send(jsonFind);
        } else {
            res.status(404);
            res.send({});
        }
    } catch (error) {
        res.status(500);
        res.json({ error });
    }
};

export const addUser = async (req, res) => {
    try {
        globalReadFile
        globalJson
        const newUser = { name: req.body.name, id: globalJson.length + 1 };
        globalJson.push(newUser);
        await globalWriteFile();
        res.json("Added successfully.");
    } catch (error) {
        res.status(500);
        res.send(error);
    }
};

export const editUserByID = async (req, res) => {
    try {
        globalReadFile
        globalJson
        const itemId = req.params.id;
        const itemName = req.body.name;
        const update = globalJson.find(user => user.id == itemId
        )
        if (update) {
            update.name = itemName;
            await globalWriteFile();
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
        globalReadFile
        globalJson
        const itemId = req.params.id;
        const del = globalJson.findIndex(user => user.id == itemId);
        if (del != -1) {
            globalJson.splice(del, 1);
            await globalWriteFile()
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