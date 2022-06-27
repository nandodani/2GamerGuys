const express = require("express");
const userController = require("../controllers/user.controller");
const middleware = require("../middleware");
const token = require("../controllers/refresh.token");

const router = express.Router();

router.get('/users', middleware, userController.getUsers);
router.post('/users', userController.Register);

router.post('/login', userController.Login);

router.get('/token', token);

router.delete('/logout', userController.Logout);

module.exports = router;