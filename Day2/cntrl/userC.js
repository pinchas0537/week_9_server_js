import { readfile, writefile } from "./readInWriteFile.js"

const path = './data/users.json'

export const getAllUsers = async (req, res) => {
    try {
        const users = await readfile(path)
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const addUser = async (req,res)=>{
    try {
        const user = await readfile(path)
        const newUser = {name: req.body.name, password :req.body.password}
        if (req.body.name && req.body.password) {
            user.push(newUser)
            await writefile(path, user)
            res.json(newUser)
        }else{res.status(400).json({"message":"Missing name or password!"})}
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}