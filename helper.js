//ALl Data Base oprations
import { client } from "./index.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

//contacts CURD

//CREATE
export async function createContact(newContact) {
  return await client.db("contacts").collection("users").insertOne(newContact);
}

//READ
export async function getContacts() {
  return await client.db("contacts").collection("users").find().toArray();
}

//READ BY ID
export async function getContactById(id) {
  return await client
    .db("contacts")
    .collection("users")
    .findOne({ _id: ObjectId(id) });
}

//UPDATE BY ID
export async function updateContactById(id, updateContact) {
  return client
    .db("contacts")
    .collection("users")
    .updateOne({ _id: ObjectId(id) }, { $set: updateContact });
}

//DELETE BY ID
export async function deleteContactById(id) {
  return client
    .db("contacts")
    .collection("users")
    .deleteOne({ _id: ObjectId(id) });
}

// Login

//Hashing Password
export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10); //bcrypt.genSalt(no. of rounds)
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
//READ BY EMAIL
export async function getContactByEmail(email) {
  return await client
    .db("contacts")
    .collection("users")
    .findOne({ email: email });
}
