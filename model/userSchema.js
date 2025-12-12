// - User Shcmea
//  - Email
//  - name
//  - address = [{street1,street2,area,city,pincode,state}]
//  - profile_picthure
//  - wallet
//  - free_cash

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    user_name: {
        type: String,
        require: false
    },
    user_email: {
        type: String,
        require: true
    },
    address: {
        type: {
            street: String,
            area: String,
            city: String,
            state: String,
            pincode: Number,
        },
        required: false
    },
    profile_picture: {
        type: String,
        require: false
    },
    wallet: {
        type: Number,
        require: false
    },
    free_cash: {
        type: Number,
        require: false
    }
})

module.exports = mongoose.model("UserSchema", UserSchema)

// { "street": "varrachha", "area": "surat", "city": "surat", "pincode": 395006 }

// { 
//  "street": "LH", 
//  "area": "hirabug", 
//  "city": "surat", 
//  "state": "gujrat", 
//  "pincode": 395006 
// }