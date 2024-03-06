import Router from "express"
import {getAllusers, userLogin, userLogout, userRegister, verifyAccount} from "../controller/userController";


const userRouter = Router()

userRouter.post("/api/user/register",userRegister)
userRouter.get("/api/user/verify_account/:rightToken",verifyAccount)
userRouter.get("/api/user/getAllUser",getAllusers)
userRouter.post("/api/user/login",userLogin)
userRouter.post("/api/user/logout",userLogout)


export default userRouter