var db = require('../../db');

// 로그인 페이지
exports.login = (req, res) => {
	if(req.session.user_no){
		res.send('<script>alert("접근할 수 없는 페이지입니다."); history.back();</script>');
	} else {
		res.render("login");
	}
}

// 회원가입 페이지
exports.join = (req, res) => {
	if (req.session.user_no) {
		res.send('<script>alert("접근할 수 없는 페이지입니다."); history.back();</script>');
	} else {
		res.render("join");
	}
}


// 마이페이지
exports.mypage = (req, res) => {
	if(req.session.user_no){
		res.render("mypage");
	} else {
		res.send('<script>alert("로그인 후 이용할 수 있는 서비스입니다."); location.href = "/user/login"</script>');
	}
}

// 개인정보수정
exports.modify = (req, res) => {
	user_no = req.session.user_no;

	if(user_no){
		sql = "select * from user where user_no = ?"
		db.query(sql, user_no, (err, user) => {
			if(err){
				console.log(err);
			} else {
				res.render("modify", { user : user[0] });
			}
		});
	} else {
		res.send('<script>alert("로그인 후 이용할 수 있는 서비스입니다."); location.href = "/user/login"</script>');
	}
}


// 로그아웃
exports.logout = (req, res) => {
	req.session.destroy(function(){
		res.redirect('/');
	});
}

// 로그인 처리
exports.loginPost = (req, res) => {
	userId = req.body.userId;
	userPw = req.body.userPw;
	
	sql = "select user_no, user_name, count(*) as rowCount from user where user_id = ? and user_pw = ?";
	db.query(sql, [userId, userPw], (err, result) => {
		if(err){
			console.log(err);
			res.send({ "sqlError" : err });
		} else {
			if(result[0].rowCount){
				req.session.user_no = result[0].user_no; // 세션에 회원번호 저장
				req.session.user_name = result[0].user_name; // 세션에 회원이름 저장
				res.send({ "user_name" : req.session.user_name });
			} else {
				res.send({ "loginFailed" : true });
			}
		}
	});
}

// 아이디 중복 확인
exports.overlapUserId = (req, res) => {
	userId = req.body.userId;

	// 아이디 중복 확인
	sql = "select user_id from user where user_id = ?";
	db.query(sql, userId, (err, result) => {
		if(err){
			console.log(err);
			res.send(err);
		} else {
			if(result[0]){
				res.send(true);
			} else {
				res.send(false);
			}
		}
	});
}

// 회원가입 처리
exports.joinPost = (req, res) => {
	userId = req.body.userId;
	userPw = req.body.userPw;
	userName = req.body.userName;
	userPhone = req.body.userPhone;
	userZipCode = req.body.userZipCode;
	userAddress = req.body.userAddress;
	userDetailAddress = req.body.userDetailAddress;

	sql = "insert into user(user_id, user_pw, user_name, user_phone, user_zipcode, user_address, user_detail_address, user_lv) values(?, ?, ?, ?, ?, ?, ?, 'user')";
	db.query(sql, [ userId, userPw, userName, userPhone, userZipCode, userAddress, userDetailAddress ], (err, result) => {
		if(err){
			console.log(err);
			res.send({ "sqlError" : err });
		} else {
			// 영향이 있는 행이 없다면 오류 전송
			if(result.affectedRows < 1){
				res.send({ "sqlError" : result });
			}

			res.send();
		}
	});
}

// 장바구니
exports.basket = (req, res) => {
	user_no = req.session.user_no;

	if(user_no){
		sql = "select count(user_no) as basketListCount from basket, options natural join product natural join image where user_no = ? AND basket.option_no = options.option_no"
		db.query(sql, user_no, (err, basketListCount) => {
			if(err){
				console.log(err);
			} else {
				sql = "select distinct * from basket, options natural join product natural join image where user_no = ? AND basket.option_no = options.option_no order by basket_no desc";
				db.query(sql, user_no, (err, basketList) => {
					if(err){
						console.log(err);
						res.send({ "sqlError" : err });
					} else {
						res.render("basket", { basketList: basketList, basketListCount: basketListCount[0].basketListCount });
					}
				});
			}
		});
	} else {
		res.send('<script>alert("로그인 후 이용할 수 있는 서비스입니다."); location.href = "/user/login"</script>');
	}
}

// 장바구니 상품 삭제
exports.basketDeletePost = (req, res) => {
	user_no = req.session.user_no;
	basketNo = req.body.basketNo;

	if(user_no){
		sql = "delete from basket where basket_no = ?"
		db.query(sql, basketNo, (err, result) => {
			if(err){
				console.log(err);
			} else {
				// 삭제가 성공하면
				if(result.affectedRows > 0){
					res.send(true);
				} else {
					res.send(false);
				}
			}
		});
	}
}

// 결제 페이지
exports.payment = (req, res) => {
	console.log(req.body);
	res.send(req.body);

	/*
	basketNo = req.body.basketNo;

	if (req.session.user_no) {
		sql = "select * from basket natural join product natural join image join options using(product_no) where basket_no = ? order by basket_no desc";
		db.query(sql, basketNo, (err, paymentList) => {
			if (err) {
				console.log(err);
			} else {
				res.render("productPayment", { paymentList: paymentList });
			}
		});
	} else {
		res.send('<script>alert("로그인 후 이용할 수 있는 서비스입니다."); location.href = "/user/login"</script>');
	}
	*/
}

exports.orderInfo = (req, res) => {
	user_no = req.session.user_no

	sql = "select count(user_no) as orderInfoListCount from orders where user_no = ?";
	db.query(sql, user_no, (err, result) => {
		if(err){
			console.log(err);
		} else {
			sql = "select * from orders natural join product natural join options natural join image natural join detail where user_no = ?";
			db.query(sql, user_no, (err, orderList) => {
				if(err){
					console.log(err);
				} else {
					res.render("orderInfo", { orderList: orderList, orderInfoListCount: result[0].orderInfoListCount });
				}
			});
		}
	});
}