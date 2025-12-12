// - CoofeeLovers
//  - Title
//  - description
//  - categoryId <-- ref
// /api/featured-products
// /api/special-products
// /api/curated-products
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coffeething = new Schema({
    Coffee_title: {
        type: String,
        require: true
    },
    Coffee_description: {
        type: String,
        require: true
    },
    catagory_id: {
        type: Schema.Types.ObjectId,
        ref: 'CatagorySchema',
        require: true
    }
}, { timestamps: true })
module.exports = mongoose.model('coffeething', coffeething)