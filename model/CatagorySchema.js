// -category Schmea
//   - category_Image
//   - category_Name

const mongoose = require('mongoose')

const Schmea = mongoose.Schema

const CatagorySchema = new Schmea({
    category_Image: {
        type: String,
        require: true
    },
    category_Name: {
        type: String,
        require: true
    }
}, { timestamps: true })

module.exports = mongoose.model('CatagorySchema', CatagorySchema)