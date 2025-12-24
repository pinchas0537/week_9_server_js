import express from "express";
import { addAgent, delAgent, editAgentById, getAgentById, getAllAgent } from "../cntrl/agentsC.js";
import { valideteAgent } from "../middleare/agentM.js";

const router = express.Router();

router.get("/",getAllAgent)

router.get("/:id",getAgentById)

router.post("/",valideteAgent,addAgent)

router.put("/:id",editAgentById)

router.delete("/:id",delAgent)

export default router