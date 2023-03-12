import express from "express";
import { MongoClient } from "mongodb";
import { contactsRouter } from "./routes/contacts.js";
import { loginRouter } from "./routes/login.js";

const PORT = 5000;
const MONGO_URL = "mongodb://localhost";

//Creating instance of express
const app = express();

//app.use(cors());
app.use(express.json());

//Mongo DB connection Function
const createConnection = async () => {
  const client = new MongoClient(MONGO_URL);
  client.connect();
  console.log(`MongoDB connnected succesfully........!!`);
  return client;
};
export const client = await createConnection();

//Home Route
app.get("/", (req, res) => {
  res.send("Hello.... Welcome to contacts App");
});

//Contacts Route
app.use("/contacts", contactsRouter);

//Login Route
app.use("/login", loginRouter);

app.listen(PORT, () => console.log(`App is running at port ${PORT}`));
