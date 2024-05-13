const product = require('../model/productModel')
const userModel = require('../model/userModel')
const asyncHandler = require('express-async-handler')
var mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const { sendEmail } = require('./functions')

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');


//get homes 
//method get 
//path / 
//access public
const getHomes = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Invalid Data!" });
    }
    // console.log("amanuel")
    try {
        if (!mongoose.Types.ObjectId.isValid(req.query.id)) {
            // console.log(1)
            return res.status(400).json({ message: "Invalid Data!" });
        }
        const homes = await product.findById(req.query.id);
        if (homes) {
            res.status(200).json(homes);
        } else {
            res.status(404).json({ message: "Invalid Data!" });
        }
    } catch (err) {
        res.status(404).json({ message: "", error: err });
    }
});

// const getAllHomes = asyncHandler(async (req, res) => {
//     const homes = await product.find({ status: "published" })
//     if (homes) {
//         res.status(201).json(homes)
//     }
//     else {
//         res.status(404).json({ message: "invalid data" })
//     }
// }
// )

// const getAllHomes = asyncHandler(async (req, res) => {
//     console.log(req.body)
//     const lat = req.body.initialCenter.lat;
//     const lng = req.body.initialCenter.lng;

//     const loadMore = req.body.loadMore;
//     const batchSize = 15; // Number of homes to send in each batch

//     // Calculate skip value based on loadMore
//     const skip = (loadMore - 1) * batchSize;

//     const homes = await product.find({
//         location: {
//             $near: {
//                 $geometry: {
//                     type: "Point",
//                     coordinates: [lng, lat],
//                 },
//                 $maxDistance: 1000000000000, // Specify the maximum distance in meters
//             },
//         },
//         status: "published",
//     })
//         .skip(skip) // Skip the appropriate number of documents based on loadMore
//         .limit(batchSize); // Limit the number of documents to fetch in this batch

//     if (homes.length > 0) {
//         res.status(200).json(homes);
//     } else {
//         res.status(404).json({ message: "You Have Reached The End Please Comeback Later." });
//     }
// });

const getAllHomes = asyncHandler(async (req, res) => {
    let lat, lng;
    if (req.body.initialCenter) {
        lat = req.body.initialCenter.lat;
        lng = req.body.initialCenter.lng;
    } else if (req.body.lat && req.body.lng) {
        lat = req.body.lat;
        lng = req.body.lng;
    } else {
        // Handle missing initialCenter or lat/lng here
        res.status(400).json({ message: "Missing initialCenter or lat/lng in request body" });
        return;
    }

    const loadMore = req.body.loadMore || 1; // Default value is 1 if loadMore is not provided
    const batchSize = 15; // Number of homes to send in each batch

    // Calculate skip value based on loadMore
    const skip = (loadMore - 1) * batchSize;

    try {
        const homes = await product.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat],
                    },
                    $maxDistance: 1000000000000, // Specify the maximum distance in meters
                },
            },
            status: "published",
        })
            .skip(skip) // Skip the appropriate number of documents based on loadMore
            .limit(batchSize); // Limit the number of documents to fetch in this batch

        if (homes.length > 0) {
            res.status(200).json(homes);
        } else {
            res.status(404).json({ message: "You Have Reached The End Please Comeback Later." });
        }
    } catch (error) {
        // Handle any potential errors
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const postSimilarProp = asyncHandler(async (req, res) => {

    const lat = req.body.initialCenter.lat;
    const lng = req.body.initialCenter.lng;
    // console.log(lat)

    const homes = await product.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat],
                },
                $maxDistance: 1000000000000000, // Specify the maximum distance in meters
            },
        },
        status: "published",

    });

    const arrayToCheck = req.body.homeType; // Assuming req.body is an array

    const matchingObjects = homes.filter(obj => {
        return arrayToCheck.some(type => obj.homeType.includes(type));
    });

    // console.log(matchingObjects);
    if (matchingObjects.length > 0) {
        // console.log("Home(s) found");
        res.status(200).json(matchingObjects);
    } else {
        // console.log("No published homes found with the specified criteria");
        res.status(404).json({ message: "No published homes found" });
    }

});



const getUserHomes = asyncHandler(async (req, res) => {

    const query = { "postedBy": req.user._id };

    const homes = await product.find(query)
    if (homes) {
        res.status(201).json(homes)
    }
    else {
        res.status(404).json({ message: "invalid data" })
    }
}
)

