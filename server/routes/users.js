import express from "express";

import {
  getUser,
  getUserFriends,
  addRemoveFriends,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ ROUTE*/
//"/:id" is like a query string which grabs data from the database of the id
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/*UPDATE*/
router.patch("/:id/:friendID", verifyToken, addRemoveFriends);
