const router = require('express').Router();
const user = require('../model/user');

// GET MAPPING
router.get('/login', user.login) // 로그인 페이지
router.get('/join', user.join) // 회원가입 페이지
router.get('/logout', user.logout) // 로그아웃
router.get("/mypage", user.mypage) // 마이페이지
router.get("/basket", user.basket) // 장바구니
router.get("/modify", user.modify) // 개인정보수정 페이지
router.get("/orderInfo", user.orderInfo) // 주문조회

// POST MAPPING
router.post('/login', user.loginPost) // 로그인
router.post('/join', user.joinPost) // 회원가입
router.post("/payment", user.payment); // 장바구니 -> 결제 페이지

// AJAX POST MAPPING
router.post("/basket/delete", user.basketDeletePost) // 장바구니 상품 삭제
router.post('/join/overlapUserId', user.overlapUserId) // 아이디 중복 확인
module.exports = router;