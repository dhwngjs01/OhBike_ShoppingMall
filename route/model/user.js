var db = require("../../db");

// 로그인 페이지 - /user/login
exports.login = (req, res) => {
  if (req.session.user_no) {
    res.send(
      '<script>alert("접근할 수 없는 페이지입니다."); history.back();</script>'
    );
  } else {
    res.render("login");
  }
};

// 회원가입 페이지 - /user/join
exports.join = (req, res) => {
  if (req.session.user_no) {
    res.send(
      '<script>alert("접근할 수 없는 페이지입니다."); history.back();</script>'
    );
  } else {
    res.render("join");
  }
};

// 마이페이지 - /user/mypage
exports.mypage = (req, res) => {
  if (req.session.user_no) {
    res.render("mypage");
  } else {
    res.send(
      '<script>alert("로그인 후 이용할 수 있는 서비스입니다."); location.href = "/user/login"</script>'
    );
  }
};

// 회원정보수정 - /user/modify
exports.modify = (req, res) => {
  user_no = req.session.user_no;

  if (user_no) {
    sql = "select * from user where user_no = ?";
    db.query(sql, user_no, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        res.render("modify", { user: user[0] });
      }
    });
  } else {
    res.send(
      '<script>alert("로그인 후 이용할 수 있는 서비스입니다."); location.href = "/user/login"</script>'
    );
  }
};

// 로그아웃 /user/logout
exports.logout = (req, res) => {
  req.session.destroy(function () {
    res.redirect("/");
  });
};

// 로그인 처리 - /user/login
exports.loginPost = (req, res) => {
  userId = req.body.userId;
  userPw = req.body.userPw;

  sql =
    "select user_no, user_name, count(*) as rowCount from user where user_id = ? and user_pw = ?";
  db.query(sql, [userId, userPw], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ sqlError: err });
    } else {
      if (result[0].rowCount) {
        req.session.user_no = result[0].user_no; // 세션에 회원번호 저장
        req.session.user_name = result[0].user_name; // 세션에 회원이름 저장
        res.send({ user_name: req.session.user_name });
      } else {
        res.send({ loginFailed: true });
      }
    }
  });
};

// 아이디 중복 확인 처리 - /user/join
exports.overlapUserId = (req, res) => {
  userId = req.body.userId;

  sql = "select user_id from user where user_id = ?";
  db.query(sql, userId, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (result[0]) {
        res.send(true);
      } else {
        res.send(false);
      }
    }
  });
};

// 회원가입 처리 - /user/join
exports.joinPost = (req, res) => {
  userId = req.body.userId;
  userPw = req.body.userPw;
  userName = req.body.userName;
  userPhone = req.body.userPhone;
  userZipCode = req.body.userZipCode;
  userAddress = req.body.userAddress;
  userDetailAddress = req.body.userDetailAddress;

  sql =
    "insert into user(user_id, user_pw, user_name, user_phone, user_zipcode, user_address, user_detail_address, user_lv) values(?, ?, ?, ?, ?, ?, ?, 'user')";
  db.query(
    sql,
    [
      userId,
      userPw,
      userName,
      userPhone,
      userZipCode,
      userAddress,
      userDetailAddress,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ sqlError: err });
      } else {
        // 영향이 있는 행이 없다면 오류 전송
        if (result.affectedRows < 1) {
          res.send({ sqlError: result });
        } else {
          res.send();
        }
      }
    }
  );
};

// 장바구니 페이지 - /user/basket
exports.basket = (req, res) => {
  user_no = req.session.user_no;

  basketListCount =
    "select count(user_no) as basketListCount from basket, options natural join product natural join image where user_no = ?;";
  basketListCountFormat = db.format(basketListCount, user_no);

  basketList =
    "select basket_no, file_save_name, file_show_name, product_name, basket.option_no, option_name, basket.option_num, product_price from basket, options natural join product natural join image where basket.user_no = 2 and basket.option_no = options.option_no order by basket_datetime desc, basket_no desc;";
  basketListFormat = db.format(basketList, user_no);

  if (user_no) {
    db.query(basketListCountFormat + basketListFormat, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.render("basket", {
          basketListCount: result[0][0].basketListCount,
          basketList: result[1],
        });
      }
    });
  } else {
    res.send(
      '<script>alert("로그인 후 이용할 수 있는 서비스입니다."); location.href = "/user/login"</script>'
    );
  }
};

// 장바구니 상품 삭제 - /user/basket
exports.basketDeletePost = (req, res) => {
  user_no = req.session.user_no;
  basket_no_list = JSON.parse(req.body.basket_no_list);

  if (user_no) {
    sql = "";

    basket_no_list.each((basket_no) => {
      delete_basket_sql =
        "delete from basket where basket_no = ? and user_no = ?";
      delete_basket_sql_format = db.format(delete_basket_sql, [
        basket_no,
        user_no,
      ]);
    });

    // 장바구니 삭제 다중 쿼리 구현해야돼
    db.query(sql, [basket_no, user_no], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // 삭제가 성공하면
        if (result.affectedRows > 0) {
          res.send(true);
        } else {
          res.send(false);
        }
      }
    });
  } else {
    res.send("please_login");
  }
};

// 결제 페이지 - /product/payment
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
};

// 주문 조회 페이지 - /user/orderInfo
exports.orderInfo = (req, res) => {
  user_no = req.session.user_no;

  orderListCount =
    "select count(user_no) as orderInfoListCount from orders where user_no = ?;";
  orderListCountFormat = db.format(orderListCount, user_no);

  orderListSql =
    "SELECT file_save_name, product_name, option_name, detail.option_num, order_totalPrice, order_status, order_date from orders, detail, options, product, image where orders.order_no = detail.order_no and detail.option_no = options.option_no and options.product_no = product.product_no and product.product_no = image.product_no and user_no = ? order by order_date desc;";
  orderListSqlFormat = db.format(orderListSql, user_no);

  db.query(orderListCountFormat + orderListSqlFormat, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.render("orderInfo", {
        orderList: result[1],
        orderInfoListCount: result[0][0].orderInfoListCount,
      });
    }
  });
};
