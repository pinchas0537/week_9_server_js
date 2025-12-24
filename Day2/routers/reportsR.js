
import express from "express";
import { addReport, deleteReport, editReportById, getAllReports, getReportsById } from "../cntrl/reportsC.js";
import { validAgentInReports } from "../middleare/reportsM.js";
import { validUser } from "../middleare/usersM.js";

const router = express.Router()

router.get("/",getAllReports)

router.get("/:id",getReportsById)

router.post("/",validUser,validAgentInReports,addReport)

router.put("/:id",validUser, editReportById)

router.delete("/:id",validUser,deleteReport)

export default router