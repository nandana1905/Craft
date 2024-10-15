const express = require('express')
const userSchema = require('../Models/userSchema')
const loginSchema = require('../Models/loginSchema')


const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')


const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");

const multer = require('multer')

require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "nandanadev30@gmail.com",
        pass: "jdbincobqmlwlxdh",
    },
});

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

            console.log("register==>", regsiter);

            if (regsiter) {

                return res.status(200).json({
                    succes: true,
                    error: false,
                    message: 'Registration sucessfully'
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

// ********** SET NEW PASSWORD ************

authRoutes.post('/email_verification', async (req, res) => {
    try {
        const data = await loginSchema.findOne({ email: req.body.email })
        if (!data) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "You are not registered with us"
            })
        } else {

            var val = Math.floor(1000 + Math.random() * 9000);
            console.log(val);//creating random 4 digit number

            const mailOptions = {
                from: "craft@gmail.com",
                to: req.body.email,
                subject: "OTP-verification",
                text: (`Your One Time Password ${val}`),

            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email: ", error);
                    return res.status(400).json({
                        success: false,
                        error: true,
                        message: "Error sending email: ",
                        errorMessage: error
                    })

                } else {
                    console.log("Email sent: ", info.response);
                    return res.status(200).json({
                        success: true,
                        error: false,
                        message: 'Email sent:',
                        otp: val,
                        email: req.body.email
                    })
                }
            });

        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error ",
            errorMessage: error
        })
    }
})

// ********* PASSWORD UPDATE **********

authRoutes.post('/password_update', async (req, res) => {

    try {

        const data = {
            password: req.body.password
        }
        console.log('dataPassword====>',req.body.password);

        const newData = await loginSchema.updateOne(
            { email: req.body.email }, 
            { $set: data }     
        );
        

        if (newData.modifiedCount == 1) {
            return res.status(200).json({
                succes: true,
                error: false,
                data: newData,
                message: 'Password successfully update '
            })
        } else {
            return res.status(400).json({
                sucess: false,
                error: true,
                message: 'Password fail to update '
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