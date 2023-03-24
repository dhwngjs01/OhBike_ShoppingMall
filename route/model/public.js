var db = require("../../db");
var user = require("../model/user");

// 상품목록 페이지 - 헬멧
exports.helmet = (req, res) => {
  category = "헬멧";

  sql =
    "select distinct product_brand, product_category from product where product_category = ? and product_enable = 1 order by product_brand";
  db.query(sql, category, (err, brandList) => {
    if (err) {
      console.log(err);
    } else {
      res.render("productList", { brandList: brandList, category: category });
    }
  });
};

exports.ridingWear = (req, res) => {};

// 상품목록 뿌려주기
exports.getProductList = (req, res) => {
  let product_category = req.body.category;
  let product_brand = JSON.parse(req.body.brand);
  let brandSql = "";

  if (product_brand.length > 0) {
    brandSql = "and";

    product_brand.forEach((brand, key) => {
      brandSql += " product_brand like '%" + brand + "%' or";
    });

    brandSql = brandSql.substring(0, brandSql.length - 3);
  }

  // 상품 개수 구하기 쿼리문 생성 및 실행
  sql =
    "select count(product_no) as productCount from product natural join image where product_category = ? " +
    brandSql;
  db.query(sql, product_category, (err, productCount) => {
    if (err) {
      console.log(err);
    } else {
      // 상품 목록 쿼리문 생성 및 실행
      sql =
        "select * from product natural join image where product_category = ? " +
        brandSql +
        " order by product_brand";
      db.query(sql, product_category, (err, productList) => {
        if (err) {
          console.log(err);
          3;
        } else {
          // 상품 개수와 상품 목록을 뿌려줌 (ajaxProductList.jade)
          res.render("ajaxProductList", {
            productList: productList,
            productCount: productCount[0].productCount,
          });
        }
      });
    }
  });
};

// 상품 상세 페이지
exports.productDetail = (req, res) => {
  productNo = req.query.productNo;

  // 상품 정보 쿼리문 생성
  productSql = "select * from product natural join image where product_no = ?;";
  productSqlFormat = db.format(productSql, productNo);

  // 상품 옵션 쿼리문 생성
  optionSql = "select * from options where product_no = ?;";
  optionSqlFormat = db.format(optionSql, productNo);

  // 상품 정보와 상품 옵션을 한번에 가져옴
  db.query(productSqlFormat + optionSqlFormat, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      product = result[0][0]; // 상품 정보
      optionList = result[1]; // 상품 옵션

      // 상품 상세 페이지 렌더링 (productDetail.jade)
      res.render("productDetail", {
        product: product,
        optionList: optionList,
      });
    }
  });
};

