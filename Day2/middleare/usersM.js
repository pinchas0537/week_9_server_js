import { readfile } from "../cntrl/readInWriteFile.js"

const path = './data/users.json'

export const validUser = async (req,res,next)=>{
    try {
        const {username} = req.headers
        const valid = await readfile(path)
        const find = valid.find(user => username === user.username)
        if(find){
            next()
        }else {
            res.status(401).json("not funde")
        }
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}