"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogout = exports.userLogin = exports.verifyAccount = exports.userRegister = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendEmail_1 = require("./sendEmail");
const jwt_decode_1 = require("jwt-decode");
const userRegister = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const userExist = await userModel_1.default.findOne({ email });
    if (userExist) {
        res.status(401).json("User already registered");
        return;
    }
    if (password !== confirmPassword) {
        return res.status(400).json("Passwords do not match");
    }
    try {
        await userModel_1.default.create({
            firstName,
            lastName,
            email,
            password,
        });
        const verifyToken = jsonwebtoken_1.default.sign({ firstName, lastName, email }, process.env.REFRESH_TOKEN, { expiresIn: "1m" });
        res.cookie("verifyToken", verifyToken, {
            httpOnly: true,
            maxAge: 60 * 1000,
            secure: false,
        });
        await (0, sendEmail_1.sendEmail)(email, firstName, verifyToken);
        res.status(201).json({
            message: "You are successfully registered",
            verifyToken,
        });
    }
    catch (e) {
        res.status(500).json({ message: "Failed to create user", error: e });
    }
};
exports.userRegister = userRegister;
//User Login
const userLogin = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    const userExist = await userModel_1.default.findOne({ email });
    if (userExist && userExist.password === password) {
        if (userExist.verifyToken) {
            const { _id: userId, firstName, lastName, email, isAdmin } = userExist;
            const accessToken = jsonwebtoken_1.default.sign({
                userId,
                firstName,
                lastName,
                email,
                isAdmin
            }, process.env.ACCESS_TOKEN, { expiresIn: "1d" });
            const refreshToken = jsonwebtoken_1.default.sign({
                userId,
                firstName,
                lastName,
                email,
                isAdmin
            }, process.env.ACCESS_TOKEN, { expiresIn: "40s" });
            await userModel_1.default.findByIdAndUpdate(userId, { access_token: accessToken });
            res.cookie("access_token", accessToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                secure: false
            });
            const userInfo = (0, jwt_decode_1.jwtDecode)(accessToken);
            res.status(201).json({ message: "login success", userInfo });
        }
        else {
            const verifyToken = jsonwebtoken_1.default.sign({ email }, process.env.REFRESH_TOKEN, { expiresIn: "1m" });
            res.cookie("verifyToken", verifyToken, {
                httpOnly: true,
                maxAge: 60 * 1000,
                secure: false,
            });
            await (0, sendEmail_1.sendEmail)(email, userExist.firstName, verifyToken);
            throw new Error("wir haben für dich ein link geschickt verify your account");
        }
    }
    else {
        throw new Error("userName or password ist falsh ");
    }
});
exports.userLogin = userLogin;
const verifyAccount = (0, express_async_handler_1.default)(async (req, res) => {
    const token = req.cookies.verifyToken;
    const { rightToken } = req.params;
    console.log("rightToken", typeof rightToken);
    console.log("Token:", typeof token);
    console.log("Cookies:", req.cookies);
    try {
        if (!token || rightToken !== token) {
            throw new Error("You don't have access");
        }
        const decodedToken = (0, jwt_decode_1.jwtDecode)(token);
        const email = decodedToken.email;
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        user.verifyToken = true;
        await user.save();
        res.json({ message: "Verification successful" });
    }
    catch (e) {
        res.json(e.message);
    }
});
exports.verifyAccount = verifyAccount;
const userLogout = (0, express_async_handler_1.default)(async (req, res) => {
    res.clearCookie("access_token");
    res.status(201).json({ message: "user logout successfull" });
});
exports.userLogout = userLogout;
//# sourceMappingURL=userController.js.map