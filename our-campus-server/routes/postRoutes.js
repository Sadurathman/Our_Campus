import express from "express";
import {
  craetePostComment,
  createPost,
  deletePost,
  getPostById,
  getPosts,
  getTopPost,
  updatePost,
} from "../controllers/postController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getPosts).post(protect, admin, createPost);
router.route("/:id/comments").post(protect, craetePostComment);
router.get("/top", getTopPost);
router
  .route("/:id")
  .post(protect, getPosts)
  .post(protect, admin, createPost);

router
  .route("/:id")
  .get(getPostById)
  .delete(protect, admin, deletePost)
  .put(protect, admin, updatePost);

export default router;