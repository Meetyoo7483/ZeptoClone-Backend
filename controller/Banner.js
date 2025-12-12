const { StatusCodes } = require('http-status-codes')
const ErrorHandler = require('../middleware/ErrorHandler')
const fs = require('fs')
const path = require('path')
const BannerSchema = require('../model/BannerSchema')
const CatagorySchema = require('../model/CatagorySchema')

exports.BannerAdd = async (req, res, next) => {
    try {
        const { catagory_id } = req.body
        const BannerImage = req.file

        if (!catagory_id) {
            return next(new ErrorHandler("catagory_id must be required", StatusCodes.BAD_REQUEST))
        }

        const Banner_F = await CatagorySchema.findById(catagory_id)

        if (!Banner_F) {
            return next(new ErrorHandler("catagory can not find", StatusCodes.NOT_FOUND))
        }

        const Bannerdata_Add = await BannerSchema.create({ BannerImage: BannerImage.filename, catagory_id })

        return res.status(StatusCodes.CREATED).json({
            success: true,
            code: StatusCodes.CREATED,
            message: "Banner successfully added",
            data: Bannerdata_Add
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }

}

exports.BannerDelete = async (req, res, next) => {
    try {
        const { Banner_id } = req.params

        if (!Banner_id) {
            return next(new ErrorHandler("Banner_id must be required", StatusCodes.BAD_REQUEST))
        }

        const Banner_deleted = await BannerSchema.findByIdAndDelete(Banner_id)

        if (!Banner_deleted) {
            return next(new ErrorHandler("Banner can not find", StatusCodes.NOT_FOUND))
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Banner Deleted successfully",
            data: Banner_deleted
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

exports.BannerUpdate = async (req, res, next) => {
    try {
        const { Banner_id } = req.body
        const BannerImage = req.file

        if (!Banner_id) {
            return next(new ErrorHandler("Banner_id must be required", StatusCodes.BAD_REQUEST))
        }

        const BannerFind = await BannerSchema.findById(Banner_id)

        if (!BannerFind) {
            return next(new ErrorHandler("Banner can not find", StatusCodes.NOT_FOUND))
        }

        if (req.file) {
            if (BannerFind.BannerImage) {
                fs.unlinkSync(path.join(__dirname, '..', 'assets', BannerFind.BannerImage))
            }
            BannerFind.BannerImage = BannerImage.filename
        }

        const UpdatedBanner = await BannerFind.save()
        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Banner updateed successfully",
            data: UpdatedBanner
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

exports.BannerFind = async (req, res, next) => {
    try {

        const Banner_find = await BannerSchema.find().populate('catagory_id', 'category_Name')

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Banner found successfully",
            data: Banner_find
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

exports.UserBannerFind = async (req, res, next) => {
    try {

        const Banner_find = await BannerSchema.find().populate('catagory_id', 'category_Name')

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Banner found successfully",
            data: Banner_find
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}