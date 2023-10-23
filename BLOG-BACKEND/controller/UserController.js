const User = require("../models/UserModel");
const bcrypt = require('bcrypt')
// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update user
const updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
}

try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },
        { new: true }
    );
    res.status(200).json({
        type: "success",
        message: "User updated successfully",
        updatedUser
    })
} catch (err) {
    res.status(500).json({
        type: "error",
        message: "Something went wrong please try again",
        err
    })
}
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
        type: "success",
        message: "User has been deleted successfully"
    });
} catch (err) {
    res.status(500).json({
        type: "error",
        message: "Something went wrong please try again",
        err
    })
}
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
