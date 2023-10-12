import express, { CookieOptions } from "express";
import jwt from "jsonwebtoken";

import User from "../models/userModel.ts";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    // extract all the fields from the body
    const { name, email, photoUrl, password, confirmPassword } = req.body;

    // check there is no missing fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json("Missing required fields");
    }

    // check if there already an user exists with this email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json("User already exists");
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

    // create jwt token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // set cookie options
    const cookieOptions: CookieOptions = {
      expires: new Date(
        Date.now() +
          Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    // set the cookie to the response
    res.cookie("jwt", token, cookieOptions);

    // remove password and active fields from the output
    newUser.password = undefined;
    newUser.active = undefined;

    return res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log("[REGISTER]", error);
    return res.status(500).json("Internal Server Error");
  }
};
