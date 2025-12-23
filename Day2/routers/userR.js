import express from "express";
import { addUser, deleteUser, editUserById, getAllUsers } from "../cntrl/userC.js";

const router = express.Router()

router.get("/",getAllUsers)

router.post("/",addUser)

router.put("/:username", editUserById)

router.delete("/:username",deleteUser)

export default router