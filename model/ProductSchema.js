// -Product
//  - product_Name
//  - product_description 
//  - product_Image
//  - product_Brand
//  - product_price
//  - product_discount_price
//  - product_wieght
//  - categoryId <--- ref

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    product_Name: {
        type: String,
        require: true
    },
    product_description: {
        type: String,
        require: true
    },
    product_Image: {
        type: String,
        require: true
    },
    product_Brand:{
        type: String,
        require:true
    },
    product_price: {
        type: Number,
        require: true
    },
    product_discount_price: {
        type: Number,
        require: true
    },
    product_weight: {
        type: String,
        require: true
    },
    catagory_id: {
        type: Schema.Types.ObjectId,
        ref: 'CatagorySchema',
        require: true
    }
}, { timestamps: true })

module.exports = mongoose.model('ProductSchema',ProductSchema)