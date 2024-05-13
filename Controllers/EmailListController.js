const EmailList= require('../model/emailListModel')
const asyncHandler = require('express-async-handler');


const postEmail=asyncHandler(async(req,res)=>{
    const email=req.body.subEmail

    try {
        if(email===""){
            return res.status(404).json({ message: "Please try again." });

        }
        const subEmail=await EmailList.create({
            email:email
        })
        if(subEmail){
            return res.status(201).json({message:"Thank you for Subscribing."})
        }
        else{
            return res.status(404).json({ message: "Something went Wrong, Please try again." });
        }
    } catch (error) {
        return res.status(404).json({ message: "Something went Wrong, Please try again." });
    }
})

module.exports={
    postEmail
}