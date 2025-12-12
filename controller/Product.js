const { StatusCodes } = require('http-status-codes')
const ErrorHandler = require('../middleware/ErrorHandler')
const fs = require('fs')
const path = require('path')
const ProductSchema = require('../model/ProductSchema')
const CatagorySchema = require("../model/CatagorySchema")

exports.ProductAdd = async (req, res, next) => {
    try {
        const { product_Name, product_description, product_Brand, product_price, product_discount_price, product_weight, catagory_id } = req.body
        const product_Image = req.file

        if (!catagory_id) {
            return next(new ErrorHandler("catagory_id must be required", StatusCodes.BAD_REQUEST))
        }

        const catagory_F = await CatagorySchema.findById(catagory_id)

        if (!catagory_F) {
            return next(new ErrorHandler("catagory can not find", StatusCodes.NOT_FOUND))
        }

        const ProductData_add = await ProductSchema.create({ product_Name, product_description, product_Brand, product_price, product_discount_price, product_weight, product_Image: product_Image.filename, catagory_id })

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Product Added successfully",
            data: ProductData_add
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

exports.ProductDelete = async (req, res, next) => {
    try {

        const { product_id } = req.params

        if (!product_id) {
            return next(new ErrorHandler("product_id must be required", StatusCodes.BAD_REQUEST))
        }

        const product = await ProductSchema.findById(product_id)

        if (!product) {
            return next(new ErrorHandler("product can not find", StatusCodes.NOT_FOUND))
        }

        if (product.product_Image) {
            fs.unlinkSync(path.join(__dirname, '..', 'assets', product.product_Image))
        }

        await ProductSchema.findByIdAndDelete(product_id)

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Product Deleted successfully",
            data: ProductSchema
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

exports.ProductUpdate = async (req, res, next) => {
    try {
        const { product_Name, product_description, product_Brand, product_price, product_discount_price, product_weight, product_id } = req.body
        const product_Image = req.file

        if (!product_id) {
            return next(new ErrorHandler("product_id must be required", StatusCodes.BAD_REQUEST))
        }

        const productfind = await ProductSchema.findById(product_id)

        if (!productfind) {
            return next(new ErrorHandler("productfind can not find", StatusCodes.NOT_FOUND))
        }

        if (req.file) {
            if (productfind.product_Image) {
                fs.unlinkSync(path.join(__dirname, '..', 'assets', productfind.product_Image))
            }
            productfind.product_Image = product_Image.filename
        }

        productfind.product_Name = product_Name
        productfind.product_description = product_description
        productfind.product_Brand = product_Brand
        productfind.product_price = product_price
        productfind.product_discount_price = product_discount_price
        productfind.product_weight = product_weight

        const updated_produt = await productfind.save()
        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Product updateed successfully",
            data: updated_produt
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

exports.ProductFind = async (req, res, next) => {
    try {

        const Product_find = await ProductSchema.find().populate('catagory_id', 'category_Name')

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Product found successfully",
            data: Product_find
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

exports.UserProductFind = async (req, res, next) => {
    try {

        const { catagory_id } = req.query

        let filterData = {}

        if (catagory_id && catagory_id != "") {
            filterData.catagory_id = catagory_id
        }

        const Product_find = await ProductSchema.find(filterData).populate('catagory_id', 'category_Name').limit(10)

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Product found successfully",
            data: Product_find
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

exports.UserProductFindCoffee = async (req, res, next) => {
    try {

        const { catagory_id } = req.query

        let filterData = {}

        if (catagory_id && catagory_id != "") {
            filterData.catagory_id = catagory_id
        }

        const Product_find = await ProductSchema.find(filterData).populate('catagory_id', 'category_Name').limit(10)

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Product found successfully",
            data: Product_find
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

exports.UserProductFindSabji = async (req, res, next) => {
    try {

        const { catagory_id } = req.query

        let filterData = {}

        if (catagory_id && catagory_id != "") {
            filterData.catagory_id = catagory_id
        }

        const Product_find = await ProductSchema.find(filterData).populate('catagory_id', 'category_Name').limit(10)

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Product found successfully",
            data: Product_find
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}


// Fashion
exports.UserProductFashion = async (req, res, next) => {
    try {

        const Product_find = await ProductSchema.find({ catagory_id: '68afe7a28f87c75b3b5310d7' }).populate('catagory_id', 'category_Name').limit(10)

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Product found successfully",
            data: Product_find
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

//Mobile
exports.UserProductMobile = async (req, res, next) => {
    try {

        const Product_find = await ProductSchema.find({ catagory_id: '68afe6c08f87c75b3b5310cd' }).populate('catagory_id', 'category_Name').limit(10)

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Product found successfully",
            data: Product_find
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

//Beauty
exports.UserProductBeauty = async (req, res, next) => {
    try {

        const Product_find = await ProductSchema.find({ catagory_id: '68afe7068f87c75b3b5310d2' }).populate('catagory_id', 'category_Name').limit(10)

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Product found successfully",
            data: Product_find
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

//Frash
exports.UserProductFrash = async (req, res, next) => {
    try {

        const Product_find = await ProductSchema.find({ catagory_id: '68afe62a8f87c75b3b5310c1' }).populate('catagory_id', 'category_Name').limit(10)

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Product found successfully",
            data: Product_find
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

// Cafe
exports.UserProductCafe = async (req, res, next) => {
    try {

        const Product_find = await ProductSchema.find({ catagory_id: '68afe5778f87c75b3b5310b0' }).populate('catagory_id', 'category_Name').limit(10)

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Product found successfully",
            data: Product_find
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

// Toys
exports.UserProductToys = async (req, res, next) => {
    try {

        const Product_find = await ProductSchema.find({ catagory_id: '68afe6128f87c75b3b5310bc' }).populate('catagory_id', 'category_Name').limit(10)

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Product found successfully",
            data: Product_find
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

// Home
exports.UserProductHome = async (req, res, next) => {
    try {

        const Product_find = await ProductSchema.find({ catagory_id: '68afe5f98f87c75b3b5310b7' }).populate('catagory_id', 'category_Name').limit(10)

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Product found successfully",
            data: Product_find
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

// Electronics
exports.UserProductElectronics = async (req, res, next) => {
    try {

        const Product_find = await ProductSchema.find({ catagory_id: '68afe6818f87c75b3b5310c4' }).populate('catagory_id', 'category_Name').limit(10)

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Product found successfully",
            data: Product_find
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}


//ProductMaster
exports.ProductMaster = async (req, res, next) => {
    try {
        const { catagory_id } = req.params

        if (!catagory_id) {
            return next(new ErrorHandler("catagory_id is requried", StatusCodes.BAD_REQUEST))
        }

        const Product_find = await ProductSchema.find({ catagory_id })

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Product fetch successfully",
            data: Product_find
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}
