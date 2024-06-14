const express = require("express")
const router = express.Router();
const {signin, signup} = require("../controller/Auth");
const {updateUser, searchUser} = require("../controller/user")
const {authMiddleware} = require("../middlewares/auth")

router.post("/signup",signup)
router.post("/signin", signin)

// profile section page. put request for update the user
router.put("/",authMiddleware, updateUser)

router.get("/bulk", searchUser)


module.exports = router