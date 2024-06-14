const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{
    try{
        

        const token = req.header("Authorization").replace("Bearer ", "");
        console.log("TOken is : ", token)
        if(!token) {
            return res.status(401).json({
                token:token,
                success:false,
                message:'TOken is missing',
            });
        }
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded.userId)
            req.userId = decoded.userId;

            next();
        } catch (err) {
            return res.status(403).json({
                success:false,
                message:"Token is invalird",
                error:err,
            });
        }
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
            error:err,
        });
    }
}

module.exports  = {authMiddleware}