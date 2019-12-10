var db = require('../../db');

// 상품목록 페이지 - 헬멧
exports.helmet = (req, res) => {
	category = "헬멧";

	sql = "select distinct product_brand, product_category from product where product_category = ? and product_enable = 1 order by product_brand";
	db.query(sql, category, (err, brandList) => {
		if(err){
			console.log(err);
		} else {
			res.render("productList", { brandList : brandList, category : category });
		}   
	});
}

exports.ridingWear = (req, res) => {

}

// AJAX 상품목록
exports.getProductList = (req, res) => {
	let product_category = req.body.category;
	let product_brand = JSON.parse(req.body.brand);
	let brandSql = "";

	if(product_brand.length > 0){
		brandSql = "and";

		product_brand.forEach((brand, key) => {
			brandSql += " product_brand like '%" + brand + "%' or";
		});

		brandSql = brandSql.substring(0, brandSql.length - 3);
	}

	sql = "select count(product_no) as productCount from product natural join image where product_category = ? " + brandSql;
	db.query(sql, product_category, (err, productCount) => {
		if(err){
			console.log(err);
		} else {
			sql = "select * from product natural join image where product_category = ? " + brandSql + " order by product_brand";
			db.query(sql, product_category, (err, productList) => {
				if(err){
					console.log(err);3
				} else {
					res.render("ajaxProductList", { productList: productList, productCount: productCount[0].productCount });
				}
			});
		}
	});
}

// 상품 상세 페이지
exports.productDetail = (req, res) => {
	productNo = req.query.productNo;

	sql = "select * from product natural join image where product_no = ?";
	db.query(sql, productNo, (err, product) => {
		if(err){
			console.log(err);
		} else {
			sql = "select * from options where product_no = ?";
			db.query(sql, productNo, (err, optionList) => {
				if(err){
					console.log(err);
				} else {
					res.render("productDetail", { product: product[0], optionList: optionList });
				}
			});
		}
	});
}

// 바로구매 -> 결제 페이지
exports.payment = (req, res) => {
  userNo = req.session.user_no;
  productNo = req.body.productNo;
  optionNo = req.body.optionNo;
  optionNum = req.body.optionNum;
  optionMax = req.body.optionMax;

  // true == 바로구매 버튼 클릭으로 폼을 전송했을 시
  // false == 장바구니 버튼 클릭으로 폼을 전송했을 시
  directPayment = req.body.directPayment;

	if (directPayment == "true") {
		sql = "select * from user where user_no = ?";
		db.query(sql, userNo, (err, user) => {
	  		if (err) {
				console.log(err);
	  		} else {
				sql = "select * from product natural join options natural join image where product_no = ? AND option_no = ?";
				db.query(sql, [productNo, optionNo], (err, payment) => {
					if (err) {
						console.log(err);
						res.send({ sqlError: err });
					} else {
						payment[0].option_num = optionNum;

						res.render("public/productPayment", {
							payment: payment[0],
							user: user[0]
						});
					}
				});
			}
		});
  	} else if (directPayment == "false") {
		sql = "insert into basket(user_no, product_no, option_no, option_num) values(?, ?, ?, ?)";
		db.query(sql, [userNo, productNo, optionNo, optionNum], (err, result) => {
			if (err) {
				console.log(err);
				res.send({ sqlError: err });
			} else {
				if (result.affectedRows > 0) {
					res.redirect("/user/basket");
				} else {
					res.send('<script>alert("알 수 없는 오류로 장바구니 담기에 실패했습니다.\n관리자에게 문의하세요."); history.back();</script>');
				}
			}
		});
	} else {
		// directPayment가 없는 이상한 접근일 경우
		res.send(
		'<script>alert("접근할 수 없는 페이지입니다."); history.back()</script>'
		);
	}
};

// 결제 페이지 -> 결제 완료
exports.paymentFinal = (req, res) => {
	user_no = req.session.user_no;
	product_no = req.body.product_no;
	product_price = req.body.product_price;
	option_no = req.body.option_no;
	option_num = req.body.option_num;
	order_totalPrice = req.body.order_totalPrice;
	order_ship_name = req.body.order_ship_name;
	order_ship_phone = req.body.order_ship_phone;
	order_ship_zipcode = req.body.order_ship_zipcode;
	order_ship_address = req.body.order_ship_address;
	order_ship_detail_address = req.body.order_ship_detail_address;
	order_msg = req.body.order_msg;

	// 주문
	sql = "insert into orders(user_no, order_totalPrice, order_status, order_ship_name, order_ship_phone, order_ship_zipcode, order_ship_address, order_ship_detail_address, order_msg) values(?, ?, '배송준비중', ?, ?, ?, ?, ?, ?)"
	db.query(sql, [ user_no, order_totalPrice, order_ship_name, order_ship_phone, order_ship_zipcode, order_ship_address, order_ship_detail_address, order_msg ], (err, result) => {
		if(err){
			console.log(err);
		} else {
			if(result.affectedRows){
				sql = "select max(order_no) as order_no from orders";
				db.query(sql, (err, result) => {
					if(err){
						console.log(err);
					} else {
						order_no = result[0].order_no;
						if(order_no){
							// 주문 상세
							sql = "insert into detail(product_no, order_no, option_no, product_price, option_num) values (?, ?, ?, ?, ?)";
							db.query(sql, [ product_no, order_no, option_no, product_price, option_num ], (err, result) => {
								if(err){
									console.log(err);
								} else {
									if(result.affectedRows){
										res.send({ "orderSuccess" : true });
									} else {
										res.send({ "detailInsertFailed" : true });
									}
								}
							})
						}
					}
				});
			} else {
				res.send({ "ordersInsertFailed" : true });
			}
		}
	});
}