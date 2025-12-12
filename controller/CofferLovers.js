const { StatusCodes } = require("http-status-codes")
const ErrorHandler = require('../middleware/ErrorHandler')
const fs = require('fs')
const path = require('path')
const CatagorySchema = require("../model/CatagorySchema")
const CoffeeLoversSchema = require('../model/CofferLoversSchema')

exports.CoffeeLoverAdd = async (req, res, next) => {
    try {

        const { Coffee_title, Coffee_description, catagory_id } = req.body

        if (!catagory_id) {
            return next(new ErrorHandler("catagory id must be requried", StatusCodes.BAD_REQUEST))
        }

        const catagory_F = await CatagorySchema.findById(catagory_id)

        if (!catagory_F) {
            return next(new ErrorHandler("catagory can not find", StatusCodes.NOT_FOUND))
        }

        const Coffee_Add = await CoffeeLoversSchema.create({ Coffee_title, Coffee_description, catagory_id })

        return res.status(StatusCodes.CREATED).json({
            success: true,
            code: StatusCodes.CREATED,
            message: "Coffee successfully added",
            data: Coffee_Add
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

exports.CoffeeLoverDelete = async (req, res, next) => {
    try {

        const { CoffeeLover_id } = req.params

        if (!CoffeeLover_id) {
            return next(new ErrorHandler("CoffeeLover_id must be required", StatusCodes.BAD_REQUEST))
        }

        const CoffeeLover_deleted = await CoffeeLoversSchema.findByIdAndDelete(CoffeeLover_id)

        if (!CoffeeLover_deleted) {
            return next(new ErrorHandler("CoffeeLover can not find", StatusCodes.NOT_FOUND))
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "CoffeeLover Deleted successfully",
            data: CoffeeLover_deleted
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

exports.CoffeeLoverUpdate = async (req, res, next) => {
    try {
        const { Coffee_title, Coffee_description, catagory_id, CoffeeLover_id } = req.body

        if (!CoffeeLover_id) {
            return next(new ErrorHandler("CoffeeLover_id must be required", StatusCodes.BAD_REQUEST))
        }

        const CoffeeLoverfind = await CoffeeLoversSchema.findById(CoffeeLover_id)

        if (!CoffeeLoverfind) {
            return next(new ErrorHandler("CoffeeLoverfind can not find", StatusCodes.NOT_FOUND))
        }

        CoffeeLoverfind.Coffee_title = Coffee_title
        CoffeeLoverfind.Coffee_description = Coffee_description
        CoffeeLoverfind.catagory_id = catagory_id

        const Updated_CoffeeLover = await CoffeeLoverfind.save()
        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "CoffeeLover updateed successfully",
            data: Updated_CoffeeLover
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

exports.CoffeeLoverFind = async (req, res, next) => {
    try {

        const CoffeeLover_Find = await CoffeeLoversSchema.find().populate('catagory_id', 'category_Name')

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "CoffeeLover found successfully",
            data: CoffeeLover_Find
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

exports.UserCoffeeLoverFind = async (req, res, next) => {
    try {

        const CoffeeLover_Find = await CoffeeLoversSchema.find().populate('catagory_id', 'category_Name')

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "CoffeeLover found successfully",
            data: CoffeeLover_Find
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

exports.UserCoffeeLoverFindFoodcarosal = async (req, res, next) => {
    try {

        const CoffeeLover_Find = await CoffeeLoversSchema.find()

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "CoffeeLover Carosal found ",
            data: CoffeeLover_Find
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

