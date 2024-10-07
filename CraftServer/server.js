const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')

const authRoutes = require('./src/Routes/authRoutes');
const userRoutes = require('./src/Routes/userRouter');
const produtRoutes = require('./src/Routes/productRoutes');
const commonRoutes = require('./src/Routes/commonRoutes');
const adminRoutes = require('./src/Routes/adminRoutes');
const cartRoutes = require('./src/Routes/cartRoutes');
const wishlistRoutes = require('./src/Routes/wishlistRoutes');


const app = express()

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Database conneted successfully ");
}).catch((error) => {
    console.log(error);
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/product', produtRoutes)
app.use('/api/common', commonRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/wishlist',wishlistRoutes)


app.set("views", "./src/Views/")
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    return res.send("Wellcome to my craft world")
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on http://localhost:3005");
})