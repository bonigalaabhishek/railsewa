const express = require("express");
const router = express.Router();
const User = require('../models/userModels');
const bcrypt = require("bcrypt")


router.post('/register', async(req,res)=>{
    try{
  const userExists = await User.findOne({email: req.body.email});
  if (userExists) {
  return res.send({
    success: true,
    message: "User Already exists"
  });
}
 

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password,salt);
  req.body.password= hashedPassword;

  const newUser = await User(req.body);
  await newUser.save();

  res.send({
    success:true,
    message:"User created successfully"
  })
    } catch(err){
        console.log(err);
        res.send({
            success:false,
            message:err
        })
    }

})

router.post('/login', async(req,res)=>{
  try{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        res.send({
            success:false,
            message:'User does not exists'
        })
    }
    const validPassword= await bcrypt.compare(req.body.password,user.password);
    if(!validPassword){
        res.send({
            success:false,
            message:'Password is invalid'
        });
        return;
    }
    res.send({
        success:true,
        message:'Logged In'
    })
  }catch(err){
    console.log(err)
  }
})

module.exports = router;