const postHomes = asyncHandler(async (req, res) => {
    let { title, description, price, locationName, exactLocation, homeType, showProFor, kitchenCounter, kitchenShared, bathroomShared, bathroomCounter, bedroomCounter, utility, phoneNumber, whatsApp, facebook, telegram, location } = req.body

    // Check if location is provided and parse the coordinates
    try {
        if (!location) {
            res.status(400).json({ message: "Invalid location data" });
            return; // Exit the function
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid JSON data1" });
        return; // Exit the function
    }

    const { lat, lng } = JSON.parse(location);

    // Parse utility, homeType, and location if they are provided as strings
    try {
        if (typeof utility === 'string') {
            utility = JSON.parse(utility);
        }
        if (typeof homeType === 'string') {
            homeType = JSON.parse(homeType);
        }
        if (typeof location === 'string') {
            location = JSON.parse(location);
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid JSON data" });
        return; // Exit the function
    }

    // Validate and process uploaded images
    const files = req.files;

    const selectedImages = [];
    if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
            const { size, mimetype } = files[i];
            const outputFilePath = path.join("./public/profileImg/", path.basename(req.files[i].path, path.extname(req.files[i].path)) + '.webp');
            if (mimetype === 'image/png' || mimetype === 'image/jpeg' || mimetype === 'image/webp') {
                if (mimetype !== 'image/webp') {
                    const sharpConversionPromise = new Promise((resolve, reject) => {
                        let quality;
                        if (req.files[i].size < 250000) {
                            quality = 60;
                        } else if (req.files[i].size < 500000) {
                            quality = 45;
                        } else if (req.files[i].size < 1000000) {
                            quality = 25;
                        } else if (req.files[i].size < 1500000) {
                            quality = 15;
                        } else {
                            quality = 5;
                        }
                        console.log(req.files[i].path)
                        sharp(req.files[i].path).webp({
                            // Configure WebP conversion options
                            quality: quality,
                            lossless: false,
                        }).toFile(outputFilePath, (err, info) => {
                            if (err) {
                                // console.error(err);
                                reject(err);
                            } else {
                                // console.log(`Image compressed and converted to WebP: ${outputFilePath}`);
                                resolve();
                            }
                        });
                    });

                    // Wait for the conversion process to complete before deleting the original file
                    await sharpConversionPromise;
                    //   fs.unlinkSync(req.files[i].path)

                }

                selectedImages.push({
                    filename: path.basename(outputFilePath),
                    size
                });
            } else {
                res.status(400).json({ message: "Please provide correct image types" });
                return; // Exit the function
            }
        }
    } else {
        res.status(400).json({ message: "Please provide all images" });
        return; // Exit the function
    }

    // Validate if all necessary data is provided
    if (!title || !price || !showProFor || !homeType || !req.user._id) {
        res.status(400).json({ message: "Please provide all details" });
        return; // Exit the function
    }

    try {
        // Create a new home record
        const homes = await product.create({
            title: title,
            description: description,
            price: price,
            location: {
                type: 'Point',
                coordinates: [lng, lat],
            },
            locationName: locationName,
            exactLocation: exactLocation,
            selectedImages,
            postedBy: req.user._id,
            homeType,
            propertyFor: showProFor,
            bedRoom: bedroomCounter,
            bathRoom: bathroomCounter,
            kitchen: kitchenCounter,
            kitchenShared: kitchenShared,
            bathroomShared: bathroomShared,
            utility,
            phoneNumber: phoneNumber,
            whatsApp: whatsApp,
            facebook: facebook,
            telegram: telegram,
            status: "pending"
        });

        // Send success response if home is created successfully
        if (homes) {

            const user = await userModel.findById(homes.postedBy, 'email');
            sendEmail(user.email, "Your listing is under review.", homes, "pending")
            sendEmail(process.env.ADMIN_EMAIL, "New Listing", homes, "admin")
            res.status(201).json({ message: "success" });
        } else {
            res.status(404).json({ message: "invalid data" });
        }
    } catch (error) {
        // Handle errors if any
        console.error('Error creating home:', error.message);
        res.status(404).json({ message: "Something went wrong. Please try again!" });
    }
});


