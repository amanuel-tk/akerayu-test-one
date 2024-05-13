const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true
    },
    password: {
        type: String,
        // required:[true,"Please Enter Your Password"]
    },
    photo: {
        filename: {
            type: String,
            default: "person.png"
            //   required: true
        },
        size: {
            type: Number,
            default: 122178
            //   required: true
        },
    },
    addBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
},{ timestamps: true });
module.exports = mongoose.model("admin", adminSchema)