const express = require('express')
const userSchema = require('../Models/userSchema')
const productSchema = require('../Models/productSchema')
const loginSchema = require('../Models/loginSchema')


const adminRoutes = express.Router()

// ************** USER ******************

// ************** SINGLE VIEW USER PROFILE *************

adminRoutes.get('/admin_single_user_view/:id',async (req, res) => {
    try {
        const id = req.params.id
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

// ************** VIEW USER PROFILE *****************

adminRoutes.get('/admin_userview_profile', async (req, res) => {
    try {
        const viewprofile = await userSchema.find().populate('loginId')
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

// ************* EDIT PROFILE ***********

adminRoutes.put('/admin_edit_profile/:id', async (req, res) => {
    try {
        const id = req.params.id
        const oldData = await userSchema.findOne({ _id: id })
        const data = {
            name: req.body.name ? req.body.name : oldData.name,
            address: req.body.address ? req.body.address : oldData.address,
            phone: req.body.phone ? req.body.phone : oldData.phone,
            age: req.body.age ? req.body.age : oldData.age
        }
        const newData = await userSchema.updateOne({ _id: id }, { $set: data })
        if (newData.modifiedCount == 1) {
            return res.status(200).json({
                succes: true,
                error: false,
                data: oldData,
                message: 'Successfully upade data'
            })
        } else {
            return res.status(400).json({
                sucess: false,
                error: true,
                message: 'Fail to upade data'
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

adminRoutes.post('/admin_delete_profile/:id', async (req, res) => {
    try {
        const id = req.params.id
        const delData = await userSchema.deleteOne({ loginId: id })
        if (delData.deletedCount == 1) {

            const DeleteLogin = await loginSchema.deleteOne({ _id: id })

            if (DeleteLogin.deletedCount == 1) {
                return res.status(200).json({
                    succes: true,
                    error: false,
                    data: delData,
                    message: 'Successfully delete data'
                })
            }


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

// ************** USER APPORVAL **********

adminRoutes.post('/admin_apporve_user/:id', async (req, res) => {
    try {
        const id = req.params.id

        const upadedData = await loginSchema.updateOne({ _id: id }, { $set: { status: 'Approved' } })

        if (upadedData.modifiedCount == 1) {
            return res.status(200).json({
                succes: true,
                error: false,
                message: 'User has been Approved'
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

// ***************** USER REJECT *******************

adminRoutes.post('/admin_reject_user/:id', async (req, res) => {
    try {
        const id = req.params.id
        const upadedData = await loginSchema.updateOne({ _id: id }, { $set: { status: 'Rejected' } })

        if (upadedData.modifiedCount == 1) {
            return res.status(200).json({
                succes: true,
                error: false,
                message: 'User has been Rejected'
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


// *********** PRODUCT ************

// ********** PRODUCT VIEW ***********

adminRoutes.get('/admin_product_view', async (req, res) => {
    try {
        const viewproduct = await productSchema.find().populate('loginId')
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

adminRoutes.post('/admin_product_edit/:id', async (req, res) => {
    try {
        const id = req.params.id
        const oldData = await productSchema.findOne({ _id: id })
        const data = {
            product_name: req.body.product_name ? req.body.product_name : oldData.product_name,
            description: req.body.description ? req.body.description : oldData.description,
            price: req.body.price ? req.body.price : oldData.price,
            quantity: req.body.quantity ? req.body.quantity : oldData.quantity

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
        res.status(500).json({
            succes: false,
            error: true,
            message: 'internal server error',
            errorMessage: error
        })
    }
})

// ************ DELETE PRODUCT ************

adminRoutes.post('/admin_delete_product/:id', async (req, res) => {
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


// ************** APPORVED PRODUCT ***************

adminRoutes.post('/admin_apporve_product/:id', async (req, res) => {
    try {
        const id = req.params.id
        // console.log('idApprove===>',id);


        const upadedData = await productSchema.updateOne({ _id: id }, { $set: { status: 'Approved' } })
        // console.log('upadedData===>',upadedData);


        if (upadedData.modifiedCount == 1) {
            return res.status(200).json({
                success: true,
                error: false,
                message: 'Product has been Approved'
            })
        } else {
            return res.status(400).json({
                success: false,
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

adminRoutes.post('/admin_reject_product/:id', async (req, res) => {
    try {
        const id = req.params.id
        // console.log('idReject===>',id);

        const upadedData = await productSchema.updateOne({ _id: id }, { $set: { status: 'Rejected' } })

        if (upadedData.modifiedCount == 1) {
            return res.status(200).json({
                sucess: true,
                error: false, message: 'Product has been Rejected'
            })
        } else {
            return res.status(400).json({
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

adminRoutes.get('/admin_user_product_view/:id', async (req, res) => {

    try {

        const id = req.params.id

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



module.exports = adminRoutes