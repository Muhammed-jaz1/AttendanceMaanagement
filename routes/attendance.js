const express = require('express')
const router = express.Router();
const leaveController = require("../controller/attendance");
const { checkToken } = require('../middlewares/auth');





/**
 * @swagger
 *  /attendance/add-leave:
 *      post:
 *          security:
*              - Bearer: []
 *          tags:
 *              -   Add leave
 *          description: Add leave
 *          parameters:
 * 
 *              -   in: body
 *                  name : request body
 *                  description: All fields are required.
 *                  type: object
 *                  schema:
 *                      properties:
 *                          reason:
 *                              type: string
 *                              required: true,
 *                              example: "xyz"
 *                                             
 *          responses:
 *              200 :
 *                  description: leave added successfully 
 *
 *
 */

router.post('/add-leave',checkToken,leaveController.addLeave)
/**
 * @swagger
 *  /attendance/markin:
 *      post:
 *          security:
*              - Bearer: []
 *          tags:
 *              -   Entry Time
 *          description: Add entry time
 *          responses:
 *              200 :
 *                  description: added entry tme successfully 
 *
 *
 */

router.post('/markin',checkToken,leaveController.markIn)
/**
 * @swagger
 *  /attendance/markout:
 *      put:
 *          security:
*              - Bearer: []
 *          tags:
 *              -   Entry Time
 *          description: Add entry time
 *          responses:
 *              200 :
 *                  description: added entry tme successfully 
 *
 *
 */

router.put('/markout',checkToken,leaveController.markOut)
module.exports = router;