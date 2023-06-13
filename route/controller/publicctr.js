const router = require("express").Router();
const public = require("../model/public");

const multer = require("multer");
const upload = multer({
  dest: "resources/uploadFiles/",
  limits: { fileSize: 5 * 1024 * 1024 },
});

// GET MAPPING
router.get(["/helmet", "/ridingWear"], public.productListPage);
router.get(
  ["/productDetail", "/productDetail?productNo=:productNo"],
  public.productDetail
);

// AJAX POST MAPPING
router.post("/getProductList", public.getProductList);
router.post("/payment", public.payment); // 바로구매 -> 결제 페이지
router.post("/payment/final", public.paymentFinal); // 결제 페이지 -> 결제 완료

module.exports = router;
