import express from "express";
import { contact, deleteContact, getContact, updateContact } from "../controllers/contact.js";
const router = express.Router();

//create contact
router.post("/", contact);

//fetch contact
router.get("/mycontacts", getContact);

//update contact
router.put("/edit/:id", updateContact);

//delete contact
router.delete("/delete/:id", deleteContact)
export default router;