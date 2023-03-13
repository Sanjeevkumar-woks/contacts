import express from "express";
import {
  createContact,
  deleteContactById,
  genPassword,
  getContactByEmail,
  getContactById,
  getContacts,
  updateContactById,
} from "../helper.js";
import { auth } from "../middleware/auth.js";
import { validation } from "../middleware/validation.js";
import { contactsValidation } from "../validations/contactsValidation.js";
const router = express.Router();

//CREATE
router.post("/create", validation(contactsValidation), async (req, res) => {
  const newContact = req.body;
  const ifContactExists = await getContactByEmail(newContact.email);

  if (ifContactExists) {
    res.status(400).send({ message: "Email alrady exists" });
    return;
  }
  if (
    !/^(?=.*[0-9])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[@!#%&]).{8,}$/g.test(
      newContact.password
    )
  ) {
    res.status(400).send({ message: "Password pattern doesnot match" });
    return;
  }
  const hashPassword = await genPassword(newContact.password);

  const result = await createContact({ ...newContact, password: hashPassword });
  res.send(result);
});

//READ all contacts
router.get("/read", auth, async (req, res) => {
  const contacts = await getContacts();
  res.send(contacts);
});

//READ contact by ID
router.get("/read/:id", auth, async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  contact
    ? res.send(contact)
    : res.status(404).send({ msg: "Contact dose not exist" });
});

//UPDATE contact by ID
router.put("update/:id", auth, async (req, res) => {
  const { id } = req.params;
  const updateContact = req.body;
  const result = await updateContactById(id, updateContact);
  res.send(result);
});

//DELETE contact by ID
router.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  const result = await deleteContactById(id);
  res.send(result);
});

export const contactsRouter = router;
