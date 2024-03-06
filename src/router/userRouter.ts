import Router from "express"
import {userLogin, userLogout, userRegister, verifyAccount} from "../controller/userController";


const userRouter = Router()

userRouter.post("/api/user/register",userRegister)
userRouter.get("/api/user/verify_account/:rightToken",verifyAccount)
userRouter.post("/api/user/login",userLogin)
userRouter.post("/api/user/logout",userLogout)


export default userRouter