// 상품 결제 페이지
exports.payment = (req, res) => {
  userNo = req.session.user_no; // 로그인한 유저의 번호
  productNo = req.body.productNo; // 상품 번호들
  optionNo = req.body.optionNo; // 옵션 번호들
  optionNum = req.body.optionNum; // 옵션 개수들
  basket_no_list =
    req.body.basket_no_list == undefined ? [] : req.body.basket_no_list; // 장바구니 번호들
  // true == 바로구매 버튼 클릭으로 폼을 전송했을 시
  // false == 장바구니 버튼 클릭으로 폼을 전송했을 시
  directPayment = req.body.directPayment; // 바로구매 여부

  // 상품 보기 페이지에서 바로구매, 장바구니 페이지에서 주문하기(선택한 상품 주문, 전체 주문) 버튼을 클릭했을 시
  if (directPayment == "true") {
    // 로그인한 유저의 정보를 가져옴
    user_no_sql = "select * from user where user_no = ?";
    user_no_sql_format = db.format(user_no_sql, userNo);
    db.query(user_no_sql_format, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        // 상품 정보를 가져옴
        product_sql =
          "select * from product natural join options natural join image where";

        // 상품 번호들을 배열로 만들어서 반복문을 돌림
        optionNo.forEach((optionNo, key) => {
          product_sql += " option_no = ? or"; // 상품 번호를 쿼리문에 추가
        });

        // 마지막에 붙은 or을 제거
        product_sql = product_sql.substring(0, product_sql.length - 3);

        // 상품 번호를 쿼리문에 추가
        product_sql_format = db.format(product_sql, optionNo);

        // 상품 정보를 가져옴
        db.query(product_sql_format, (err, product_list) => {
          if (err) {
            console.log(err);
            res.send({ sqlError: err });
          } else {
            product_list.size = product_list.length; // 상품 개수
            product_list.total_product_price = 0; // 상품 총 가격

            product_list.forEach((product, key) => {
              // 상품 개수가 재고 개수보다 많은 수량을 주문할 시 뒤로가기
              if (product.option_num < optionNum[key]) {
                msg =
                  "재고보다 많은 수량을 주문할 수 없습니다.\\r\\n\\r\\n주문하신 수량보다 재고가 부족한 상품 목록\\r\\n";
                msg +=
                  product.product_name +
                  " (옵션 : " +
                  product.option_name +
                  ") - " +
                  "주문 가능한 수량 : " +
                  original_option_num +
                  "개";
                move_url = "history.back();";

                res.send(
                  "<script>alert('" + msg + "');" + move_url + "</script>"
                );

                return;

                // 재고가 충분할 시
              } else {
                product_list[key].original_option_num = product.option_num; // 재고 개수 변수
                product_list[key].selected_option_num = optionNum[key]; // 선택한 옵션 개수
                product_list.total_product_price +=
                  product.product_price * optionNum[key]; // 상품 총 가격
              }
            });

            // 결제 페이지 렌더링 (productPayment.jade)
            res.render("public/productPayment", {
              product_list: product_list, // 상품 정보와 옵션 정보
              basket_no_list: basket_no_list,
              user: user[0], // 로그인한 유저의 정보
            });
          }
        });
      }
    });
    // 장바구니 버튼 클릭으로 폼을 전송했을 시
  } else if (directPayment == "false") {
    // 장바구니에 이미 상품이 존재하는지 확인
    basketItemCountSql =
      "select basket_no, count(*) as basketItemCount from basket where user_no = ? and option_no = ?";
    basketItemCountFormat = db.format(basketItemCountSql, [userNo, optionNo]);

    // 장바구니에 상품이 존재할 시
    db.query(basketItemCountFormat, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        basketNo = result[0].basket_no; // 장바구니 번호
        basketItemCount = result[0].basketItemCount; // 장바구니에 상품 개수

        // 장바구니에 상품이 존재할 시
        if (basketItemCount > 0) {
          // 장바구니에 상품이 존재할 시 옵션 개수를 업데이트
          updateBasketItemOptionNumSql =
            "update basket set option_num = option_num + ? where user_no = ? and basket_no = ?";

          // 쿼리문 생성
          updateBasketItemOptionNumSqlFormat = db.format(
            updateBasketItemOptionNumSql,
            [optionNum, userNo, basketNo]
          );

          // 쿼리문 실행
          db.query(updateBasketItemOptionNumSqlFormat, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              // 장바구니 페이지로 리다이렉트
              if (result.affectedRows > 0) {
                res.redirect("/user/basket");
              } else {
                res.send(
                  '<script>alert("장바구니에 담는데 실패했습니다."); history.back();</script>'
                );
              }
            }
          });
          // 장바구니에 상품이 존재하지 않을 시
        } else {
          // 장바구니에 상품을 추가
          insertBasketItemSql =
            "insert into basket(user_no, product_no, option_no, option_num) values(?, ?, ?, ?)";

          // 쿼리문 생성
          insertBasketItemSqlFormat = db.format(insertBasketItemSql, [
            userNo,
            productNo,
            optionNo,
            optionNum,
          ]);

          // 쿼리문 실행
          db.query(insertBasketItemSqlFormat, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              // 장바구니 페이지로 리다이렉트
              if (result.affectedRows > 0) {
                res.redirect("/user/basket");
              } else {
                res.send(
                  '<script>alert("장바구니에 담는데 실패했습니다."); history.back();</script>'
                );
              }
            }
          });
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

