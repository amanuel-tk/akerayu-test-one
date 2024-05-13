const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
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
    uniqueID: {
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
    phoneNo: {
        type: String,
        default: ""
    },
    telegramUserName: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    facebookUserName: {
        type: String,
        default: null
    },
    whatsAppUserName: {
        type: String,
        default: null
    },
    dob: {
        type: String,

    },
    gender: {
        type: String,
        default: null
    },
    notification: {
        type: Number,
        default: 0
    }
},
    { timestamps: true });

module.exports = mongoose.model("user", userSchema)