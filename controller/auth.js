const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const env = process.env.NODE_ENV || 'local';
const c = require('../config/config.json')[env];
const crypto = require("crypto");
const fs = require("fs");
const nodemailer= require('nodemailer');
const user = require("./user");
const serviceSID="VAf86cb5cf2481f482e414e47de266ec3a"
const accountSID="AC6cea6ac067856e8c4ba9c4a2bf7e9284"
const authToken="dcf6f9199e89748f2ecde77880c5b584"
const client =require("twilio")(accountSID,authToken)
const adminCred = {
  name: "admin",
  email: "superAdmin@mail.com",
  role: 1,
  password: "SuperAdmin",
  mobile:"9999999999"
};
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
      user: 'jaz@spericorn.com',
      pass: '***********'
  }
});


module.exports = {
  signUp: async (req, res) => {
    try {
      const salt = await bcryptjs.genSalt(10);
      const hash = await bcryptjs.hash(req.body.password, salt);
      const users = {
        name: req.body.name,
        email: req.body.email,
        mobile:req.body.mobile,
        password: hash,
        role: 2
      };
      const result = await db.user.create(users);
      if(!result){
        res.status(200).json({
          success:false,
          message:"Something went wrong"
        })
      }else{

        await transporter.sendMail({
          from: 'jaz@spericorn.com',
          to: users.email,
          subject: 'Test Email Subject',
          text: 'Welcome to Jazrivin'
      });
        return res.status(200).json({
          success: true,
          message: "user created Successfully",
          data: { result }
        })
      }
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "something went wrong",
      });

    }
  },
  adminSeed: async (req, res) => {
    try {
      const salt = await bcryptjs.genSalt(10);
      adminCred.password = await bcryptjs.hash(adminCred.password, salt);
      const adminseed = await db.user.create(adminCred)
      return res.status(200).json({
        success: true,
        message: "Admin seeded Successfully",
        data: { adminseed }
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  },
  doLogin: async (req, res) => {
    try {
      console.log("entered", req.body);
      const user = await db.user.findOne({ where: { email: req.body.email } });
      if (!user) {
        res.status(200).json({
          success: false,
          message: "No User Found",
        });
      }
      if (!user.isActive) {
        res.status(401).json({
          success: false,
          message: "your account is blocked"
        })
      } else {
        bcryptjs.compare(req.body.password, user.password, (err, result) => {
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                user_id: user.id,
              },
              "secret"
            );
            res.status(200).json({
              success: true,
              message: "authentication successfull",
              token: token,
            });
          } else {
            res.status(200).json({
              success: false,
              message: "invalid credentials",
            });
          }
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong",
      });
    }
  },
  callOtp: async (req, res) => {
    try {

      let Mobile = req.body.mobile
      console.log(Mobile);
      const user = await db.user.findOne({ where: { mobile: Mobile } });
      if (!user) {
        res.status(500).json({
          success: false,
          message: "No such user"
        })
      

      } else {
      
     client.verify.services(serviceSID).verifications.create({
        to:"+91"+Mobile,
        channel:"sms" 
      })
     
      
      res.status(200).json({
        success:true,
        message:"otp sent successfully"
        

      })
      }


    } catch (error) {
      res.status(404).json({
        success:false,
        message:"something went wrong"
      })

    }
  },
  otpVerify:async(req,res)=>{
   try {
    let Mobile = req.body.mobile
    const {code} =req.body
    const user = await db.user.findOne({ where: { Mobile: Mobile } });
    
    if(!user){
      res.status(500).json({
        success:false,
        message:"no user found"
      })
    }
    else{

     client.verify.services(serviceSID).verificationChecks.create({
       to:"+91"+Mobile,
       code:code
     })
     .then((resp) => {
      console.log("otp res", resp);
      if (resp.valid) {
        const token = jwt.sign(
          {
            email: user.email,
            user_id: user.id,
          },
          "secret"
        );
            
          res.status(200).json({
            success:true,
            message:"otp verified",
            data:token
          })
       
      }
      res.json({resp, message: "Expire Otp" });
    });
     
    }
   } catch (error) {
     res.status(404).json({
       success:false,
       message:"something went wrong"
     })
     
   }
  }
};










