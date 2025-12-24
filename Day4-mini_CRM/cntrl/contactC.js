import { arrToJson, jsonToArr } from "../services/file.js"

const path = './data/contacts.json'

export const getAllContacts = async (req, res) => {
    try {
        const { q } = req.params
        const contacsts = await jsonToArr(path)
        const filterContacsts = contacsts.filter(contacst => req.params.q === contacst.name || req.params.q === contacst.phone)
        if (filterContacsts) res.json({ "results": contacsts })
        else { res.status(404).json({}) }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getContacstsByID = async (req, res) => {
    try {
        const { id } = req.params
        const contacsts = await jsonToArr(path)
        const findContacsts = contacsts.find(contacst => req.params.id === contacst.id)
        if (findContacsts) res.json(contacsts)
        else { res.status(404).json({}) }
    } catch (error) {
        res.json({ error: error.message })
    }
}

export const addContacsts = async (req, res) => {
    try {
        const { fullname, phone, city, tags } = req.body
        const contacsts = await jsonToArr(path)
        const newContacsts = { id: contacsts.length + 1, fullname, phone, city, tags, createdAt: new Date().toISOString() }
        contacsts.push(newContacsts)
        await arrToJson(path, contacsts)
        res.json(newContacsts)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const editContacstsById = async (req, res) => {
    try {
        const contacsts = await jsonToArr(path)
        const { id } = req.params;
        const { fullname, phone, city, tags } = req.body
        const update = contacsts.find(user => user.id == id)
        if (update) {
            if (fullname && phone && city && tags) {
                update.fullname = fullname;
                update.phone = phone;
                update.city = city;
                update.tags = tags;
                update.createdAt = new Date().toISOString();
            } else { res.status(404).json({ "messege": "You can't edit just some of the things!" }) }
            await arrToJson(path, contacsts);
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

export const editContacstsByProvidedFields = async (req, res) => {
    try {
        const contacsts = await jsonToArr(path)
        const { id } = req.params;
        const { fullname, phone, city, tags } = req.body
        const update = contacsts.find(user => user.id == id)
        if (update) {
            if (fullname) {
                update.fullname = fullname
                update.createdAt = new Date().toISOString()
            }
            else if (phone) {
                update.phone = phone
                update.createdAt = new Date().toISOString()
            }
            else if (city) {
                update.city = city
                update.createdAt = new Date().toISOString()
            }
            else if (tags) {
                update.tags = tags
                update.createdAt = new Date().toISOString()
            }
            else { res.status(404).json({ "messege": "You can't edit just some of the things!" }) }
            await arrToJson(path, contacsts);
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
}