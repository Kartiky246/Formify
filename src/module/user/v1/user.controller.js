import UserService from "../shared/user.service.js";


export const registerUser = async (req, res) => {
    try {
        const {name,email,password} = req.body;
        const user = await UserService.registerUser({name,email,password});
        return res.status(200)
        .json({success:true, user}); 
    } catch (error) {
        res.status(error.statusCode || 500).json({success:false, message: error.message})
    }
}

export const loginUser = async(req, res) => {
    try {
        const {name,email,password} = req.body;
        const {token,user} = await UserService.loginUser({name,email,password});
        res.cookie('accessToken', token,{
            httpOnly: true,
            secure: true
        }).json({
            success:true,
            user,
            accessToken: token,
            message:"logged in successfully !"
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({success:false, message: error.message})
    }
}

export const logoutUser = async(_,res) => {
    try {
        res.status(200)
        .clearCookie("accessToken", {
             httpOnly: true,
            secure: true
        })
        .json({
            success:true,
            message:"user logged out"
        })

    } catch (error) {
        res.status(error.statusCode || 500).json({success:false, message: error.message})
    }
}

export const updateUser = async(req,res) => {
    try {
        const {name, email, password} = req.body;
        const updatedUser = await UserService.updatedUser({name, email, password, id: req.user._id});
        return res.status(200)
        .json({success: true, message: 'user updated successfully', user: updatedUser})          
    } catch (error) {
        res.status(error.statusCode || 500).json({success:false, message: error.message})
    }
}