const product = require('../../model/productModel')
const User = require('../../model/userModel')
const asyncHandler = require('express-async-handler')
const { postNotification } = require('../notificationController')
const { sendEmail } = require('../functions')


//get homes for admin
//method get 
//path / 
//access private
const getAllHomesAdmin = asyncHandler(async (req, res) => {
    try {
        const { type } = req.body

        if (type === "published") {
            const homes = await product.find({ status: "published" });
            if (homes) {
                res.status(200).json(homes);
            } else {
                res.status(404).json({ message: "invalid data" });
            }
        }
        else if (type === "rejected") {
            const homes = await product.find({ status: "rejected" });
            if (homes) {
                res.status(200).json(homes);
            } else {
                res.status(404).json({ message: "invalid data" });
            }
        }
        else if (type === "pending") {
            const homes = await product.find({ status: "pending" });
            if (homes) {
                res.status(200).json(homes);
            } else {
                res.status(404).json({ message: "invalid data" });
            }
        }
        else {
            res.status(404).json({ message: "invalid data" });
        }



    } catch (err) {
        res.status(404).json({ message: "", error: err });
    }
});

const putStatusHomeAdmin = asyncHandler(async (req, res) => {
    try {

        const { type, productId } = req.body

        if (type === "published") {
            const homes = await product.findByIdAndUpdate(productId, {
                status: "published"
            }, { new: true })
            if (homes) {
                const user = await User.findById(homes.postedBy, 'email');
                sendEmail(user.email, "Congratulations! Your listing has been approved!", homes, "published")
                await postNotification(null, homes.postedBy, 'Your Property have been Approved and Published.', null);
                res.status(200).json(homes);
            } else {
                res.status(404).json({ message: "invalid data" });
            }
        }

        else if (type === "rejected") {
            const homes = await product.findByIdAndUpdate(productId, {
                status: "rejected"
            }, { new: true })
            if (homes) {
                const user = await User.findById(homes.postedBy, 'email');
                sendEmail(user.email, "We regret to inform you that your listing has been rejected.", homes, "rejected")
                await postNotification(null, homes.postedBy, 'Your Property have been Rejected.', null);
                res.status(200).json(homes);
            } else {
                console.log(homes)
                res.status(404).json({ message: "invalid data" });
            }
        }
        else if (type === "pending") {
            const homes = await product.findByIdAndUpdate(productId, {
                status: "pending"
            }, { new: true })
            if (homes) {
                const user = await User.findById(homes.postedBy, 'email');
                sendEmail(user.email, "Your listing is under review.", homes, "pending")
                await postNotification(null, homes.postedBy, 'Your Property is waiting for Approval to be Published.', null);
                res.status(200).json(homes);
            } else {
                res.status(404).json({ message: "invalid data" });
            }
        }
        else {
            res.status(404).json({ message: "invalid data" });
        }


    } catch (err) {
        res.status(404).json({ message: "", error: err });
    }
});





module.exports = {
    getAllHomesAdmin,
    putStatusHomeAdmin
}