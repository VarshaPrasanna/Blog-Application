const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
//const authMiddleware = require('../middlewares/authMiddleware');
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
