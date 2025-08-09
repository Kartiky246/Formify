import { Router } from "express";
import { registerUser, loginUser, logoutUser, updateUser } from "./user.controller.js"
import verifyUser from "../../core/middlewares/auth.middleware.js";

const route = Router();

route.route('/register').post(registerUser);
route.route('/logout').post( verifyUser, logoutUser );
route.route('/login').post(loginUser);
route.route('/update').patch(verifyUser, updateUser)

export default route;