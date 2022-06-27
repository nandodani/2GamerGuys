const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.put("/update/:id", userController.user_update);

router.delete("/delete/:id", userController.user_delete);

module.exports = router;
