const { StatusCodes } = require("http-status-codes")
const ErrorHandler = require("../middleware/ErrorHandler")
const WalletSchema = require('../model/WalletSchema')
const fs = require('fs')
const path = require('path')
const Razorpay = require('razorpay')
const userSchema = require("../model/userSchema")

exports.CraetePayment = async (req, res, next) => {
    const { amount, userId } = req.body
    console.log(req.body);

    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZOERPAY_KEYID,
            key_secret: process.env.RAZOERPAY_KEY_SECRET
        })

        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt#${new Date().getTime()}`,
            notes: {
                TestPayment: "Test paymnetGetway"
            }
        })

        if (order) {
            await WalletSchema.create({
                orderID: order.id,
                amount: amount,
                status: 'Pending',
                userId: userId
            })
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Order create successfully",
            data: {
                ...order,
                key_id: process.env.RAZOERPAY_KEYID
            }
        })
    } catch (error) {
        console.log(error);

        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}


// exports.VerifyPayment = async (req, res, next) => {
//     try {
//         const { orderId, paymentId } = req.body

//         const razorpay = new Razorpay({
//             key_id: process.env.RAZOERPAY_KEYID,
//             key_secret: process.env.RAZOERPAY_KEY_SECRET
//         })

//         const response = await razorpay.orders.fetch(orderId)

//         if (response.status === 'paid') {
//             await WalletSchema.findOneAndUpdate({ orderID: orderId }, { $set: { status: 'Success' } })
//         }
//         else if (response.status === 'fail') {
//             await WalletSchema.findOneAndUpdate({ orderID: orderId }, { $set: { status: 'Failed' } })
//         }

//         console.log(response);

//         return res.status(StatusCodes.OK).json({
//             success: true,
//             code: StatusCodes.OK,
//             message: "Order fetch successfully",
//             data: response
//         })


//     } catch (error) {
//         return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
//     }
// }
exports.VerifyPayment = async (req, res, next) => {
    try {
        const { orderId, paymentId } = req.body

        const razorpay = new Razorpay({
            key_id: process.env.RAZOERPAY_KEYID,
            key_secret: process.env.RAZOERPAY_KEY_SECRET
        })

        const response = await razorpay.orders.fetch(orderId)

        if (response.status === 'paid') {
            // Set wallet status to Success
            const walletEntry = await WalletSchema.findOneAndUpdate(
                { orderID: orderId },
                { $set: { status: 'Success', paymentId: paymentId } },
                { new: true }
            )
            if (walletEntry) {
                // Find user and update wallet balance
                const user = await userSchema.findById(walletEntry.userId)
                if (user) {
                    user.wallet = Number(user.wallet || 0) + Number(walletEntry.amount)
                    await user.save()
                }
            }
        } else if (response.status === 'fail') {
            await WalletSchema.findOneAndUpdate({ orderID: orderId }, { $set: { status: 'Failed' } })
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            code: StatusCodes.OK,
            message: "Order fetch successfully",
            data: response
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}
