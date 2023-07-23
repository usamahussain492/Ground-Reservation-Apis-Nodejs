const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    minlength: [2, "Minimum password length is 2 characters"],
  },
  email: {
    type: String,
    required: [false, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  role: {
    type: String,
    required: [true, "Please enter your role"],
    enum: ["user", "admin"],
  },
  phoneNo: {
    type: String,
  },
  isVerified:{
    type: Boolean,
    default: false,
  },
  membership: {
    type: String,
    enum: ["none", "bronze", "silver", "gold"],
    default: "none",
  },
  membershipExpiresAt: {
    type: Date,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
});

/* This is a middleware that is used to hash the password before saving it to the database. */
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/* This is a static method that is used to login a user. */
UserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({
    $or: [{ email: username }, { username: username }],
  });
  console.log(user);
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Your password is incorrect");
  }
  throw Error("Your email/username is incorrect");
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
