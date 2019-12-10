const router = require('express').Router();
const admin = require('../model/admin');
const multer = require('multer');

// GET MAPPING
router.get('/', admin.main) // 메인 페이지

// POST MAPPING
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'img/')
    },
    filename: function (req, file, cb) {
        ext = file.originalname.split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + ext[ext.length - 1]);
    }
})
  
var upload = multer({ storage: storage })

router.post('/', upload.single('file'), admin.admin)

module.exports = router