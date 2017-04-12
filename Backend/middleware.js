const jwt = require("jsonwebtoken");
require('dotenv').config({path :"./test.env"});

module.exports = (req, res, next) => {
        const authorizationHeader = req.headers.authorization;
        if(authorizationHeader){
            const token = authorizationHeader.split(' ')[1];
            try {
                const decodedToken = jwt.verify(token, ""+process.env.TOKEN_SECRET);
                req.userData = { userId: decodedToken.userId };
                next(); // User is logged in, pass control to the next middleware or route
            } catch (error) {
                res.status(401).send('Invalid or expired token');
            }
        } else{
            return res.status(400).send("Authentication error")
        }
}
