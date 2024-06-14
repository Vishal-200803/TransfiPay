const Account = require("../models/Account")
const mongoose = require("mongoose")
const accountBalance = async(req,res) =>{
    const account = await Account.findOne({
        userId: req.userId
    });
    console.log("Accound : ", account);
    res.json({
        balance: account.balance
    })
}

const transaction = async(req,res) =>{
    // const session = await mongoose.startSession();

    // session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId })
    // const account = await Account.findOne({ userId: req.userId }).session(session);
    if (!account || account.balance < amount) {
        // await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to })
    // const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        // await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    // await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    // await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } })
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } })

    // Commit the transaction
    // await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
}

module.exports = {
    accountBalance, transaction
}