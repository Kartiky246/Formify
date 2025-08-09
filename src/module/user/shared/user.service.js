import userRepository from "../shared/user.repository.js";
import AppError from "../../../core/utils/errors/app.error.js"
import AuthService from "../../../core/services/auth.service.js"


class UserService{
    constructor(){

    }

    async registerUser(userData){
        Object.keys(userData).forEach(key=>{
            if(!userData[key]){
                throw new AppError(`${key} is required for registring user`, 400);
            }
        })
        const isEmailAlreadyExist = await userRepository.findOne({email: userData.email});
        if(isEmailAlreadyExist){
            throw new AppError(`User with email ${userData.email} already exist`, 400);
        }
        const isUserNameAlreadyExist = await userRepository.findOne({name: userData.name});
        if(isUserNameAlreadyExist){
            throw new AppError(`User with name ${userData.name} already exist`, 400);
        }
        return await userRepository.create(userData);
    }

    async loginUser(userData){
        Object.keys(userData).forEach(key=>{
            if(!userData[key]){
                throw new AppError(`${key} is required for login`, 400);
            }
        })

        const user = await userRepository.findOne({name:userData.name, email: userData.email});
        if(!user){
            throw new AppError(`Email or name is wrong`,400);
        }
        const isPasswordCorrect = await AuthService.isPasswordCorrect(user, userData.password );
        if(!isPasswordCorrect){
            throw new AppError(`Password is incorrect`, 400);
        }
        const userObject = user.toObject();
        if('password' in userObject){
            delete userObject.password;
        }
        return {token: await AuthService.generateToken(user), user: userObject};
    }

    async updatedUser(userData){
        if(!userData.name && !userData.email && !userData.password ){
            throw new AppError(`at least one key is required to update`, 400);
        }
        const user = await userRepository.findById(userData.id);
        if(!user){
            throw new AppError(`No user found with given details`, 400);
        }
        return await userRepository.update(userData.id, userData);
    }
}

export default new UserService();