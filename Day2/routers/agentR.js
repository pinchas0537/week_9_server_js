import express from "express";
import { addAgent, delAgent, editAgentById, getAgentById, getAllAgent } from "../cntrl/agentsC.js";

const router = express.Router();

router.get("/",getAllAgent)

router.get("/:id",getAgentById)

router.post("/",addAgent)

router.put("/:id",editAgentById)

router.delete("/:id",delAgent)

export default router