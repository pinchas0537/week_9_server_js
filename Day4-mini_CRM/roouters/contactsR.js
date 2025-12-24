import express from "express";
import { addContacsts, editContacstsById, editContacstsByProvidedFields, getAllContacts, getContacstsByID } from "../cntrl/contactC.js";

const router = express.Router();

router.get("/",getAllContacts)

router.get("/:id",getContacstsByID)

router.post("/",addContacsts)

router.put("/:id",editContacstsById)

router.patch("/:id",editContacstsByProvidedFields)
// router.delete("/:id")

export default router