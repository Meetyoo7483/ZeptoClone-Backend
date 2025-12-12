// - Banner
//   - BannerImage
//   - categoryId <-- ref

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BannerSchema = new Schema({
    BannerImage: {
        type: String,
        required: true
    },
    catagory_id: {
        type: Schema.Types.ObjectId,
        ref: 'CatagorySchema',
        require: true
    }
}, { timestamps: true })
module.exports = mongoose.model('BannerSchema',BannerSchema)