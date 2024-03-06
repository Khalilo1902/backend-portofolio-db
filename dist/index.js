"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnect_1 = __importDefault(require("./config/dbConnect"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
(0, dbConnect_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: function (origin, callback) {
        // Hier können Sie überprüfen, ob der Origin-Header akzeptiert werden soll
        if (origin === 'https://khalil-dev.me') {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(userRouter_1.default);
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server is running on PORT http://localhost:${PORT}`));
//# sourceMappingURL=index.js.map