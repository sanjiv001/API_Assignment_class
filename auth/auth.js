const jwt = require("jsonwebtoken");
const customer = require("../model/customer_model")
const user = require("../model/usermodel");

module.exports.customerGuard=(req,res,next)=>{
try{
    const token = req.headers.authorization.split("")[1];
    const data = jwt.verify(token, "softwarica");
    console.log(data);
    this.customerGuard.findone({_id : data.userId})
    .then((cdata)=>{
        req.customerInfo = cdata;
        next();
    })
    .catch((e)=>{
        res.json({msg: "Invalid token"})
    })
}
catch(e)
{
 res.json({msg:"Invalid Token"})
}

}