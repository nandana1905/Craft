const express = require('express')
const userSchema = require('../Models/userSchema')

const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')
const CheckAuth = require('../MiddleWare/CheckAuth')

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

const userRoutes = express.Router()

// ************** VIEW USER PROFILE *****************

userRoutes.get('/view_profile', async (req, res) => {
    try {
        const viewprofile = await userSchema.find()
        if (viewprofile) {
            return res.status(200).json({
                succes: true,
                error: false,
                data: viewprofile,
                message: 'Data viewed sucessfully'
            })
        } else {
            return res.status(400).json({
                sucess: false,
                error: true,
                message: 'Data cannot viwed'
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

// *************** SINGLE USER VIEW ***************

userRoutes.get('/single_user_view/',CheckAuth, async (req, res) => {
    try {
        const id = req.userData.UserLoginId
        // console.log('singleuserid===>', id);

        const singleUserView = await userSchema.findOne({ loginId: id }).populate('loginId')

        // console.log('singleUserView===>', singleUserView);


        if (singleUserView) {
            return res.status(200).json({
                sucess: true,
                error: false,
                data: singleUserView,
                message: 'User viewed sucessfully'
            })
        } else {
            return res.status(400).json({
                sucess: false,
                error: true,
                message: 'User cannot viwed'
            })
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({
            succes: false,
            error: true,
            message: 'internal server error',
            errorMessage: error
        })
    }
})


// ************* EDIT PROFILE ***********

userRoutes.post('/edit_profile/:id', upload.single('user_img'), async (req, res) => {
    try {
        const id = req.params.id
        // console.log('edit_profile_id======>',id);
        
        const oldData = await userSchema.findOne({ _id: id })
        // console.log('edit_profile_oldData=====>',oldData);
        
        const data = {
            name: req.body.name ? req.body.name : oldData.name,
            address: req.body.address ? req.body.address : oldData.address,
            phone: req.body.phone ? req.body.phone : oldData.phone,
            age: req.body.age ? req.body.age : oldData.age,
            user_img: req.file ? req.file.path : oldData.user_img
        }
        const newData = await userSchema.updateOne({ _id: id }, { $set: data })

        // console.log('newData===>', newData);


        if (newData.modifiedCount == 1) {
            return res.status(200).json({
                succes: true,
                error: false,
                data: oldData,
                message: 'Successfully update data'
            })
        } else {
            return res.status(400).json({
                sucess: false,
                error: true,
                message: 'Fail to update data'
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

// ************ DELETE PROFILE ************

userRoutes.post('/delete_profile/:id', async (req, res) => {
    try {
        const id = req.params.id
        const delData = await userSchema.deleteOne({ _id: id })
        if (delData.deletedCount == 1) {
            return res.status(200).json({
                succes: true,
                error: false,
                data: delData,
                message: 'Successfully delete data'
            })
        } else {
            return res.status(400).json({
                succes: false,
                error: true,
                message: "Data cannot delete"
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





module.exports = userRoutes