const updateHome = asyncHandler(async (req, res) => {

    const productId = req.body.productId;
    const imagesToBeDelete = req.body.imagesToBeDelete;
    console.log(imagesToBeDelete);
    const profileImgDelete = req.body.profileImgDelete ? req.body.profileImgDelete : '';
    let utility = req.body.utility;
    let homeType = req.body.homeType;
    let location = req.body.location;
    console.log(location)
    const { lat, lng } = JSON.parse(location);
    try {
        if (typeof utility === 'string') {
            utility = JSON.parse(utility);
        }
        if (typeof homeType === 'string') {
            homeType = JSON.parse(homeType);
        }
        if (typeof location === 'string') {
            location = JSON.parse(location);
        }
    } catch (error) {
        // console.log(error)
        res.status(400).json({ message: "Invalid JSON data" });
        return;
    }


    if (profileImgDelete !== '') {
        const filter = { _id: productId };
        const update = { $pull: { selectedImages: { filename: { $in: profileImgDelete } } } };
        const options = { new: true }; // Return the updated document

        // Update the product document
        const updatedProduct = await product.findOneAndUpdate(filter, update, options);

        if (updatedProduct) {
            // console.log(`Selected images ${profileImgDelete} removed from product ${productId}`);
        } else {
            // console.log(`Failed to remove selected images from product ${productId}`);
        }
    }

    const files = req.files;
    const selectedImages = [];
    if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
            const { size, mimetype } = files[i];
            const outputFilePath = path.join("./public/profileImg/", path.basename(req.files[i].path, path.extname(req.files[i].path)) + '.webp');
            if (mimetype === 'image/png' || mimetype === 'image/jpeg' || mimetype === 'image/webp') {
                if (mimetype !== 'image/webp') {
                    const sharpConversionPromise = new Promise((resolve, reject) => {
                        let quality;
                        if (req.files[i].size < 250000) {
                            quality = 60;
                        } else if (req.files[i].size < 500000) {
                            quality = 45;
                        } else if (req.files[i].size < 1000000) {
                            quality = 25;
                        } else if (req.files[i].size < 1500000) {
                            quality = 15;
                        } else {
                            quality = 5;
                        }
                        console.log(req.files[i].path)
                        sharp(req.files[i].path).webp({
                            // Configure WebP conversion options
                            quality: quality,
                            lossless: false,
                        }).toFile(outputFilePath, (err, info) => {
                            if (err) {
                                // console.error(err);
                                reject(err);
                            } else {
                                // console.log(`Image compressed and converted to WebP: ${outputFilePath}`);
                                resolve();
                            }
                        });
                    });

                    // Wait for the conversion process to complete before deleting the original file
                    await sharpConversionPromise;
                    //   fs.unlinkSync(req.files[i].path)

                }

                selectedImages.push({
                    filename: path.basename(outputFilePath),
                    size
                });
            } else {
                res.status(400).json({ message: "Please provide correct image types" });
                return; // Exit the function
            }
        }
    } else {
        res.status(400).json({ message: "Please provide all images" });
        return; // Exit the function
    }

    const currentProduct = await product.findById(productId);
    const updatedSelectedImages = currentProduct.selectedImages.concat(selectedImages);
    try {
        const homes = await product.findByIdAndUpdate(productId, {
            title: req.body.title,
            price: req.body.price,
            selectedImages: updatedSelectedImages,
            location: {
                type: 'Point',
                coordinates: [lng, lat],
            },
            locationName: req.body.locationName,
            exactLocation: req.body.exactLocation,
            description: req.body.description,
            propertyFor: req.body.showProFor,
            bedRoom: req.body.bedroomCounter,
            bathRoom: req.body.bathroomCounter,
            phoneNumber: req.body.phoneNumber,
            facebook: req.body.facebook,
            whatsApp: req.body.whatsApp,
            telegram: req.body.telegram,
            utility,
            homeType,
            kitchen: req.body.kitchenCounter,
            kitchenShared: req.body.kitchenShared,
            bathroomShared: req.body.bathroomShared,
            status: "pending"
        }, { new: true })

        if (homes) {
            if (imagesToBeDelete) {
                let a = imagesToBeDelete.split(',')
                console.log(a.length)
                a.forEach((filename, index) => {
                    try {
                        fs.unlinkSync(path.join("./public/profileImg/", filename))
                    }
                    catch (error) {
                    }
                });
            }
            res.status(201).json({ message: "success" })
            const user = await userModel.findById(homes.postedBy, 'email');
            sendEmail(user.email, "Your listing is under review.", homes, "pending")
            sendEmail(process.env.ADMIN_EMAIL, "New Listing", homes, "admin")
        }
        else {
            res.status(404).json({ message: "invalid data" })
        }
    } catch (error) {
        console.error('Error creating home:', error.message);
        res.status(404).json({ message: "Something went wrong. Please try again! " })
    }

















    // console.log(req.body)
    // console.log(req.files)
})

const DeleteOneHome = asyncHandler(async (req, res) => {
    const productId = req.body.id;
    const deletedProduct = await product.findByIdAndDelete({
        _id: productId,
        postedBy: req.user._id
    });

    if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Deleted successfully' });
});


module.exports = {
    getHomes,
    postHomes,
    DeleteOneHome,
    updateHome,
    getUserHomes,
    getAllHomes,
    postSimilarProp
}