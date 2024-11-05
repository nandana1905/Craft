const express = require('express')
const cartSchema = require('../Models/cartSchema')
const orderSchema = require('../Models/orderSchema')




const orderRoutes = express.Router()

// ************ CART ADD PRODUCT ORDER *************

orderRoutes.post('/cart_addProduct_order/:id', async (req, res) => {
    try {

        const id = req.params.id
        const OrderData = await cartSchema.find({ user_loginId: id, status: 'In Cart' })
        console.log('orderdata====>', OrderData);

        for (let i = 0; i < OrderData.length; i++) {

            const arrayData = {
                user_loginId: OrderData[i].user_loginId,
                productId: OrderData[i].productId,
                quantity: OrderData[i].quantity,
                status: 'Order Placed'
            }

            const addData = await orderSchema(arrayData).save()
            console.log('addData=====>', addData);

        }

        const deleteCart = await cartSchema.deleteMany({ user_loginId: id })
        console.log('deleteCart====>', deleteCart);

        return res.status(200).json({
            succes: true,
            error: false,
            message: 'Order placed successfully '
        })

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

// ************* MY ORDER **************














module.exports = orderRoutes