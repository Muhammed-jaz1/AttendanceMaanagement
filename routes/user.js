const express = require('express')
const router = express.Router();
const authController = require("../controller/auth");
const userController = require('../controller/user')
const { checkToken } = require('../middlewares/auth');


/**
 * @swagger
 *  /sign-up:
 *      post:
 *          tags:
 *              -   Auth
 *          description: Signup
 *          parameters:
 *              -   in: body
 *                  name : request body
 *                  description: All fields are required.
 *                  type: object
 *                  schema:
 *                      properties:
 *                          name:
 *                              type: string
 *                              required: true,
 *                              example: "jaz"
 *                          email:
 *                              type: string
 *                              required: true,
 *                              example: "test@mailinator.com"
 *                          password:
 *                              type: string,
 *                              required: true,
 *                              example: "123456"                     
 *                                         
 *          responses:
 *              200 :
 *                  description: login successfull
 *
 *
 */
router.post('/sign-up', authController.signUp);


/**
 * @swagger
 *  /login:
 *      post:
 *          tags:
 *              -   Auth
 *          description: Login
 *          parameters:
 *              -   in: body
 *                  name : request body
 *                  description: All fields are required.
 *                  type: object
 *                  schema:
 *                      properties:
 *                          email:
 *                              type: string
 *                              required: true,
 *                              example: "test@mailinator.com"
 *                          password:
 *                              type: string,
 *                              required: true,
 *                              example: "123456"                   
 *          responses:
 *              200 :
 *                  description: login successfull
 *
 *
 */
router.post('/login', authController.doLogin)

/**
  * @swagger
  *  /admin-seed:
  *      get:
  *          
  *          tags:
  *              -   Seed's Admin
  *          description: Admin seed                           
  *          responses:
  *              200 :
  *                  description: Admin seeded
  *
  *
  */
router.get('/admin-seed', authController.adminSeed)
/**
* @swagger
*   /profile/{id}:
*      get:
*          security:
*              - Bearer: []
*          tags:
*              -   User Profile
*          description: User Profile
* 
*          parameters:
*              -   in: path
*                  name: id
*                  type: number
*                  required: true
*                  description: userId  
*          
*                                            
*          responses:
*              200 :
*                  description: Fetched User profile
*
*/
router.get("/profile/:id", checkToken, userController.getProfile)

/**
 * @swagger
 *  /update:
 *      put:
 *          security:
*              - Bearer: []
 *          tags:
 *              -   Update User
 *          description: Update user
 *          parameters:
 * 
 *              -   in: body
 *                  name : request body
 *                  description: All fields are required.
 *                  type: object
 *                  schema:
 *                      properties:
 *                          email:
 *                              type: string
 *                              required: true,
 *                              example: "test@mailinator.com"
 *                          name:
 *                              type: string
 *                              required: true,
 *                              example: "test@mailinator.com"
 *                          address:
 *                              type: string
 *                              required: true,
 *                              example: "xyz"
 *                          city:
 *                              type: string
 *                              required: true,
 *                              example: "xyz"
 *                          zipcode:
 *                              type: string
 *                              required: true,
 *                              example: "5255"
 *                          country:
 *                              type: string
 *                              required: true,
 *                              example: "india"
 *                          state:
 *                              type: string
 *                              required: true,
 *                              example: "india"
 *                                             
 *          responses:
 *              200 :
 *                  description: update user successfull
 *
 *
 */

router.put("/update", checkToken, userController.updateProfile)
/**
 * @swagger
 *  /update:
 *      put:
 *          security:
*              - Bearer: []
 *          tags:
 *              -   Update User
 *          description: Update user
 *          parameters:
 *           parameters:
*              -   in: path
*                  name: id
*                  type: number
*                  required: true
*                  description: userId 
 * 
 *              -   in: body
 *                  name : request body
 *                  description: All fields are required.
 *                  type: object
 *                  schema:
 *                      properties:
 *                          email:
 *                              type: string
 *                              required: true,
 *                              example: "test@mailinator.com"
 *                          name:
 *                              type: string
 *                              required: true,
 *                              example: "test@mailinator.com"
 *                          address:
 *                              type: string
 *                              required: true,
 *                              example: "xyz"
 *                          city:
 *                              type: string
 *                              required: true,
 *                              example: "xyz"
 *                          zipcode:
 *                              type: string
 *                              required: true,
 *                              example: "5255"
 *                          country:
 *                              type: string
 *                              required: true,
 *                              example: "india"
 *                          state:
 *                              type: string
 *                              required: true,
 *                              example: "india"
 *                                             
 *          responses:
 *              200 :
 *                  description: update user successfull
 *
 *
 */

router.put('/update-user',checkToken,userController.updateUser)

/**
* @swagger
*   /delete-user/{id}:
*      delete:
*          security:
*              - Bearer: []
*          tags:
*              -   Delete User 
*          description: Delete User
* 
*          parameters:
*              -   in: path
*                  name: id
*                  type: number
*                  required: true
*                  description: userId  
*          
*                                            
*          responses:
*              200 :
*                  description: Deleted User profile
*
*/
 router.delete('/delete-user/:id',checkToken, userController.deleteUser)

/**
* @swagger
*   /list-user:
*      get:
*          security:
*              - Bearer: []
*          tags:
*              -   List User
*          description: List User
* 
*          
*          
*                                            
*          responses:
*              200 :
*                  description: Fetched All Users
*
*/
router.get('/list-user',checkToken, userController.allUsers)
/**
* @swagger
*   /block-user/{id}:
*      put:
*          security:
*              - Bearer: []
*          tags:
*              -   Block User 
*          description: Block User
* 
*          parameters:
*              -   in: path
*                  name: id
*                  type: number
*                  required: true
*                  description: userId  
*          
*                                            
*          responses:
*              200 :
*                  description: Blocked User profile
*
*/
router.put('/block-user/:id',checkToken, userController.blockUsers)

module.exports = router;