const multer = require('multer')
const fs = require('fs')
const path = require('path')

const multerUpload = () => {
    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                const folderPath = path.resolve('assets')
                fs.mkdirSync(folderPath, { recursive: true })
                cb(null, folderPath)
            },
            filename: (req, file, cb) => {
                cb(null, new Date().getTime() + '-' + file.originalname)
            }
        }),
        fileFilter: (req, file, cb) => {
            const allowType = ['image/png', 'image/jpg', 'image/svg+xml','image/webp']
            if (allowType.includes(file.mimetype)) {
                cb(null, true)
            }
            else {
                cb(new Error("Not Vailed Mimetype"), false)
            }
        }
    })
}

module.exports = multerUpload
