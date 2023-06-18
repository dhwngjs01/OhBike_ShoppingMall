const express = require("express");
const router = express.Router();
const admin = require("../model/admin");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "resources/uploadFiles");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const ckeditor_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "resources/ckeditor_upload");
  },
  filename: function (req, file, cb) {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
    const minutes =
      now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    const seconds = now.getSeconds();
    const date_format = `${year}${month}${date}_${hours}${minutes}${seconds}`;

    cb(null, date_format + "_" + file.originalname);
  },
});

const ckeditor_upload = multer({ storage: ckeditor_storage });

// GET MAPPING
router.get("/dashboard", admin.dashboard); // 메인 페이지

router.get("/user", admin.user); // 회원목록

router.get("/product", admin.product); // 상품관리
router.get(
  ["/productModify", "/productModify?product_no=:product_no"],
  admin.productModifyPage
);
router.put("/product", admin.productModify); // 상품수정
router.get("/productAdd", admin.productAddPage); // 상품추가 페이지
router.post("/productAdd", upload.any(), admin.productAdd); // 상품추가
router.post("/product/image", ckeditor_upload.any(), admin.productImage); // 이미지 업로드
router.post("/product/delete", admin.changeProductStatus);

router.get("/order", admin.order);
router.post("/order/change", admin.changeOrderStatus);

module.exports = router;
