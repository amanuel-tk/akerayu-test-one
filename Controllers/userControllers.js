const user = require('../model/userModel')
const massageModel = require('../model/messageModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const product = require('../model/productModel')
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
var mongoose = require('mongoose');
const { sendEmail } = require('./functions')


//get user 
//method get 
//path /user/
//access public
const getUser = asyncHandler(async (req, res) => {
  const users = await user.findById(req.user)
  res.status(200).json({ users })
}
)

const updateProfilePic = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Check if the input file exists
  if (!fs.existsSync(req.file.path)) {
    throw new Error('Input file does not exist.');
  }

  // Determine the output file path for WebP conversion
  const outputFilePath = path.join("./public/profilePhoto/", path.basename(req.file.path, path.extname(req.file.path)) + '.webp');
  try {

    if (req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/webp') {
      // Use Sharp to convert the image to WebP format
      if (req.file.mimetype !== 'image/webp') {
        const sharpConversionPromise = new Promise((resolve, reject) => {
          let quality;
          if (req.file.size < 250000) {
            quality = 60;
          } else if (req.file.size < 500000) {
            quality = 45;
          } else if (req.file.size < 1000000) {
            quality = 25;
          } else if (req.file.size < 1500000) {
            quality = 15;
          } else {
            quality = 5;
          }
          console.log(req.file.path)
          sharp(req.file.path).webp({
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
        // fs.unlinkSync(req.file.path)
        // console.log(`Original file deleted: ${req.file.path}`);
      }

      // Update the filename in updatedPhoto to the new filename of the WebP image
      const updatedPhoto = {
        filename: path.basename(outputFilePath),
        size: req.file.size,
        // name:req.body.name
      };

      const me = await user.findById(userId);
      if (!me) {
        return res.status(404).json({ message: 'User not found' });
      }

      me.photo = updatedPhoto;

      const resultUserOne = await massageModel.updateMany(
        { userOneId: userId },
        { $set: { userOneImage: updatedPhoto.filename } }
      );
      const resultUserTwo = await massageModel.updateMany(
        { userTwoId: userId },
        { $set: { userTwoImage: updatedPhoto.filename } }
      );
      const result = await me.save();
      if (result) {
        if (req.body.oldPhoto) {
          try {
            fs.unlinkSync(path.join("./public/profilePhoto/", req.body.oldPhoto))
          }
          catch (error) {

          }
        }
        return res.status(201).json({ message: "Successfully Changed" });
      }
    } else {
      res.status(415).json({ message: "Please provide correct image types" });
    }
  } catch (error) {
    // console.error('Error updating profile picture:', error);
    res.status(500).json({ message: 'Error updating profile picture' });
  }
});

// const updateProfilePic = asyncHandler(async (req, res) => {
//   const userId = req.user._id;

//   // Check if the input file exists
//   if (!fs.existsSync(req.file.path)) {
//     throw new Error('Input file does not exist.');
//   }

//   // Determine the output file path for WebP conversion
//   const outputFilePath = path.join(path.dirname(req.file.path), path.basename(req.file.path, path.extname(req.file.path)) + '.webp');

//   try {
//     if (req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/webp') {
//       // Use Sharp to convert the image to WebP format
//       if (req.file.mimetype !== 'image/webp') {
//         await sharp(req.file.path)
//           .resize({ width: 800 }) // Adjust dimensions as needed
//           .jpeg({ quality: 60 }) // Compress JPEG images
//           .toFormat('webp')
//           .toFile(outputFilePath);

//         // Remove the original image file
//         fs.unlinkSync(req.file.path)
//       }

//       // Update the filename in updatedPhoto to the new filename of the WebP image
//       const updatedPhoto = {
//         filename: path.basename(outputFilePath),
//         size: req.file.size,
//         // name:req.body.name
//       };


//       const me = await user.findById(userId);
//       if (!me) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       me.photo = updatedPhoto;

//       const resultUserOne = await massageModel.updateMany(
//         { userOneId: userId },
//         { $set: { userOneImage: updatedPhoto.filename } }
//       );
//       const resultUserTwo = await massageModel.updateMany(
//         { userTwoId: userId },
//         { $set: { userTwoImage: updatedPhoto.filename } }
//       );
//       const result = await me.save();
//       if (result) {
//         return res.status(201).json({ message: "Successfully Changed" });
//       }
//     }
//     else {
//       res.status(415).json({ message: "Please provide correct image types" });
//     }
//   } catch (error) {
//     console.error('Error updating profile picture:', error);
//     res.status(500).json({ message: 'Error updating profile picture' });
//   }
// });

const information = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { name, phoneNo, city, country, telegram, facebook, whatsApp, dob, gender } = req.body;
  const updateUser = await user.findByIdAndUpdate(userId, {
    name: name,
    phoneNo: phoneNo,
    telegramUserName: telegram,
    whatsAppUserName: whatsApp,
    facebookUserName: facebook,
    country: country,
    city: city,
    dob: dob,
    gender: gender

  }, { new: true })

  const resultUserOne = await massageModel.updateMany(
    { userOneId: userId },
    { $set: { userOneName: name } }
  );
  const resultUserTwo = await massageModel.updateMany(
    { userTwoId: userId },
    { $set: { userTwoName: name } }
  );

  if (updateUser) {
    return res.status(201).json({ message: "Successfully Updated" });
  }
  else {
    return res.status(404).json({ message: 'User not found' });
  }
}
)

const emailChange = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { email, password } = req.body;
  const emailUpdate = await user.findById(userId);

  if (!emailUpdate) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Verify the provided password against the stored hashed password
  const passwordMatch = await bcrypt.compare(password, emailUpdate.password);

  if (!passwordMatch) {
    return res.status(200).json({ message: 'Incorrect password' });
  }

  // Password is correct, update the email
  emailUpdate.email = email;

  // Save the updated user
  const updateUser = await emailUpdate.save();
  if (updateUser) {
    return res.status(201).json({ message: 'Email updated successfully' });
  } else {
    return res.status(500).json({ message: 'Failed to update email' });
  }
}
)
const passwordChange = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { newPassword, confirmPassword, password } = req.body;
  const passUpdate = await user.findById(userId);


  if (!passUpdate) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(200).json({ message: 'New Password mismatch.' });
  }
  if (passUpdate.password === null && password === null) {

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(newPassword, salt)
    // Password is correct, update the email
    passUpdate.password = hashPassword;

    // Save the updated user
    const updateUser = await passUpdate.save();
    if (updateUser) {
      console.log(1)
      return res.status(200).json({ message: 'Password updated successfully.' });
    } else {
      console.log(2)
      return res.status(400).json({ message: 'Failed to update Password.' });
    }

  } else {
    console.log(1)
    const passwordMatch = await bcrypt.compare(password, passUpdate.password);

    if (!passwordMatch) {
      return res.status(200).json({ message: 'Incorrect old password' });
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(newPassword, salt)
    // Password is correct, update the email
    passUpdate.password = hashPassword;

    // Save the updated user
    const updateUser = await passUpdate.save();
    if (updateUser) {
      return res.status(200).json({ message: 'Password changed successfully.' });
    } else {
      return res.status(400).json({ message: 'Failed to update Password.' });
    }
  }
  // Verify the provided password against the stored hashed password


}
)

