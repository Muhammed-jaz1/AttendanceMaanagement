const db = require("../models");
const bcryptjs = require("bcryptjs");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const env = process.env.NODE_ENV || 'local';
const c = require('../config/config.json')[env];
const crypto = require("crypto");
const fs = require("fs");

module.exports = {
  getProfile: async (req, res) => {

    try {
      console.log(req.params.id);
      const {id} = req.params
      console.log({id});
      console.log(db.user);
      const result = await db.user.findOne({ where: { user_id: id } })
      console.log(result);


      res.status(200).json({
        success: true,
        message: "Got the profile",
        data: { result }
      });


    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Cant fetch the profile wrong ",
      });
    }
  },
  updateProfile:async(req,res)=>{
    try {
      const {name,email,address,city,zipcode,state,country,}=req.body
      
      const result=await db.user.update({name,email,address,zipcode,state,country,city},{where : {user_id:req.user.user_id}})
      console.log(result);
      res.status(200).json({
        
        success: true,
        message: "Updated the profile",
        data: result
      });
      
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Cant fetch the profile ",
      });
      
    }
  },
  updateUser:async(req,res)=>{
    try {
      const {name,email,address,city,zipcode,state,country,}=req.body
      const {id}=req.params
      if (req.user.role!=1){
        res.status(500).json({
          success:false,
          message:"you dont have the access to update other user"
        })
      }else{
        const result=await db.user.update({name,email,address,zipcode,state,country,city},{where : {user_id:id}})
        console.log(result);
        res.status(200).json({
          
          success: true,
          message: "Updated the profile",
          data: result
        });
      }
          
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Cant fetch the profile ",
      });
      
    }
  }
  ,
  deleteUser:async(req,res)=>{
    
    try {
      const {id}= req.params
      console.log({id});
      console.log(req.user);
      if(req.user.role!==1){
        res.status(500).json({
          message:"you dont have the access to delete user"
        })
      }else{
        const result = await db.user.destroy({where:{user_id:id}})
        res.status(200).json({
          message:"Deleted the user",
          data:{result},
          success:true
        })
      }
    
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Cant delete the profile ",
      });
      
    }
  },
  allUsers:async(req,res)=>{
    try {
      if (req.user.role!=1){
        res.status(500).json({
          success:false,
          message:"you dont have the access to list users"
        })
      }else{
        const result = await db.user.findAll( { attributes: { exclude: ['password'] }})
        res.status(200).json({
          success:true,
          message:"Listed All the users",
          data :{result}
        })
      }
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Cant list the user ",
      });
    } 
  },
  blockUsers:async(req,res)=>{
    try {
      const {id}= req.params
      if (req.user.role!=1){
        res.status(500).json({
          success:false,
          message:"You dont have the access"
        })
      }else{
        const result=await db.user.update({isActive:false},{where : {user_id:id}})
        res.status(200).json({
          message:"you are permenantly blocked",
          success:false,
          data:{result}
        })
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Cant list the user ",
      });
      
    }
  }
}