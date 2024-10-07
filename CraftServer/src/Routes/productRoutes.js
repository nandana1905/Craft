const express = require('express')
const productSchema = require('../Models/productSchema')
const { default: mongoose } = require('mongoose')
const cloudinary = require('cloudinary').v2
const {CloudinaryStorage } = require('multer-storage-cloudinary')
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

const produtRoutes = express.Router()


// *********** PRODUCT ************

// ********* PRODUCT ADD ***********

produtRoutes.post('/add_product', upload.single('product_img'), async (req, res) => {
    try {
        const productData = {
            product_name: req.body.product_name,
            description: req.body.description,
            price: req.body.price,
            status: 'Pending',
            quantity: req.body.quantity,
            category: req.body.category,
            product_img: req.file.path,
            loginId: req.body.loginId
        }
console.log("productdata==>",productData);

        

        const addData = await productSchema(productData).save()
        console.log('addData===>', addData);
        if (addData) {
            return res.status(200).json({
                succes: true,
                error: false,
                message: 'Data successfully added'
            })
        } else {
            return res.status(400).json({
                succes: false,
                error: true,
                message: 'Data adding failed'
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

// ********** PRODUCT VIEW ***********

produtRoutes.get('/product_view', async (req, res) => {
    try {
        const viewproduct = await productSchema.find()
        // console.log(viewproduct);
        // console.log('viewproduct===>',viewproduct);
        
        if (viewproduct) {
            res.status(200).json({
                sucess: true,
                error: false,
                data: viewproduct,
                message: 'Data viewed sucessfully'
            })
        } else {
            res.status(400).json({
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

// ************* PRODUCT EDIT ***************

produtRoutes.post('/product_edit/:id', upload.single('product_img'), async (req, res) => {
    try {
        const id = req.params.id
        const oldData = await productSchema.findOne({ _id: id })
        const data = {
            product_name: req.body.product_name ? req.body.product_name : oldData.product_name,
            description: req.body.description ? req.body.description : oldData.description,
            price: req.body.price ? req.body.price : oldData.price,
            quantity: req.body.quantity ? req.body.quantity : oldData.quantity,
            product_img: req.file ? req.file.path : oldData.product_img

        }
        const newData = await productSchema.updateOne({ _id: id }, { $set: data })
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
        console.log(error);

        res.status(500).json({
            succes: false,
            error: true,
            message: 'internal server error',
            errorMessage: error
        })
    }
})

// ************ DELETE PRODUCT ************

produtRoutes.post('/delete_product/:id', async (req, res) => {
    try {
        const id = req.params.id
        const delData = await productSchema.deleteOne({ _id: id })
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

// ************** SINGLE PRODUCT VIEW *************

produtRoutes.get('/single_product_view/:id', async (req, res) => {
    try {
        const id = req.params.id
        // console.log('id====>',id);

        const singleProductView = await productSchema.findOne({ _id: id })
        // console.log('singleproduct===>',singleProductView);



        if (singleProductView) {
            return res.status(200).json({
                sucess: true,
                error: false,
                data: singleProductView,
                message: 'Data viewed sucessfully'
            })
        } else {
            return res.status(400).json({
                sucess: false,
                error: true,
                message: 'Data cannot viwedddddddddd'
            })
        }
    } catch (error) {
        return res.status(500).json({
            succes: false,
            error: true,
            message: 'internal server error',
            errorMessage: error
        })
    }
})

// ************** CATEGORY VIEW ******************

produtRoutes.get('/category_view/:category', async (req, res) => {
    try {

        const categoryView = await productSchema.find({ category: req.params.category })

        if (categoryView) {
            res.status(200).json({
                sucess: true,
                error: false,
                data: categoryView,
                message: 'Category viewed sucessfully'
            })
        } else {
            res.status(400).json({
                sucess: false,
                error: true,
                message: 'Category cannot viwed'
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

// ************** APPORVED PRODUCT ***************

produtRoutes.post('/apporve_product/:id', async (req, res) => {
    try {
        const id = req.params.id
        const upadedData = await productSchema.updateOne({ _id: id }, { $set: { status: 'Approved' } })

        if (upadedData.modifiedCount == 1) {
            return res.status(200).json({
                succes: true,
                error: false,
                message: 'Product has been Approved'
            })
        } else {
            return res.status(200).json({
                succes: false,
                error: true,
                message: 'Error while updating'
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

// ****************** REJECTED PRODUCT ******************

produtRoutes.post('/reject_product/:id', async (req, res) => {
    try {
        const id = req.params.id
        const upadedData = await productSchema.updateOne({ _id: id }, { $set: { status: 'Rejected' } })

        if (upadedData.modifiedCount == 1) {
            return res.status(200).json({
                sucess: true,
                error: false, message: 'Product has been Rejected'
            })
        } else {
            return res.status(200).json({
                succes: false,
                error: true,
                message: 'Error while updating'
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

// ********* USER PRODUCT DETAILS *************

produtRoutes.get('/user_product_view/', CheckAuth,  async (req, res) => {

    try {

        const id = req.userData.UserLoginId

        const userproductview = await productSchema.find({loginId:id})

        // console.log('userproductview===>',userproductview);
        

        if (userproductview) {
            res.status(200).json({
                sucess: true,
                error: false,
                data: userproductview,
                message: 'User product viewed sucessfully'
            })
        } else {
            res.status(400).json({
                sucess: false,
                error: true,
                message: 'User product cannot viwed'
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

module.exports = produtRoutes