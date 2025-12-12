const { StatusCodes } = require('http-status-codes')
const ErrorHandler = require('../middleware/ErrorHandler')
const fs = require('fs')
const path = require('path')
const OfferSchema = require('../model/OfferSchema')

exports.OfferCardAdd = async (req, res, next) => {
    try {
        
        if(!req.file){
            return next(new ErrorHandler("File is reqired",StatusCodes.BAD_REQUEST))
        }

        const OfferCardImage_Add = await OfferSchema.create({ offercardImage: req.file.filename })

        return res.status(StatusCodes.CREATED).json({
            success: true,
            code: StatusCodes.CREATED,
            message: "offer card image successfully added",
            data: OfferCardImage_Add
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }

}

exports.OfferCardDelete = async (req, res, next) => {
    try {
        const { OfferCard_id } = req.params

        if (!OfferCard_id) {
            return next(new ErrorHandler("OfferCard_id must be required", StatusCodes.BAD_REQUEST))
        }

        const OfferCard_deleted = await OfferSchema.findByIdAndDelete(OfferCard_id)

        if (!OfferCard_deleted) {
            return next(new ErrorHandler("Offercard can not find", StatusCodes.NOT_FOUND))
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Offer Deleted successfully",
            data: OfferCard_deleted
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

exports.OffercardUpdate = async (req, res, next) => {
    try {
        const { OfferCard_id } = req.body

        if (!OfferCard_id) {
            return next(new ErrorHandler("OfferCard_id must be required", StatusCodes.BAD_REQUEST))
        }

        const OffercardFind = await OfferSchema.findById(OfferCard_id)

        if (!OffercardFind) {
            return next(new ErrorHandler("offer card can not find", StatusCodes.NOT_FOUND))
        }

        if (req.file) {
            if (OffercardFind.offercardImage) {
                fs.unlinkSync(path.join(__dirname, '..', 'assets', OffercardFind.offercardImage))
            }
            OffercardFind.offercardImage = req.file.filename
        }

        const UpdatedOfferCard = await OffercardFind.save()
        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Offercard updateed successfully",
            data: UpdatedOfferCard
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

exports.OfferCardFind = async (req, res, next) => {
    try {

        const Offercard_find = await OfferSchema.find()

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "OfferCard found successfully",
            data: Offercard_find
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}
exports.UserOfferCardFind = async (req, res, next) => {
    try {

        const Offercard_find = await OfferSchema.find()

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "OfferCard found successfully",
            data: Offercard_find
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}