import { readfile } from "../cntrl/readInWriteFile.js"

const path = './data/users.json'

export const valideteAgent = async (req,res,next)=>{
    const {username} = req.headers
    const valid = await readfile(path)
    const find = valid.find(user => username === user.username)
    if(find){
        next()
    }else {
        res.status(403).json("not funde")
    }
}