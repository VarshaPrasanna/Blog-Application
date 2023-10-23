const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const api_config = require("../config/api.js");
const register = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            bio: req.body.bio,
            profilePic: req.body.profilePic
        });
        console.log(req.body.firstName)

        const user = await newUser.save();

        res.status(201).json({
            type: 'success',
            message: "User has been created successfully",
            user
        });
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong, please try again",
            err
        });
    }
};

const login = async (req, res) => {

  const user = await User.findOne({ username: req.body.username });
  try {
  console.log(user);
  console.log(req.body.password);
  console.log(req.body);

    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      res.status(500).json({
        type: "error",
        message: "User does not exist or invalid credentials",
      });
    } else {
      const accessToken = jwt.sign({
        id: user._id,
    },
        api_config.api.jwt_secret,
        { expiresIn: "1d" }
    );

      const { password, ...data } = user._doc;
      res.status(200).json({
        type: "success",
        message: "Successfully logged in",
        ...data,
        accessToken
      });
    }
  } catch (err) {
    res.status(500).json({
      type: "error",
      message: "Something went wrong, please try again",
      err,
    });
  }
};

module.exports = {
  register,
  login,
};
