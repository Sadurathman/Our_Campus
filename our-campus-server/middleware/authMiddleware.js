import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = expressAsyncHandler(async (req, res, next)=>{
  let token;
  if(req.headers.authorization && req.header.authorization.startsWith("Bearer")){
    try{
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      next();
    }catch(error){
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  }
  if(!token){
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const student = (req, res, next) =>{
  if(req.user && req.user.userType === 1){
    next();
  }else{
    res.status(401);
    throw new Error("Not Authorized as staff");
  }
}

const staff = (req, res, next) =>{
  if(req.user && req.user.userType === 2){
    next();
  }else{
    res.status(401);
    throw new Error("Not Authorized as staff");
  }
}

const admin = (req, res, next) =>{
  if(req.user && req.user.userType === 3){
    next();
  }else{
    res.status(401);
    throw new Error("Not Authorized as staff");
  }
}

export {protect, student, staff, admin};