import express from "express";

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
    const user = await User.create({
      name,
      email,
      photoUrl,
      password,
      passwordConfirm: confirmPassword,
    });

    // TODO: send verification emil

    return res.status(200).json(user).end();
  } catch (error) {
    console.log("[REGISTER]", error);
    return res.status(500).json("Internal Server Error");
  }
};
