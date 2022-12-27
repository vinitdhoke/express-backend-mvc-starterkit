import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; //To generate signed token
import { expressjwt } from "express-jwt"; // For authorization check
import { errorHandler } from "../helpers/dbErrorHandler.js";
import config from '../config/config.js';

//db models
const User = db.User;

export const signup = (req, res) => {
  if (req.profile) {
    return res.json({ error: "User already exists" });
  }
  const { username, email, password } = req.body;
  const user = {};
  user.username = username;
  user.email = email;
  const hash = bcrypt.hashSync(password, parseInt(config.app.SALT_ROUNDS));
  user.password = hash;
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      return res.status(500).json({ err: errorHandler(err) });
    });
};

export const signin = async (req, res) => {
  //Find user based on email
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username: username } });
  if (user === null) {
    return res.status(400).json({
      error: "User does not exists",
    });
  }
  // If user found , make sure username and password match
  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    return res.status(401).json({
      error: "Username and password does not match",
    });
  }
  //generate a signed token with user id and secret
  const token = jwt.sign({ _id: user._id }, config.app.JWT_SECRET);
  //persist the token as 't' in cookie with expiry date
  res.cookie("login_token", token, { expire: new Date() + 9999 });
  //return response with user and token to Front end client
  user.hashed_password = undefined;
  return res.json({
    token,
    user,
  });
};

export const signout = (req, res) => {
  res.clearCookie("login_token");
  res.json({ message: "Signout success" });
};

//User should be logged in
export const requireSignin = expressjwt({
  secret: config.app.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

// //Loggen in user and requesting api user id should match
export const isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({ error: "Access Denied" });
  }
  next();
};

export const getUserByUsername = async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findOne({ where: { username: username } });
  if (user !== null) {
    req.profile = user;
  }
  next();
};

export const getUserById = async (req, res, next) => {
  const { id } = req.body;
  const user = await User.findOne({ where: { id: id } });
  if (user !== null) {
    req.profile = user;
  }
  next();
};

export const testAuthenticate = (req, res, next) => {
  res.status(200).json({ msg: "Success" });
};
