const router = require("express").Router();
const admin = require("../model/admin");
const multer = require("multer");

// GET MAPPING
router.get("/dashboard", admin.dashboard); // 메인 페이지
router.get("/user", admin.user); // 회원목록
router.get("/product", admin.product); // 상품관리
router.get(
  ["/productModify", "/productModify?product_no=:product_no"],
  admin.productModify
);
router.get("/order", admin.order);

// POST MAPPING
/*
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
*/

router.post("/product/delete", admin.changeProductStatus);
router.post("/order/change", admin.changeOrderStatus);

module.exports = router;
