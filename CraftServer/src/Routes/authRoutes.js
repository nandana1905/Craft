const express = require('express')
const userSchema = require('../Models/userSchema')
const loginSchema = require('../Models/loginSchema')


const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

const jwt = require('jsonwebtoken')

require('dotenv').config()


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const CloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Craft'
    }
})

const upload = multer({ storage: CloudStorage })

const authRoutes = express.Router()


// ********** REGISTRATION **********

// ********** ADD ***********

authRoutes.post('/user_register', upload.single('user_img'), async (req, res) => {
    try {
        const loginData = {
            email: req.body.email,
            password: req.body.password,
            role: 'User',
            status: 'Pending'
        }
        console.log("loginData===>", loginData);

        const addData = await loginSchema(loginData).save()

        console.log('addData===>', addData);
        if (addData) {
            const data = {
                loginId: addData._id,
                name: req.body.name,
                phone: req.body.phone,
                address: req.body.address,
                age: req.body.age,
                user_img: req.file.path,
            }
            console.log('data===>', data);



            const regsiter = await userSchema(data).save()


            if (regsiter) {

                return res.status(200).json({
                    succes: true,
                    error: false,
                    message: 'Data added sucessfully'
                })
            } else {
                return res.status(400).json({
                    succes: false,
                    error: true,
                    message: 'Data adding failed'
                })
            }
        }

    } catch (error) {
        res.status(500).json({
            succes: false,
            error: true,
            message: 'internal server error',
            errorMessage: error
        })
    }

})

// ************ LOGIN CHECK ***********

authRoutes.post('/login_check', async (req, res) => {
    try {


        const oldData = await loginSchema.findOne({ email: req.body.email })
        console.log('odlddataLogin===>', oldData);

        if (!oldData) {
            console.log(oldData);
            return res.status(400).json({
                succes: false,
                error: true,
                message: 'User not found'
            })
        }

        const password = req.body.password

        if (oldData.password == password) {
            if (oldData.status == 'Pending') {
                return res.status(400).json({
                    succes: false,
                    error: true,
                    message: "Wating for Admin Approvel"
                })
            } else if (oldData.status == 'Reject') {
                return res.status(400).json({
                    succes: false,
                    error: true,
                    message: "User has been blocked"
                })
            } else {

                const token = jwt.sign(
                    {
                        loginId: oldData._id,
                        password: oldData.password,
                        role: oldData.role,
                        status: oldData.status
                    },
                    'private_key',
                    { expiresIn: '4h' }
                )

                return res.status(200).json({
                    succes: true,
                    error: false,
                    message: 'User login successfuly',
                    data: oldData,
                    token: token,
                })
            }
        } else {
            return res.status(400).json({
                succes: false,
                error: true,
                message: 'Password not match'
            })
        }
    } catch (error) {
        res.status(500).json({
            succes: false,
            error: true,
            message: 'internal server error',
            errorMessage: error
        })
    }
})








module.exports = authRoutes