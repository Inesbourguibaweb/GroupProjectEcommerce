const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_Key;

module.exports.authenticate = (req, res, next) =>{
    // console.log(req.cookies.usertoken);
    jwt.verify(req.cookies.usertoken, SECRET, (err, payload) =>{
        if(err){
            console.log("Authetication failed!");
            res.status(401).json({verified: false});
        }else{
            req.Token=payload;
            next();
        }
    } )
}
