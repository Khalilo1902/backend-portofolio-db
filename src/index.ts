import express from "express"
import dotenv from "dotenv"
import dbConnect from "./config/dbConnect";
import userRouter from "./router/userRouter";
import cookieParser from "cookie-parser"
import cors from "cors"



dotenv.config()

dbConnect()

const app = express()
app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
      // Hier können Sie überprüfen, ob der Origin-Header akzeptiert werden soll
      if (origin === 'https://khalil-dev.me') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));app.use(express.json())
app.use(cookieParser())

app.use(userRouter)

const PORT = process.env.PORT || 3003

app.listen(PORT,()=>console.log(`Server is running on PORT http://localhost:${PORT}`))