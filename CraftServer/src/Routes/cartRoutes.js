const express = require('express')
const cartSchema = require('../Models/cartSchema')
const { default: mongoose } = require('mongoose')



const cartRoutes = express.Router()


//************ ADD CART *****************/

cartRoutes.post('/add_cart', async (req, res) => {

    try {

        const Data = {

            user_loginId: req.body.user_loginId,
            productId: req.body.productId,
            status: 'In Cart',
            quantity: '1'

        }

        const oldData = await cartSchema.findOne({ user_loginId: req.body.user_loginId, productId: req.body.productId, })

        if (oldData) {
            const updateData = await cartSchema.updateOne({ _id: oldData._id }, { $set: { quantity: oldData.quantity + 1 } })

            if (updateData) {

                return res.status(200).json({
                    succes: true,
                    error: false,
                    message: 'Quantity incremented successfully'
                })

            }

        } else {


            const cartData = {

                user_loginId: req.body.user_loginId,
                productId: req.body.productId,
                status: 'In Cart',
                quantity: '1'

            }

            const addData = await cartSchema(cartData).save()

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

// *********** VIEW CART ***********

cartRoutes.get('/view_cart/:id', async (req, res) => {

    try {

        const viewCart = await cartSchema.aggregate(

            [
                {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'user_loginId',
                        'foreignField': 'loginId',
                        'as': 'user'
                    }
                }, {
                    '$lookup': {
                        'from': 'products',
                        'localField': 'productId',
                        'foreignField': '_id',
                        'as': 'product'
                    }
                }, {
                    '$unwind': '$user'
                }, {
                    '$unwind': '$product'
                },
                {
                    '$match': {
                        'user_loginId': new mongoose.Types.ObjectId(req.params.id)
                    }
                },
                {
                    '$group': {
                        '_id': '$_id',
                        'quantity': { '$first': '$quantity' },
                        'status': { '$first': '$status' },
                        'name': { '$first': '$user.name' },
                        'phone': { '$first': '$user.phone' },
                        'product_name': { '$first': '$product.product_name' },
                        'price': { '$first': '$product.price' },
                        'category': { '$first': '$product.category' },
                        'product_img': { '$first': '$product.product_img' },
                    }
                }
            ]

        )


        if (viewCart) {

            return res.status(200).json({
                succes: true,
                error: false,
                data: viewCart,
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

// ************ DELETE CART ************

cartRoutes.post('/delete_cart/:id', async (req, res) => {
    try {

        const id = req.params.id
        const delData = await cartSchema.deleteOne({ _id: id })

        if (delData.deletedCount == 1) {
            return res.status(200).json({
                succes: true,
                error: false,
                data: delData,
                message: 'Item remove form cart'
            })

        } else {
            return res.status(400).json({
                succes: false,
                error: true,
                message: 'Item cannot remove form cart'
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

// **********  CART QUANTITY INCREMENT ************

cartRoutes.post('/quantity_increment/:id', async (req, res) => {

    try {

        const id = req.params.id
        const data = await cartSchema.findOne({ _id: id })
        // console.log('data==>',data);
        
        const newquantity = data.quantity + 1
        const quantity =await cartSchema.updateOne({ _id: id }, { $set: { quantity: newquantity } })

        if ( quantity.modifiedCount==1) {

            return res.status(200).json({
                succes: true,
                error: false,
                message: 'Quantity incremented successfully'
            })

        } else {

            return res.status(400).json({
                succes: true,
                error: false,
                message: 'Quantity incremented failed'
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

// ********* CRAT QUANTITY DECREMENT *************


cartRoutes.post('/quantity_decremented/:id', async (req, res) => {

    try {

        const id = req.params.id
        const data = await cartSchema.findOne({ _id: id })
        // console.log('data==>',data);
        
        const newquantity = data.quantity - 1
        const quantity =await cartSchema.updateOne({ _id: id }, { $set: { quantity: newquantity } })

        if ( quantity.modifiedCount==1) {

            return res.status(200).json({
                succes: true,
                error: false,
                message: 'Quantity decremented successfully'
            })

        } else {

            return res.status(400).json({
                succes: true,
                error: false,
                message: 'Quantity decremented failed'
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











module.exports = cartRoutes