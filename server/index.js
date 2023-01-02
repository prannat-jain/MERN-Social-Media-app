import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
//this has path and routes for the auth feature
import authRoutes from "./routes/auth.js";
//this has path and routes for user features
import userRoutes from "./routes/users.js";
//this has path and routes for creating a new post and related features
import postRoutes from "./routes/posts.js";
import { createPost } from "./controllers/posts.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

/*CONFIG (Middleware: i.e functions that run inbetween different operations)*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//so that we can use dot env files
dotenv.config();
//invoking express application
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
//invoking cross origin resource sharing policy
app.use(cors());
//storing assets locally
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/*FILE STORAGE*/

//this is how you save files using multer(check gh repo for the same)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/*ROUTES WITH FILES AUTHORISATION FOR UPLOAD*/
app.post("/auth/register", upload.single("picture", register));
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/*ROUTES*/
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/*MONGOOSE SETUP (BACKEND)*/
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port : ${PORT}`));

    //inserting dummy data
    //ADD THEM ONE AT A TIME!!!
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
