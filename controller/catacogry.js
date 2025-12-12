const { StatusCodes } = require("http-status-codes")
const ErrorHandler = require('../middleware/ErrorHandler')
const fs = require('fs')
const path = require('path')
const CatagorySchema = require("../model/CatagorySchema")
const ProductSchema = require("../model/ProductSchema")

exports.CatagoryAdd = async (req, res, next) => {
    try {
        const { category_Name } = req.body
        const category_Image = req.file

        const catagory = await CatagorySchema.create({ category_Image: category_Image.filename, category_Name })

        return res.status(StatusCodes.CREATED).json({
            success: true,
            code: StatusCodes.CREATED,
            message: "Catagory successfully added",
            data: catagory
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

exports.Catagorydelete = async (req, res, next) => {
    try {

        const { catagory_id } = req.params

        if (!catagory_id) {
            return next(new ErrorHandler("catagory id must be requried", StatusCodes.BAD_REQUEST))
        }

        const Catagory = await CatagorySchema.findById(catagory_id)
        if (!Catagory) {
            return next(new ErrorHandler("Category not found", StatusCodes.NOT_FOUND))
        }

        if (Catagory.category_Image) {
            fs.unlinkSync(path.join(__dirname, '..', 'assets', Catagory.category_Image))
        }


        await CatagorySchema.findByIdAndDelete(catagory_id)

        await ProductSchema.deleteMany({ catagory_id })

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Catagory successfully deleted"
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

exports.CatagoryUpdate = async (req, res, next) => {
    try {

        const { category_Name, catagory_id } = req.body
        const category_Image = req.file

        if (!catagory_id) {
            return next(new ErrorHandler("catagory id must be needed", StatusCodes.BAD_REQUEST))
        }

        const update_catagory = await CatagorySchema.findById(catagory_id)

        if (!update_catagory) {
            return next(new ErrorHandler("Catagory id not found", StatusCodes.NOT_FOUND))
        }

        if (req.file) {
            if (update_catagory.category_Image) {
                fs.unlinkSync(path.join(__dirname, '..', 'assets', update_catagory.category_Image))
            }
            update_catagory.category_Image = category_Image.filename
        }

        update_catagory.category_Name = category_Name

        const updatedcatagory = await update_catagory.save()

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "catagory updateed successfully",
            data: updatedcatagory
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

exports.Catagoryfind = async (req, res, next) => {

    try {
        const catacogry_find = await CatagorySchema.find()

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Catagory successfully found",
            data: catacogry_find
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

exports.UserCatagoryfind = async (req, res, next) => {
    try {
        const catacogry_find = await CatagorySchema.find()

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Catagory successfully found",
            data: catacogry_find
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
} 
