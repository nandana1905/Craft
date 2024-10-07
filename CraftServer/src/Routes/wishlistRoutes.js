const express = require('express')
const wishlistSchema = require('../Models/wishlistSchema')
const { default: mongoose } = require('mongoose')



const wishlistRoutes = express.Router()

// ************* ADD WISHLIST *************

wishlistRoutes.post('/add_wishlist', async (req, res) => {

    try {

        const Data = await wishlistSchema.findOne({
            user_loginId: req.body.user_loginId,
            productId: req.body.productId,
        })

        if (Data) {

            const delData = await wishlistSchema.deleteOne({ _id: Data._id })
            if (delData) {
                return res.status(200).json({
                    succes: true,
                    error: false,

                    message: 'Product remove from wishlist'
                })
            } else {
                return res.status(400).json({
                    succes: false,
                    error: true,
                    message: "Product cannot remove from wishlist"
                })
            }

        } else {

            const wishlistData = {
                user_loginId: req.body.user_loginId,
                productId: req.body.productId,
            }

            const addData = await wishlistSchema(wishlistData).save()
            console.log('addDataWishlist==>', addData);

            if (addData) {
                return res.status(200).json({
                    succes: true,
                    error: false,
                    message: 'Product added to wishlist'
                })
            } else {
                return res.status(400).json({
                    succes: false,
                    error: true,
                    message: 'Product adding failed to wishlist'
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

// *********** VIEW WISHLIST ***************

wishlistRoutes.get('/view_wishlist/:id', async (req, res) => {
    const id = req.params.id
    console.log('wishid====>', id);


    try {
        const viewWishlist = await wishlistSchema.aggregate([
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'user_loginId',
                    'foreignField': 'loginId',
                    'as': 'User'
                }
            }, {
                '$lookup': {
                    'from': 'products',
                    'localField': 'productId',
                    'foreignField': '_id',
                    'as': 'Product'
                }
            }, {
                '$unwind': '$User'
            }, {
                '$unwind': '$Product'
            }, {
                '$match': {
                    'user_loginId': new mongoose.Types.ObjectId(id)
                }
            },
            {
                '$group': {
                    '_id': '$_id',
                    'name': { '$first': '$User.name' },
                    'phone': { '$first': '$User.phone' },
                    'product_name': { '$first': '$Product.product_name' },
                    'price': { '$first': '$Product.price' },
                    'description': { '$first': '$Product.description' },
                    'product_img': { '$first': '$Product.product_img' },
                    'productId': { '$first': '$Product._id' },
                    'user_loginId': { '$first': '$User.loginId' },
                }
            }
        ])


        console.log("viewWish==>", viewWishlist);



        if (viewWishlist) {
            res.status(200).json({
                sucess: true,
                error: false,
                data: viewWishlist,
                message: 'Wishlist viewed sucessfully'
            })
        } else {
            res.status(400).json({
                sucess: false,
                error: true,
                message: 'Wishlist cannot viwed'
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

// ************ DELETE WISHLIST **********

wishlistRoutes.post('/delete_wishlist/:id', async (req, res) => {
    try {

        const id = req.params.id
        const delData = await wishlistSchema.deleteOne({ _id: id })

        if (delData.deletedCount == 1) {
            return res.status(200).json({
                succes: true,
                error: false,
                data: delData,
                message: 'Item remove form wishlist'
            })

        } else {
            return res.status(400).json({
                succes: false,
                error: true,
                message: 'Item cannot remove form wishlist'
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

module.exports = wishlistRoutes