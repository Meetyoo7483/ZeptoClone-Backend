const express = require('express')
const multerUpload = require('../middleware/multerfileupload')
const { UserAdd, UserDelete, UserUpdate, UserFind, SendOtp, FoodCarosarl, ResendSendOtp, VerifyedOtp, GetUserDetails } = require('../controller/User')
const { UserCatagoryfind } = require('../controller/catacogry')
const { UserBannerFind } = require('../controller/Banner')
const { UserCoffeeLoverFind, UserCoffeeLoverFindFoodcarosal } = require('../controller/CofferLovers')
const { UserOfferCardFind } = require('../controller/Offer')
const { UserProductFind, UserProductFindCoffee, UserProductFindSabji, UserProductFashion, UserProductMobile, UserProductBeauty, UserProductFrash, UserProductCafe, UserProductToys, UserProductHome, UserProductElectronics, ProductMaster } = require('../controller/Product')
const { CraetePayment, VerifyPayment } = require('../controller/Wallet')
const { AddOrderCollect } = require('../controller/Order')
const router = express.Router()

//user api
router.post('/user/add/userdetails', multerUpload().single('profile_picture'), UserAdd)
router.delete('/user/delete/userdetails/:User_id', UserDelete)
router.put('/user/update/userdetails', UserUpdate)
router.get('/user/fetch/userdetails', UserFind)
router.get('/user/fetch/details/:userId', GetUserDetails)

//OTP api
router.post('/user/send/sendotp', SendOtp)
router.post('/user/send/verifyotp', VerifyedOtp)
router.post('/user/send/resendotp', ResendSendOtp)



//Frontend side fetch API
router.get('/user/get/catagory', UserCatagoryfind)
router.get('/user/get/Banner', UserBannerFind)
router.get('/user/get/CoffeeLover', UserCoffeeLoverFind)
router.get('/user/get/OfferCard', UserOfferCardFind)
router.get('/user/get/Product', UserProductFind)
router.get('/user/get/Product/cofeee', UserProductFindCoffee)
router.get('/user/get/Product/sabjii', UserProductFindSabji)
//Fashion
router.get('/user/get/Product/Fashion', UserProductFashion)

//Mobile
router.get('/user/get/Product/Mobile', UserProductMobile)

//Beauty
router.get('/user/get/Product/Beauty', UserProductBeauty)

//Frash
router.get('/user/get/Product/Frash', UserProductFrash)

//Cafe
router.get('/user/get/Product/Cafe', UserProductCafe)

//Toys
router.get('/user/get/Product/Toys', UserProductToys)

//Home
router.get('/user/get/Product/Home', UserProductHome)

//Electronics
router.get('/user/get/Product/Electronics', UserProductElectronics)

//FoodCarosarl
router.get('/user/get/Product/FoodCarosarl', UserCoffeeLoverFindFoodcarosal)

//Master ProductApi
router.get('/user/master/product/:catagory_id', ProductMaster)


// ROZAR PAy
router.post('/user/add/amount', CraetePayment)
router.post('/user/verify/payment',VerifyPayment)


// Order Collect
router.post('/user/add/order',AddOrderCollect)

module.exports = router
