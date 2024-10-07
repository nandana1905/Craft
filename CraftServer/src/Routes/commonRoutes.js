const express = require('express')


const commonRoutes = express.Router()
commonRoutes.use(express.static('./Public/'))


// ************* HOME PAGE ************

commonRoutes.get('/home', (req, res) => {
    return res.render('homepage')
})

module.exports = commonRoutes