//get user 
//method get
//path /user/
//access public
const DeleteAllUsers = asyncHandler(async (req, res) => {
  const query = { email: { $regex: "a" } };
  const users = await user.deleteMany(query)
  res.status(200).json({ users })
})

const deleteAccount = asyncHandler(async (req, res) => {
  const id = req.user._id;
  console.log(id)

  try {
    // Attempt to delete the user
    const deletedUser = await user.findByIdAndDelete(id);

    if (!deletedUser) {
      // If the user was not found, send a 404 response
      return res.status(404).json({ message: 'User not found.' });
    }

    // Attempt to delete products associated with the user
    await product.deleteMany({ postedBy: id });

    // Update massageModel for userOne
    await massageModel.updateMany(
      { userOneId: id },
      { $set: { userOneName: "Deleted Account", userOneId: "660b0901b8200f80ac34db94", userOneImage: "trash.webp" } }
    );

    // Update massageModel for userTwo
    await massageModel.updateMany(
      { userTwoId: id },
      { $set: { userTwoName: "Deleted Account", userTwoId: "660b0901b8200f80ac34db94", userTwoImage: "trash.webp" } }
    );

    // Clear the userToken cookie and send a success message
    res.clearCookie("userToken").status(200).json({ message: 'Successfully deleted account.' });
  } catch (error) {
    // If an error occurs during the deletion process, log the error and send a 500 response
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Something went wrong, please try again.' });
  }
});

//register user 
//method post
//path /user/register
//access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const uniqueID = req.body.uniqueID || "";
  const password = req.body.password || "";

  if (password !== "") {
    console.log(email)
    const userExists = await user.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User exists. Please login.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await user.create({
      name: name,
      email,
      password: hashPassword,
      uniqueID: null,
    });

    if (newUser) {

      sendEmail(email, "Account Created Successfully.", "", "welcome")
      res.cookie("userToken", generateToken(newUser.id), {
        // httpOnly: true,
      });

      return res.status(201).json({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser.id),
      });
    } else {
      return res.status(404).json({ message: "Invalid data" });
    }
  } else if (uniqueID !== "") {
    const userExists = await user.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User exists. Please login.' });
    }

    const newUser = await user.create({
      name,
      email,
      uniqueID,
      password: null,
    });

    if (newUser) {

      sendEmail(email, "Account Created Successfully.", "", "welcome")
      res.cookie("userToken", generateToken(newUser.id), {
        // httpOnly: true,
      });

      return res.status(201).json({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser.id),
      });
    } else {
      return res.status(404).json({ message: "Invalid data" });
    }
  } else {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }
});


//login user 
//method post
//path /user/login
//access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password, uniqueID } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  if (password) {
    const users = await user.findOne({ email });

    if (users && (await bcrypt.compare(password, users.password))) {
      res.cookie("userToken", generateToken(users.id), {
        // httpOnly: true,
      });

      return res.status(200).json({
        _id: users.id,
        name: users.name,
        email: users.email,
        token: generateToken(users.id),
      });
    } else {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
  } else if (uniqueID) {

    const users = await user.findOne({ email });

    if (users && users.uniqueID === uniqueID) {
      res.cookie("userToken", generateToken(users.id), {
        // httpOnly: true,
      });



      return res.status(200).json({
        _id: users.id,
        name: users.name,
        email: users.email,
        token: generateToken(users.id),
      });
    } else {
      return res.status(400).json({ message: 'User does not exist. Please sign up.' });
    }
  }
});


const isLoggedIn = asyncHandler(async (req, res) => {
  res.json(req.user)
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

const getIp=asyncHandler(async(req, res)=>{
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('Visitor IP Address:', ipAddress);
  res.status(200).json(ipAddress );
})

module.exports = {
  getUser,
  registerUser,
  loginUser,
  DeleteAllUsers,
  isLoggedIn,
  updateProfilePic,
  information,
  emailChange,
  passwordChange,
  deleteAccount,
  getIp
  // getUserSearch
  // updateUser,
  // deleteUser

}