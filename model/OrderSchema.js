const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    cust_name: {
        type: String,
        require: true
    },
    cust_email: {
        type: String,
        require: true
    },
    cust_address: {
        type: {
            street: String,
            area: String,
            city: String,
            state: String,
        },
        require: true
    },
    pincode: {
        type: Number,
        require: true
    },
    order_status: {
        type: String,
        enum: ["Pending", "Accept", "Canceled", "Deliverd"],
        require: true,
        default: 'Pending'
    },
    rider_name: {
        type: String,
        require: false
    },
    totalAmount: {
        type: String,
        require: true
    },
    items: [{
        name: String,
        qty: Number,
        price: Number
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserSchema'
    }
}, { timestamps: true })
module.exports = mongoose.model('OrderSchema', OrderSchema)