// 결제 페이지 -> 결제 완료 페이지 (결제 완료 후 장바구니에서 상품 삭제)
exports.paymentFinal = (req, res) => {
  // 로그인한 유저의 정보
  // (로그인한 유저만 결제 가능)
  // (로그인 안한 유저는 로그인 페이지로 리다이렉트) (로그인한 유저의 정보는 결제 완료 후 주문 테이블에 저장하기 위함)
  ordersData = {
    user_no: req.session.user_no,
    order_totalPrice: req.body.total_product_price,
    order_status: "배송준비중",
    order_ship_name: req.body.order_ship_name,
    order_ship_phone: req.body.order_ship_phone,
    order_ship_zipcode: req.body.order_ship_zipcode,
    order_ship_address: req.body.order_ship_address,
    order_ship_detail_address: req.body.order_ship_detail_address,
    order_msg: req.body.order_msg,
  };

  basket_no_list =
    req.body.basket_no_list == undefined ? [] : req.body.basket_no_list;

  // 주문 테이블에 주문 정보 저장
  // 주문 번호를 생성하기 위해 주문 테이블에 데이터를 저장한 후 주문 번호를 가져옴
  // 주문 번호를 가져온 후 주문 상세 테이블에 주문 번호와 상품 번호, 옵션 번호, 옵션 개수를 저장
  ordersSql = "insert into orders set ?";

  // 쿼리문 생성
  db.query(ordersSql, ordersData, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // 주문 테이블에 주문 정보 저장 성공
      if (result.affectedRows > 0) {
        // 주문 번호를 가져오기 위한 쿼리문
        orderSql =
          "select max(order_no) as order_no from orders where user_no = ?";

        // 쿼리문 생성
        orderSqlFormat = db.format(orderSql, [ordersData.user_no]);

        // 쿼리문 실행
        db.query(orderSqlFormat, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            order_no = result[0].order_no; // 주문 번호
            payment_size = req.body.payment_size; // 결제 상품 개수

            // 주문 상세 테이블에 저장할 데이터
            detailData = {
              product_no: req.body.product_no, // 상품 번호
              order_no: order_no, // 주문 번호
              option_no: req.body.option_no, // 옵션 번호
              option_num: req.body.option_num, // 옵션 개수
              product_price: req.body.product_price, // 상품 가격
            };

            // 주문 상세 테이블에 주문 상세 정보 저장 (주문 번호, 상품 번호, 옵션 번호, 옵션 개수, 상품 가격)
            if (order_no) {
              // 쿼리문 정의
              detailSql = "";
              for (i = 0; i < payment_size; i++) {
                detailSql +=
                  "insert into detail(product_no, order_no, option_no, option_num, product_price) values (" +
                  detailData.product_no[i] +
                  ", " +
                  detailData.order_no +
                  ", " +
                  detailData.option_no[i] +
                  ", " +
                  detailData.option_num[i] +
                  ", " +
                  detailData.product_price[i] +
                  ");";
              }

              // 쿼리문 생성
              detailSqlFormat = db.format(detailSql, detailData);

              // 쿼리문 실행
              db.query(detailSqlFormat, (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  // 주문 상세 테이블에 주문 상세 정보 저장 성공
                  if (result) {
                    optionsSql = "";
                    for (i = 0; i < payment_size; i++) {
                      // 재고 수량 감소 쿼리문 정의
                      optionsSql +=
                        "update options set option_num = option_num - " +
                        detailData.option_num[i] +
                        " where option_no = " +
                        detailData.option_no[i] +
                        ";";
                    }

                    // 상품 수량 감소 쿼리문 실행
                    db.query(optionsSql, (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        // 상품 수량 감소 성공
                        if (result) {
                          // 장바구니 번호가 존재할 시
                          if (basket_no_list.length > 0) {
                            deleteBasketItemSql = "";
                            basket_no_list.forEach((basket_no) => {
                              // 장바구니에서 상품 삭제 쿼리문
                              deleteBasketItemSql +=
                                "delete from basket where basket_no = " +
                                basket_no +
                                ";";
                            });

                            // 쿼리문 실행
                            db.query(deleteBasketItemSql, (err, result) => {
                              if (err) {
                                console.log(err);
                              } else {
                                // 장바구니에서 상품 삭제 성공
                                if (result) {
                                  res.send({ orderSuccess: true });
                                } else {
                                  res.send({ basketDeleteFailed: true });
                                }
                              }
                            });
                          } else {
                            // 장바구니 번호가 존재하지 않을 시
                            // 결제 완료 페이지로 리다이렉트
                            res.send({ orderSuccess: true });
                          }
                        } else {
                          // 상품 수량 감소 실패
                          res.send({ optionsUpdateFailed: true });
                        }
                      }
                    });
                  } else {
                    res.send({ detailInsertFailed: true });
                  }
                }
              });
            }
          }
        });
      } else {
        res.send({ ordersInsertFailed: true });
      }
    }
  });
};
