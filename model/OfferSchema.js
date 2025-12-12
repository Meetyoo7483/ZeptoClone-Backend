// - offers
//   - offercardImage

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const OfferSchema = new Schema({
    offercardImage: {
        type: String,
        require: true
    }
}, { timestamps: true })
module.exports = mongoose.model('OfferSchema', OfferSchema)