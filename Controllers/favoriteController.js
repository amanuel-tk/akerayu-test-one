const product = require('../model/productModel');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const getFavorite = asyncHandler(async (req, res) => {
    const myId = req.user._id
    const favorite = await product.find({ "favorite.favoriteBy": myId });
    res.status(200).json({ favorite })
});
const postFavorite = [
    body('productId').notEmpty().isMongoId().withMessage('Invalid productId'),

    asyncHandler(async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { productId } = req.body;
        const myId = req.user._id;

        if (!myId) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        try {
            const favorite = await product.findById(productId);

            if (!favorite) {
                return res.status(404).json({ error: 'Product not found' });
            }

            const exists = favorite.favorite.some(item => item.favoriteBy.equals(myId));

            if (exists) {
                favorite.favorite.remove({ favoriteBy: myId });
                await favorite.save();
                res.status(200).json({ "Response": "removed" });
            } else {
                favorite.favorite.push({ favoriteBy: myId });
                await favorite.save();
                res.status(201).json({ "Response": "Added" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }),
];

module.exports = {
    getFavorite,
    postFavorite,
};