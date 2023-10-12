import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Response, Request, CookieOptions } from "express";

import User from "../models/userModel.ts";

const signToken = (id: mongoose.Types.ObjectId) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

const createSendToken = (user: any, statusCode: number, res: Response) => {
  const token = signToken(user._id);

  // set the cookie
  const cookieOptions: CookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // remove password and active fields from the output
  user.password = undefined;
  user.active = undefined;

  return res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    // extract all the fields from the body
    const { name, email, photoUrl, password, confirmPassword } = req.body;

    // check there is no missing fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields",
      });
    }

    // check if there already an user exists with this email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "User already exists",
      });
    }

    // create new user
    const newUser = await User.create({
      name,
      email,
      photoUrl,
      password,
      passwordConfirm: confirmPassword,
    });

    // TODO: send verification emil

    // send token to the client
    createSendToken(newUser, 201, res);
  } catch (error) {
    console.log("[REGISTER]", error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // check email and password exists
  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Missing email or password",
    });
  }

  // check if  user exists and password correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !user.correctPassword(password, user.password)) {
    return res.status(401).json({
      status: "error",
      message: "Incorrect email or password",
    });
  }

  // if everything okay, send token to the client
  createSendToken(user, 200, res);
};
