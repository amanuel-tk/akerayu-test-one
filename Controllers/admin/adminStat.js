const user = require('../../model/userModel')
const product = require('../../model/productModel')
const message = require('../../model/messageModel')
const asyncHandler = require('express-async-handler')

const userCounter=asyncHandler(async(req,res)=>{
    try {
        const userCount = await user.countDocuments();
        res.status(200).json(userCount);
    } catch (error) {
        console.error('Error counting users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
const propertyCounter=asyncHandler(async(req,res)=>{
    try {
        const propertyCount = await product.countDocuments();
        res.status(200).json(propertyCount);
    } catch (error) {
        console.error('Error counting users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
const messageCounter=asyncHandler(async(req,res)=>{
    try {
        const messageCount = await message.countDocuments();
        res.status(200).json(messageCount);
    } catch (error) {
        console.error('Error counting users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
const viewCounter = asyncHandler(async (req, res) => {
    try {
        
        const viewCount = await product.find().populate('view');
        let totalViews = 0;
        viewCount.forEach(product => {
            totalViews += product.view.length; // Add the views count to the total
        });
        res.status(200).json(totalViews );
    } catch (error) {
        console.error('Error counting views:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports={
    userCounter,
    propertyCounter,
    viewCounter,
    messageCounter
}