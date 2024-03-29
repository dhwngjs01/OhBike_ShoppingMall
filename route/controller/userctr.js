const router = require("express").Router();
const user = require("../model/user");

// GET MAPPING
router.get("/login", user.login); // 로그인 페이지
router.get("/join", user.join); // 회원가입 페이지
router.get("/logout", user.logout); // 로그아웃
router.get("/mypage", user.mypage); // 마이페이지
router.get("/basket", user.basket); // 장바구니
router.get("/modify", user.modifyPage); // 개인정보수정 페이지
router.put("/modify", user.modify); // 개인정보수정
router.get("/orderInfo", user.orderInfo); // 주문조회
router.get("/dieMySelf", user.dieMySelfPage); // 회원탈퇴 페이지

router.delete("/dieMySelf", user.dieMySelf); // 회원탈퇴

// POST MAPPING
router.post("/login", user.loginPost); // 로그인
router.post("/join", user.joinPost); // 회원가입

// AJAX POST MAPPING
router.post("/basket/delete", user.basketDeletePost); // 장바구니 상품 삭제
router.post("/join/overlapUserId", user.overlapUserId); // 아이디 중복 확인
module.exports = router;
