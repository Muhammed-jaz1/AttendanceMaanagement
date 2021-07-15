const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const env = process.env.NODE_ENV || 'local';
const c = require('../config/config.json')[env];
const fs = require("fs");
const { NOW } = require("sequelize");
const moment = require('moment')

module.exports = {
    addLeave: async (req, res) => {

        try {

            const leave = {
                date: moment().format("DD/MM/YYYY"),
                reason: req.body.reason,
                user_id: req.user.user_id


            }

            const result = await db.leave.create(leave)
            res.status(200).json({
                success: true,
                message: "added leave",
                data: result

            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }
    },
    markIn: async (req, res) => {
        try {
            let today = moment().format("DD/MM/YYYY")
            const solo = await db.leave.findOne({ where: { user_id: req.user.user_id, date: today } })
            if (!solo) {

                let current_time = moment().format("HH:mm:ss")

                const present = {
                    markIn: current_time,

                    user_id: req.user.user_id
                }
                const result = await db.attendance.create(present)
                console.log(result);
                res.status(200).json({
                    success: true,
                    message: "Mark in time Updated",
                    data: { result }
                })
            } else {
                res.status(401).json({
                    success: false,
                    message: "You cant markin"
                })
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }
    },
    markOut: async (req, res) => {
        try {
            let today = moment().format("DD/MM/YYYY")
            const solo = await db.leave.findOne({ where: { user_id: req.user.user_id, date: today } })
            if (!solo) {
                let markOut = moment().format("HH:mm:ss")
                const result = await db.attendance.update({ markOut }, { where: { user_id: req.user.user_id } })
                console.log(result);
                res.status(200).json({
                    success: true,
                    message: "Mark Out time Updated",
                    data: { result }
                })
            }


        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }
    },
    attendanceStatus: async (req, res) => {
        try {
            if(req.user.role!=1){
                res.status(500).json({
                    success:false,
                    message:"you dont have the access to update other user"
                  }) 
            }else{
                let attendance = await db.attendance.findAll()
            attendance = attendance.map(i => i.dataValues)
            // this gives an object with dates as keys
            const groups = attendance.reduce((accumulator, current) => {
                const date = moment(current.createdAt).format('DD/MM/YYYY')
                if (!accumulator[date]) {
                    accumulator[date] = [];
                }
                accumulator[date].push(current);
                return accumulator;
            }, {});

            // Edit: to add it in the array format instead
            const groupArrays = Object.keys(groups).map((date) => {
                return {
                    date,
                    count: groups[date].length
                };
            });

            res.status(200).json({
                success: true,
                message: 'attendance status listed',
                data: { groupArrays }
            })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: error.message
            })
        }

    }
}
