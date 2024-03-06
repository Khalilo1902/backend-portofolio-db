"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean
    },
    verifyToken: {
        type: Boolean,
        default: false
    },
    access_token: {
        type: String,
    },
}, {
    timestamps: true
});
// userSchema.set("toJSON", {
//     transform: function (doc, ret) {
//         ret.id = ret._id;
//         delete ret._id;
//         delete ret.__v;
//     }
// });
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt_1.default.genSalt(10);
    this.password = await bcrypt_1.default.hash(this.password, salt);
});
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return this.password = await bcrypt_1.default.compare(enteredPassword, this.password);
};
exports.default = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=userModel.js.map