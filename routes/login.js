import { getContactByEmail } from "../helper.js";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { validation } from "../middleware/validation.js";
import { userLogInSchema } from "../validations/userValidation.js";

const router = express.Router();

//Login
//validate if username present
//validate if password matches
//generate JWT token and send if everythig is rigtht
router.post("/login", validation(userLogInSchema), async (req, res) => {
  const { email, password } = req.body;

  const userFromDb = await getContactByEmail(email);

  if (!userFromDb) {
    res.status(400).send({ message: "Invalid credentials" });
    return;
  }
  const sotredDbPassword = userFromDb.password;

  //compairing password using bcrypt
  const isPasswordMatch = await bcrypt.compare(password, sotredDbPassword);
  if (!isPasswordMatch) {
    res.status(400).send({ message: "Invalid credentials" });
    return;
  }
  // Generating jwt token
  const token = jwt.sign({ id: userFromDb._id }, "MYSECRATE");
  res.send({ message: "Sucessfull Login", token: token });
});

export const loginRouter = router;
