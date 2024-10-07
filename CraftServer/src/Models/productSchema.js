const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    product_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
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
    category: {
        type: String,
        required: true
    },
    product_img:{
        type: String,
        required: true
    },
    loginId:{
        type: mongoose.Types.ObjectId,
        ref:'login',
        required: true
    },

});



module.exports = mongoose.model('product', productSchema)