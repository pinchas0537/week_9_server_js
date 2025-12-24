import express from "express";
import { addUser, deleteUser, editUserById, getAllUsers } from "../cntrl/userC.js";
import { validUser } from "../middleare/usersM.js";

const router = express.Router()

router.get("/",validUser,getAllUsers)

router.post("/",validUser,addUser)

router.put("/:username",validUser ,editUserById)

router.delete("/:username",validUser,deleteUser)

export default router