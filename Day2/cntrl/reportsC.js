import { readfile, writefile } from "./readInWriteFile.js"

const path = './data/report.json'

export const getAllReports = async (req, res) => {
    try {
        const reports = await readfile(path)
        res.json(reports)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getReportsById = async (req, res) => {
    try {
        const reports = await readfile(path)
        const report = reports.find(repor => Number(req.params.id) === repor.id);
        if (report) {
            res.json(report);
        } else {
            res.status(404).json({});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addReport = async (req, res) => {
    try {
        const newReport = { id: report.length + 1, date: new Date().toISOString(), content: req.body.content, agentId: req.body.agentId}
        const report = await readfile(path)
        if (req.body.content && req.body.agentId) {
            report.push(newReport)
            await writefile(path, report)
            await reportCount(req,res)
            res.json(newReport)
        }else{res.status(400).json({"message":"Missing content or agentId!"})}
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const editReportById = async (req, res) => {
    try {
        const read = await readfile(path)
        const id = req.params.id
        const {content,agentId} = req.body
        const update = read.find(user => user.id == id
        )
        if (update) {
            if (content) update.content = content;
            if (agentId) update.agentId = agentId;
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

export const deleteReport = async (req, res) => {
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

const reportCount = async (req,res) =>{
    try {
        const {agentId} = req.body
        const fileJson = await readfile('./data/agent.json')
        const findFile = fileJson.find(agent => agent.id === agentId)
        if(findFile){
            findFile.reportsCount += 1;
            await writefile('./data/agent.json',fileJson)
        }
        else{res.status(404).json("No such agent found!")}
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}