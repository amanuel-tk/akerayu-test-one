const admin = require('../../model/adminModeal')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



const adminRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(password)
  if (name !== "" && email !== "" && password!=="") {

    const userExists = await admin.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'User already exists.' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await admin.create({
      name: name,
      email,
      password: hashPassword,
      addBy:req.user._id
    });

    if (newUser) {
      return res.status(201).json({ message:"Account Created Successfully."});
    } else {
      return res.status(404).json({ message: "Invalid data" });
    }
  }

 else {
  return res.status(400).json({ message: 'Please fill in all fields' });
}});

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password, uniqueID } = req.body;
  console.log(email)

  if (!email) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  if (password) {
    const users = await admin.findOne({ email });

    if (users && (await bcrypt.compare(password, users.password))) {
      res.cookie("adminToken", generateToken(users.id), {
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

    const users = await admin.findOne({ email });

    if (users && users.uniqueID === uniqueID) {
      res.cookie("adminToken", generateToken(users.id), {
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

const adminIsLoggedIn = asyncHandler(async (req, res) => {
  res.json(req.user)
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = {
  adminRegister,
  adminLogin,
  adminIsLoggedIn,

}