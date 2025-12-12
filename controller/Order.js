const { StatusCodes } = require('http-status-codes')
const ErrorHandler = require('../middleware/ErrorHandler')
const fs = require('fs')
const path = require('path')
const userSchema = require('../model/userSchema')
const OrderSchema = require('../model/OrderSchema')
const { log } = require('console')

exports.AddOrderCollect = async (req, res, next) => {
    try {
        const { cust_name, cust_email, cust_address, pincode, totalAmount, items, userId } = req.body

        if (!userId || !cust_name || !cust_email || !cust_address || !pincode || !totalAmount || !items) {
            return next(new ErrorHandler("All field is requried", StatusCodes.BAD_REQUEST))
        }

        const user = await userSchema.findById(userId)
        if (!user) {
            return next(new ErrorHandler("Account not found", StatusCodes.NOT_FOUND))
        }

        if (user.wallet >= totalAmount) {
            return next(new ErrorHandler("Insufficient Amount in wallet", StatusCodes.NOT_ACCEPTABLE))
        }

        const order = await OrderSchema.create({ cust_name, cust_email, cust_address, pincode, totalAmount, items, userId })
        console.log(order);
        
        return res.status(StatusCodes.CREATED).json({
            success: true,
            code: StatusCodes.CREATED,
            message: "Order place successfully",
            data: order
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}