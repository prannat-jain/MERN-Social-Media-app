import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/
//gets all posts for the homepage
router.get("/", verifyToken, getFeedPosts);
//gets a user's posts
router.get("/:userId/posts", verifyToken, getUserPosts);

/*UPDATE*/
router.patch("/:id/like", verifyToken, likePost);

export default router;
