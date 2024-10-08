const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signup =async (req,res)=>{
    try{
        const { name , email , password } = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
                .json({Message:'User already exist, you can log in', success : false});
        }
        const userModel= new UserModel({ name , email , password});
        userModel.password = await bcrypt.hash( password , 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup Successful !!!",
                success: true
            })
    } catch(err){
        res.status(500)
            .json({message: "Internal Error", success: false});
    }
}


const login = async (req,res)=>{
    try{
        const errmsg = 'Email or password are wrong';
        const { email , password } = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(403)
                .json({message: errmsg, success : false});
        }
        const isPassEqual = await bcrypt.compare(password,user.password);
        if (!isPassEqual){
            return res.status(403)
                .json({message:errmsg,success: false});
        }
        const jwtToke = jwt.sign(
            { email : user.email, _id: user._id },'secret-123',
            { expiresIn: '24h' }
        );

        res.status(200)
            .json({
                message: "Login Successful !!!",
                success: true,
                jwtToke,
                email,
                name : user.name
            })
    } catch(err){
        res.status(500)
            .json({message: "Internal Error", success: false});
    }
}



module.exports ={
    signup,
    login
};