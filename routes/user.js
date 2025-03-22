import express from "express";
import User from "../models/User.js";

export const userRouter = express.Router();

/**
 * POST create a new user
 */
userRouter.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user).status(201);
  } catch (e) {
    console.error(e);
    res.json({ message: e.message }).status(400);
  }
});


/**
 * GET get all users
 */
userRouter.get('/', async(req, res) => {
    try {
        const users = await User.find();
        res.json(users).status(201);
    } catch (e) {
      console.error(e);
      res.json({ message: e.message }).status(400);
    }
})

/**
 * GET user by the id
 */
userRouter.get('/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user).status(201);
    } catch (e) {
      console.error(e);
      res.json({ message: e.message }).status(400);
    }
})

//Update user 
userRouter.patch("/:id", async(req,res) =>{
  try{
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,   //update user
      {new: true} //return updated document in postman
    );

    if(!updatedUser) res.send("User not found").status(404);
    else res.send(updatedUser).status(200)

  }catch(e){
    console.error(e);
    res.json({ message: e.message }).status(400);
  }
})

/**
 * DELETE user by id
 */
userRouter.delete("/:id", async(req,res) =>{
  try{
    const deletedUser= await User.findByIdAndDelete(req.params.id)
    if(!deletedUser){
      return res.send("User not found");
    }
    res.send("User deleted succesfully")
  }catch(error){
    console.error(error);
    res.send(error.message)
  }
})
