
const express = require('express')
const multerUpload = require('../middleware/multerfileupload')
const { CatagoryAdd, Catagorydelete, CatagoryUpdate, Catagoryfind } = require('../controller/catacogry')
const { ProductAdd, ProductDelete, ProductUpdate, ProductFind } = require('../controller/Product')
const { BannerAdd, BannerDelete, BannerUpdate, BannerFind } = require('../controller/Banner')
const { OfferCardAdd, OfferCardDelete, OffercardUpdate, OfferCardFind } = require('../controller/Offer')
const { CoffeeLoverAdd, CoffeeLoverDelete, CoffeeLoverUpdate, CoffeeLoverFind } = require('../controller/CofferLovers')

const router = express.Router()

//catagory Api
router.post('/add/catagory', multerUpload().single('category_Image'), CatagoryAdd)
router.delete('/delete/catagory/:catagory_id', Catagorydelete)
router.put('/update/catagory', multerUpload().single('category_Image'), CatagoryUpdate)
router.get('/find/catagory', Catagoryfind)

//Products api
router.post('/admin/add/product', multerUpload().single('product_Image'), ProductAdd)
router.delete('/admin/delete/product/:product_id', ProductDelete)
router.put('/admin/update/product', multerUpload().single('product_Image'), ProductUpdate)
router.get('/admin/find/product', ProductFind)

//Banner Api
router.post('/admin/add/banner', multerUpload().single('BannerImage'), BannerAdd)
router.delete('/admin/delete/banner/:Banner_id', BannerDelete)
router.put('/admin/update/banner', multerUpload().single('BannerImage'), BannerUpdate)
router.get('/admin/find/banner', BannerFind)


//Offer Api
router.post('/admin/add/offer',multerUpload().single('offercardImage'),OfferCardAdd)
router.delete('/admin/delete/offer/:OfferCard_id',OfferCardDelete)
router.put('/admin/update/offer', multerUpload().single('offercardImage'), OffercardUpdate)
router.get('/admin/find/offer',OfferCardFind)


// CoffeeLover Api
router.post('/admin/add/cofferlover',CoffeeLoverAdd)
router.delete('/admin/delete/coffee/:CoffeeLover_id',CoffeeLoverDelete)
router.put('/admin/update/coffee',CoffeeLoverUpdate)
router.get('/admin/find/coffee',CoffeeLoverFind)
module.exports = router