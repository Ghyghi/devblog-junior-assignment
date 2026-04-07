import { protect } from "../middlewares/authMiddleware.js";
import { Router } from "express";
const router = Router();
import { getAllComments, createComment, updateComment, deleteComment } from "../controllers/commentController.js";
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/postController.js";


//===================Post Routes===================
router.get("/post", getAllPosts);
router.get("/post/:id", getPostById);
router.post("/post", protect, createPost);
router.put("/post/:id", protect, updatePost);
router.delete("/post/:id", protect, deletePost);

//===================Comment Routes===================
router.get("/comment", getAllComments);
router.post("/comment", protect, createComment);
router.put("/comment/:id", protect, updateComment);
router.delete("/comment/:id", protect, deleteComment);

export default router;
