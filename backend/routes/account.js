const express = require("express")
const router = express.Router();
const {authMiddleware} = require("../middlewares/auth");
const {accountBalance, transaction} = require("../controller/Account")
router.get("/balance", authMiddleware, accountBalance);
router.post("/transfer", authMiddleware, transaction)

module.exports = router