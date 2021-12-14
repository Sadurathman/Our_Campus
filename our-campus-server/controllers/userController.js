import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateTokens.js";

//@desc     Auth user & get token
//@route    POST /users/login
//@access   Public
const authUser = asyncHandler(async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      name: user.name,
      dp: user.dp,
      tagline: user.tagline,
      about: user.about,
      rating: user.rating,
      respect: user.respect,
      userType: user.userType,
      skills: user.skills,
      hobbies: user.hobbies,
      followers: user.followers,
      following: user.following,
      requests: user.requests,
      requested: user.requested,
      suggestions: user.suggestions,
      joinedEvents: user.joinedEvents,
      hostedEvents: user.hostedEvents,
      posts: user.posts,
      home: user.home,
      clubs: user.clubs,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username");
  }
});

//@desc     Register  New user
//@route    POST /users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, userType} = req.body;
  const userExsists = await User.findOne({ username });

  if (userExsists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    username,
    userType,
    dp,
    tagline: "",
    about: "",
    rating: 0,
    respect: 0,
    skills: [],
    hobbies: [],
    followers: [],
    following: [],
    requests: [],
    requested: [],
    suggestions: [],
    joinedEvents: [],
    hostedEvents: [],
    posts: [],
    home: [],
    clubs: [],
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      name: user.name,
      dp: user.dp,
      tagline: user.tagline,
      about: user.about,
      rating: user.rating,
      respect: user.respect,
      userType: user.userType,
      skills: user.skills,
      hobbies: user.hobbies,
      followers: user.followers,
      following: user.following,
      requests: user.requests,
      requested: user.requested,
      suggestions: user.suggestions,
      joinedEvents: user.joinedEvents,
      hostedEvents: user.hostedEvents,
      posts: user.posts,
      home: user.home,
      clubs: user.clubs,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid user Data");
  }
});

//@desc     Get user profile
//@route    GET /users/profile
//@access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      name: user.name,
      dp: user.dp,
      tagline: user.tagline,
      about: user.about,
      rating: user.rating,
      respect: user.respect,
      userType: user.userType,
      skills: user.skills,
      hobbies: user.hobbies,
      followers: user.followers,
      following: user.following,
      requests: user.requests,
      requested: user.requested,
      suggestions: user.suggestions,
      joinedEvents: user.joinedEvents,
      hostedEvents: user.hostedEvents,
      posts: user.posts,
      home: user.home,
      clubs: user.clubs,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//@desc     Update user profile
//@route    PUT /users/profile
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
      user.username = req.body.username || user.username,
      user.name = req.body.name || user.name,
      user.dp = req.body.dp || user.dp,
      user.tagline = req.body.tagline || user.tagline,
      user.about = req.body.about || user.about,
      user.rating = req.body.rating || user.rating,
      user.respect = req.body.respect || user.respect,
      user.userType = req.body.userType || user.userType,
      user.skills = req.body.skills || user.skills,
      user.hobbies = req.body.hobbies || user.hobbies,
      user.followers = req.body.followers || user.followers,
      user.following = req.body.following || user.following,
      user.requests = req.body.requests || user.requests,
      user.requested = req.body.requested || user.requested,
      user.suggestions = req.body.suggestions || user.suggestions,
      user.joinedEvents = req.body.joinedEvents || user.joinedEvents,
      user.hostedEvents = req.body.hostedEvents || user.hostedEvents,
      user.posts = req.body.posts || user.posts,
      user.home = req.body.home || user.home,
      user.clubs = req.body.clubs || user.clubs

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      name: updatedUser.name,
      dp: updatedUser.dp,
      tagline: updatedUser.tagline,
      about: updatedUser.about,
      rating: updatedUser.rating,
      respect: updatedUser.respect,
      userType: updatedUser.userType,
      skills: updatedUser.skills,
      hobbies: updatedUser.hobbies,
      followers: updatedUser.followers,
      following: updatedUser.following,
      requests: updatedUser.requests,
      requested: updatedUser.requested,
      suggestions: updatedUser.suggestions,
      joinedEvents: updatedUser.joinedEvents,
      hostedEvents: updatedUser.hostedEvents,
      posts: updatedUser.posts,
      home: updatedUser.home,
      clubs: updatedUser.clubs,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//@desc     Get all users
//@route    GET /users
//@access   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc     Delete user
//@route    DELETE /users/:id
//@access   Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User Removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc     Get user by id
//@route    GET /users/:id
//@access   Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//@desc     Update user
//@route    PUT /users/:id
//@access   Private/admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username,
    user.name = req.body.name || user.name,
    user.dp = req.body.dp || user.dp,
    user.tagline = req.body.tagline || user.tagline,
    user.about = req.body.about || user.about,
    user.rating = req.body.rating || user.rating,
    user.respect = req.body.respect || user.respect,
    user.userType = req.body.userType || user.userType,
    user.skills = req.body.skills || user.skills,
    user.hobbies = req.body.hobbies || user.hobbies,
    user.followers = req.body.followers || user.followers,
    user.following = req.body.following || user.following,
    user.requests = req.body.requests || user.requests,
    user.requested = req.body.requested || user.requested,
    user.suggestions = req.body.suggestions || user.suggestions,
    user.joinedEvents = req.body.joinedEvents || user.joinedEvents,
    user.hostedEvents = req.body.hostedEvents || user.hostedEvents,
    user.posts = req.body.posts || user.posts,
    user.home = req.body.home || user.home,
    user.clubs = req.body.clubs || user.clubs

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      name: updatedUser.name,
      dp: updatedUser.dp,
      tagline: updatedUser.tagline,
      about: updatedUser.about,
      rating: updatedUser.rating,
      respect: updatedUser.respect,
      userType: updatedUser.userType,
      skills: updatedUser.skills,
      hobbies: updatedUser.hobbies,
      followers: updatedUser.followers,
      following: updatedUser.following,
      requests: updatedUser.requests,
      requested: updatedUser.requested,
      suggestions: updatedUser.suggestions,
      joinedEvents: updatedUser.joinedEvents,
      hostedEvents: updatedUser.hostedEvents,
      posts: updatedUser.posts,
      home: updatedUser.home,
      clubs: updatedUser.clubs,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

export {
  getUserById,
  updateUser,
  registerUser,
  deleteUser,
  getUsers,
  updateUserProfile,
  authUser,
  getUserProfile,
};
