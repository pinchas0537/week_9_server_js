import express from "express";
import { getAllUsers , getUserById , addUser , editUserByID ,delUser} from "./userC.js";

const router = express.Router();

router.get("/", getAllUsers)

router.get("/:id", getUserById)

router.post("/", addUser)

router.put("/:id", editUserByID)

router.delete("/:id", delUser)

export default router