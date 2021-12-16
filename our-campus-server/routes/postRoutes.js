import express from "express";
import {
  craetePostComment,
  createPost,
  deletePost,
  getPostById,
  getTopPost,
  updatePost,
  getPosts
} from "../controllers/postController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createPost);
router.route("/:id/comments").post(protect, craetePostComment);
router.get("/top", getTopPost);
router
  .route("/:id")
  .post(protect, getPosts)
  .post(protect, admin, createPost);

router
  .route("/:id")
  .get(getPostById)
  .delete(protect, deletePost)
  .put(protect, updatePost);

export default router;