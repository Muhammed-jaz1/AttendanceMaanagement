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
    }
}
