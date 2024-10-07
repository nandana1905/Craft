const mongoose = require('mongoose')

const cartShema = new mongoose.Schema({

    user_loginId: {
        type: mongoose.Types.ObjectId,
        ref: 'login',
        required: true
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
        required: true
    },
    status: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },

})

module.exports = mongoose.model('cart', cartShema)