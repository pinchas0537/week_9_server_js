import express from "express";
import { addUser, getAllUsers } from "../cntrl/userC.js";

const router = express.Router()

router.get("/",getAllUsers)

router.post("/",addUser)

export default router