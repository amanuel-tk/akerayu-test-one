const product = require('../model/notificationModel');
const user =require('../model/userModel')
const asyncHandler = require('express-async-handler');





const getNotification = asyncHandler(async (req, res) => {
    const receiverId = req.user._id
    const notification = await product.find({ receiverId: receiverId }).sort({ createdAt: -1 });
    if(notification){
      await user.findByIdAndUpdate(receiverId, { $set: { notification: 0 } });

    }
    res.status(200).json({ notification })
});

const postNotification = asyncHandler(async (senderId,receiverId,message,messageType) => {

    // console.log(req.user.id)
    // const { message,productOwnerId } = data
    // const myId = req.user.id
    
    const notification = await product.create({
        message,
        receiverId,
        senderId,
        messageType
        
      });

      if(notification){
       await user.findByIdAndUpdate(receiverId, { $inc: { notification: 1 } });
       
        
      }
    

      



});

module.exports = {
    getNotification,
    postNotification
    //   deleteFavorite
};