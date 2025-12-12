const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WalletSchema = new Schema({
    orderID: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        enum: ["Pending", "Success", "Failed"],
        require: true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'userSchema'
    }
}, { timestamps: true })

module.exports = mongoose.model('WalletSchema', WalletSchema)
