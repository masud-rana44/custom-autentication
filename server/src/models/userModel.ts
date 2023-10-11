import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    unique: true,
    trim: true,
    // TODO: email validation
  },
  photoUrl: {
    type: String,
    default: "default.jpg",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Confirm password is required"],
    validate: {
      validator: function (el: string) {
        return el === this.password;
      },
      message: "Password and confirm password are not same",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
