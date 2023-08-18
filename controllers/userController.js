const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid email or password");
    }

    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d", 
    });

    res.send({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.send({
      success: false,
      message:error.message
    });
  }
};

//Register
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({email});
    if(user){
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
  }
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password should be at least 8 characters long",
    });
  }
    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { loginController, registerController };
