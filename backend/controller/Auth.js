const User = require("../models/User")
const Account = require("../models/Account")
const zod = require("zod")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

// input validation schema for signup
const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

// input validation schema for signIn
const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})


exports.signup = async(req,res)=>{
    try{
        const {success} = signupBody.safeParse(req.body)
        
        if(!success){
            return res.status(411).json({
                message: " Invalid Inputs"
            })
        }
        
        // taking inputs
        const {username, password,firstName, lastName} = req.body;
        // check for existing user
        const existingUser = await User.findOne({
            username : username
        })
        if(existingUser){
            return res.status(411).json({
                success: false,
                message:"Email already regeistered"
            })
        }
        
        // hasing tha password
        const hashedPassword = await bcrypt.hash(password,10);

        // creating user entry
        const user = await User.create({
            username,
            password: hashedPassword,
            firstName,
            lastName,
        })
        const userId = user._id;
        
       
        await Account.create({
            userId,
            balance: 1+Math.random()*10000
        })
        const token = jwt.sign({
            userId
        }, process.env.JWT_SECRET)

        res.json({
            message:"user created Successfully",
            token: token,
        })

    }
    catch{
        res.status(400).json({
            success:false,
            message:"Internal Server Error in signup"
        })
    }
}

exports.signin = async (req,res)=>{
    try{
        const {success} = signinBody.safeParse(req.body)

        if(!success){
            return res.status(411).json({
                message:"Invalid Input Format"
            })
        }
        const {username, password} = req.body
        const user = await User.findOne({
            username: username
        })
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User is not registered yet"
            })
        }
        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign({
                userId:user._id
            }, process.env.JWT_SECRET)

            res.json({
                token:token
            })
        }else{
            res.json({
                success:false,
                message:"Passowrd is Incorrect"
            })
        }
    }catch(err){
        res.status(400).json({
            success:false,
            message:"Internal Server Error in SignIn"
        })
    }

    
}