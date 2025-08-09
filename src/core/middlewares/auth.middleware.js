import jwt from 'jsonwebtoken';
import AppError from '../utils/errors/app.error.js';
import userRepository from "../../module/user/user.repository.js"

const verifyUser = async(req, res ,next) =>{
    try {
        const accessToken =(req.cookies?.accessToken || req.header("Authorization"))?.replace('Bearer ','');

        if(!accessToken){
            throw new AppError('user is unauthorized', 400);
        } 
        const decodedToken = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if(!decodedToken){
            throw new AppError('Invalid access token', 401)
        }
        const user = await userRepository.findById(decodedToken._id);
        if(!user){
            throw new AppError('user not present', 400);
        }
        req.user = user;

        next();
        
    } catch (error) {
        res.status(error.statusCode || 500).json({success:false, message: error.message})

    }
}

export default verifyUser;