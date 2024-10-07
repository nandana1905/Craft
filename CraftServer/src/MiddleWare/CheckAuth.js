const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    try {
        
        const token = req.headers.authorization.split(' ')[1]
        console.log('token===>',token);

        const decodeToken = jwt.verify(token,'private_key')
        console.log("decode==>", decodeToken);



        req.userData = {
            UserLoginId: decodeToken.loginId,
            password: decodeToken.password,
            role: decodeToken.role,
            status: decodeToken.status
        }

        console.log('userData==>', req.userData);

        next()

    } catch (error) {
        res.status(401).json({ message: 'Auth Failed please login' })
    }

}