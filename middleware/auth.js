// custom middleware
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    jwt.verify(token, "MYSECRATE");
    next();
  } catch (err) {
    res.send({ err: err.message });
  }
};
