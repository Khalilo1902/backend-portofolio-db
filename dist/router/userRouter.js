"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const userRouter = (0, express_1.default)();
userRouter.post("/api/user/register", userController_1.userRegister);
userRouter.get("/api/user/verify_account/:rightToken", userController_1.verifyAccount);
userRouter.get("/api/user/getAllUser", userController_1.getAllusers);
userRouter.post("/api/user/login", userController_1.userLogin);
userRouter.post("/api/user/logout", userController_1.userLogout);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map