const express = require("express");
const cors = require('cors');
const database = require("./config/database")
const router = require("./routes/index")

require("dotenv").config()
PORT = process.env.PORT || 3000

const app = express();
app.use(cors())
app.use(express.json())

database.connect();

app.use("/api/v1", router)



app.listen(PORT, ()=>{
    console.log("Server is up and running on PORT NO : ", PORT)
})

