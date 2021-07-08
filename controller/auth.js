const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const env = process.env.NODE_ENV || 'local';
const c = require('../config/config.json')[env];
const crypto = require("crypto");
const fs = require("fs");
const User = db.user;


const adminCred = {
    name: "admin",
    email: "superAdmin@mail.com",
    role: 1,
    password: "SuperAdmin",
};


module.exports = {
    signUp: async (req, res) => {
        try {
            const salt = await bcryptjs.genSalt(10);
            const hash = await bcryptjs.hash(req.body.password, salt);
            const users = {
                name: req.body.name,
                email: req.body.email,
                password: hash,
                role: 2
            };
            const result = await db.user.create(users);
            return res.status(200).json({
                success: true,
                message: "user created Successfully",
                data: { result }
            })
        } catch(error) {
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
        } catch (error){
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Something went wrong",
            });
        }
    },
    doLogin:async(req,res)=>{
        try {
            console.log("entered", req.body);
            const user = await db.user.findOne({ where: { email: req.body.email } });
            if (!user) {
              res.status(200).json({
                success: false,
                message: "No User Found",
              });
            } 
            if(!user.isActive){
              res.status(401).json({
                  success:false,
                  message:"your account is blocked"
              })
          }else {
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
    }
}
