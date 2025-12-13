const { StatusCodes } = require('http-status-codes')
const ErrorHandler = require('../middleware/ErrorHandler')
const fs = require('fs')
const path = require('path')
const UserSchema = require('../model/userSchema')
const OtpSchema = require('../model/OtpSchema')
const SendEmail = require('../util/EmailService')

exports.UserAdd = async (req, res, next) => {
  try {
    const { user_name, user_email, address, wallet, free_cash } = req.body
    const profile_picture = req.file

    const UserData_add = await UserSchema.create({ user_name, user_email, address: JSON.parse(address), wallet, free_cash, profile_picture: profile_picture.filename })

    return res.status(StatusCodes.OK).json({
      success: true,
      code: StatusCodes.OK,
      message: "UserData_add Added successfully",
      data: UserData_add
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
  }
}

exports.UserDelete = async (req, res, next) => {
  try {

    const { User_id } = req.params

    if (!User_id) {
      return next(new ErrorHandler("User_id must be required", StatusCodes.BAD_REQUEST))
    }

    const User_deleted = await UserSchema.findByIdAndDelete(User_id)

    if (!User_deleted) {
      return next(new ErrorHandler("User can not find", StatusCodes.NOT_FOUND))
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      code: StatusCodes.OK,
      message: "User Deleted successfully",
      data: User_deleted
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
  }
}

exports.UserUpdate = async (req, res, next) => {
  try {

    const { user_name, address, User_id } = req.body

    if (!User_id) {
      return next(new ErrorHandler("User_id must be required", StatusCodes.BAD_REQUEST))
    }

    const Userfind = await UserSchema.findById(User_id)

    if (!Userfind) {
      return next(new ErrorHandler("Userfind can not find", StatusCodes.NOT_FOUND))
    }

    Userfind.user_name = user_name || Userfind.user_name
    Userfind.address = address || Userfind.address

    await Userfind.save()


    return res.status(StatusCodes.OK).json({
      success: true,
      code: StatusCodes.OK,
      message: "User updateed successfully"
    })

  } catch (error) {
    return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
  }
}

exports.UserFind = async (req, res, next) => {
  try {
    const User_find = await UserSchema.find()

    return res.status(StatusCodes.OK).json({
      success: true,
      code: StatusCodes.OK,
      message: "User found successfully",
      data: User_find
    })

  } catch (error) {
    return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
  }
}

exports.GetUserDetails = async (req, res, next) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return next(new ErrorHandler("userId is requried", StatusCodes.BAD_REQUEST))
    }

    const user = await UserSchema.findById(userId)
    if (!user) {
      return next(new ErrorHandler("User not found", StatusCodes.NOT_FOUND))
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      code: StatusCodes.OK,
      message: "User fetch successfully",
      data: user
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
  }
}

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

exports.SendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new ErrorHandler('Email is requried', StatusCodes.BAD_REQUEST))
    }

    const otp = await OtpSchema.create({ otp: generateOTP(), email, expiredAt: new Date(Date.now() + 2 * 60 * 1000) })

    await SendEmail({
      to: otp.email,
      subject: "Verify Otp",
      html: `
            <!DOCTYPE html>
<html lang="en" style="margin:0; padding:0;">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification</title>
</head>
<body style="margin:0; padding:0; background:#f4f4f7; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.1); overflow:hidden;">
          <!-- Header -->
          <tr>
            <td align="center" style="background:#4f46e5; padding:20px;">
              <h1 style="margin:0; color:#ffffff; font-size:22px;">🔐 OTP Verification</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333333;">
              <p style="font-size:16px; margin:0 0 20px;">Hi</p>
              <p style="font-size:16px; margin:0 0 20px;">
                Please use the following One-Time Password (OTP) to complete your verification:
              </p>
              
              <!-- OTP Box -->
              <div style="text-align:center; margin:30px 0;">
                <span style="display:inline-block; background:#4f46e5; color:#ffffff; padding:15px 40px; font-size:24px; font-weight:bold; border-radius:8px; letter-spacing:4px;">
                  ${otp.otp}
                </span>
              </div>

              <p style="font-size:14px; margin:0 0 10px; color:#666;">
                This OTP will expire in <strong>2 minutes</strong>. If you did not request this, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background:#f9fafb; padding:20px; font-size:12px; color:#777;">
              © ${new Date().getFullYear()} Your Company. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

            `
    })

    return res.status(StatusCodes.OK).json({
      success: true,
      code: StatusCodes.OK,
      message: "Otp Send successfully"
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
  }
}

exports.VerifyedOtp = async (req, res, next) => {
  try {
    const { otp, email } = req.body

    if (!email || !otp) {
      return next(new ErrorHandler('Otp and Email is requried', StatusCodes.BAD_REQUEST))
    }

    const existOtp = await OtpSchema.findOne({ email, otp, isVerified: false, expiredAt: { $gt: Date.now() } })
    if (!existOtp) {
      return next(new ErrorHandler('Invalid Otp', StatusCodes.UNAUTHORIZED))
    }

    existOtp.isVerified = true
    await existOtp.save()

    let alredyExitsUser = await UserSchema.findOne({ user_email: email })
    if (!alredyExitsUser) {
      alredyExitsUser = await UserSchema.create({
        user_email: email, free_cash: 50, user_name: "", wallet: 0, address: {
          street: "",
          area: "",
          city: "",
          state: "",
          pincode: 0,
        }
      })
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      code: StatusCodes.OK,
      message: "Otp Verified successfully",
      data: alredyExitsUser._id
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
  }
}

exports.ResendSendOtp = async (req, res, next) => {
  try {
    const { email } = req.body

    if (!email) {
      return next(new ErrorHandler('Email is requried', StatusCodes.BAD_REQUEST))
    }

    await OtpSchema.deleteMany({ email })

    const otp = await OtpSchema.create({ otp: generateOTP(), email, expiredAt: new Date(Date.now() + 2 * 60 * 1000) })

    await SendEmail({
      to: otp.email,
      subject: "Verify Otp",
      html: `
            <!DOCTYPE html>
<html lang="en" style="margin:0; padding:0;">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification</title>
</head>
<body style="margin:0; padding:0; background:#f4f4f7; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.1); overflow:hidden;">
          <!-- Header -->
          <tr>
            <td align="center" style="background:#4f46e5; padding:20px;">
              <h1 style="margin:0; color:#ffffff; font-size:22px;">🔐 OTP Verification</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333333;">
              <p style="font-size:16px; margin:0 0 20px;">Hi</p>
              <p style="font-size:16px; margin:0 0 20px;">
                Please use the following One-Time Password (OTP) to complete your verification:
              </p>
              
              <!-- OTP Box -->
              <div style="text-align:center; margin:30px 0;">
                <span style="display:inline-block; background:#4f46e5; color:#ffffff; padding:15px 40px; font-size:24px; font-weight:bold; border-radius:8px; letter-spacing:4px;">
                  ${otp.otp}
                </span>
              </div>

              <p style="font-size:14px; margin:0 0 10px; color:#666;">
                This OTP will expire in <strong>2 minutes</strong>. If you did not request this, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background:#f9fafb; padding:20px; font-size:12px; color:#777;">
              © ${new Date().getFullYear()} Your Company. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

            `
    })
    return res.status(StatusCodes.OK).json({
      success: true,
      code: StatusCodes.OK,
      message: "Otp Send successfully"
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
  }
}

