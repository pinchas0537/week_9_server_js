import { readfile } from "../cntrl/readInWriteFile.js"

const path = './data/agent.json'

export const valideteAgent = async (req,res,next)=>{
    const valid = await readfile(path)
    const find = valid.find(egen => Number(req.params.id) === egen.id)
    if(Number(req.params.id) === (find.id)){
        next()
    }else {
        next("not funde")
    }
}