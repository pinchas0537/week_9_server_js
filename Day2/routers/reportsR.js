
import express from "express";
import { addReport, deleteReport, editReportById, getAllReports, getReportsById } from "../cntrl/reportsC.js";

const router = express.Router()

router.get("/",getAllReports)

router.get("/:id",getReportsById)

router.post("/",addReport)

router.put("/:id", editReportById)

router.delete("/:id",deleteReport)

export default router