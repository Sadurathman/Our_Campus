import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

//@desc     Fetch all posts
//@route    Get /posts
//@access   Public
const getPosts = asyncHandler(async (req, res) => {
  const {username} = req.body;
  const user = await User.findOne({username});

  const home = await Post.find().where('_id').in(user.home).exec();
  const suggestions = await (await User.find().where('_id')).includes(user.suggestions).exec();

  res.json({home, suggestions, user});
});

//@desc     Fetch single post
//@route    Get /posts/:id
//@access   Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

//@desc     Delete a post
//@route    DELETE /posts/:id
//@access   Private/Admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    await post.remove();
    res.json({ message: "Post removed" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

//@desc     create a post
//@route    POST /posts
//@access   Private/Admin
const createPost = asyncHandler(async (req, res) => {
  const {username, image, caption} = req.body;
  const post = new Post({
    username,
    image,
    caption,
    likes: [],
  });

  const createdProduct = await post.save();
  res.status(201).json(createdProduct);
});

//@desc     Update a post
//@route    PUT /posts/:id
//@access   Private/Admin
const updatePost = asyncHandler(async (req, res) => {
  const { caption } = req.body;
  const post = await Post.findById(req.params.id);

  if (post) {
    post.caption = caption;
    const updatedPost = await post.save();
    res.status(201).json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

//@desc     Create a review
//@route    POST /posts/:id/comments
//@access   Private
const craetePostComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const post = await Post.findById(req.params.id);

  if (post) {
    const alreadyReviewed = post.comments.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    // if (alreadyReviewed) {
    //   res.status(400);
    //   throw new Error("Post already reviewed");
    // }

    const review = {
      name: req.user.name,
      comment,
      user: req.user._id,
    };

    post.comments.push(review);

    post.numComments = post.comments.length;

    await post.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

//@desc     Get top rated Products
//@route    GET /posts/top
//@access   Public
const getTopPost = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).sort({ rating: -1 }).limit(3);
  res.json(posts);
});

export {
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getPosts,
  craetePostComment,
  getTopPost,
};
