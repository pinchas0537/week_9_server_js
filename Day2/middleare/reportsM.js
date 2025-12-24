import { readfile } from "../cntrl/readInWriteFile.js"

const path = './data/agent.json'

export const validAgentInReports = async (req,res,next)=>{
    try {
        const {agentid} = req.headers
        const agents = await readfile(path)
        const findArr = agents.find(agent => agent.id === Number(agentid))
        if(findArr) next()
            else {res.status(401).json("not funde")}
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}