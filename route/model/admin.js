var db = require("../../db");

exports.dashboard = (req, res) => {
  sql =
    "select (select count(*) from detail where order_status = '배송준비중') as readyStatusCount, (select count(*) from detail where order_status = '배송중') as shippingStatusCount, (select count(*) from options where option_num = 0) as productLackCount, (select max(order_date) from orders) as lastOrderDate, (select max(user_date) from user) as lastUserDate";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      readyStatusCount = result[0].readyStatusCount;
      shippingStatusCount = result[0].shippingStatusCount;
      productLackCount = result[0].productLackCount;
      lastOrderDate = result[0].lastOrderDate ? result[0].lastOrderDate : "";
      lastUserDate = result[0].lastUserDate;

      sql =
        "select * from orders natural join product natural join options natural join image natural join detail natural join user";
      db.query(sql, (err, orderList) => {
        if (err) {
          console.log(err);
        } else {
          sql = "select * from user";
          db.query(sql, (err, userList) => {
            if (err) {
              console.log(err);
            } else {
              res.render("dashboard", {
                readyStatusCount: readyStatusCount,
                shippingStatusCount: shippingStatusCount,
                productLackCount: productLackCount,
                lastOrderDate: lastOrderDate,
                orderList: orderList,
                userList: userList,
                lastUserDate: lastUserDate,
              });
            }
          });
        }
      });
    }
  });
};

exports.user = (req, res) => {
  sql = "select (select max(user_date) from user) as lastUserDate from user";
  db.query(sql, (err, lastUserDate) => {
    if (err) {
      console.log(err);
    } else {
      sql = "select * from user";
      db.query(sql, (err, userList) => {
        if (err) {
          console.log(err);
        } else {
          lastUserDate = lastUserDate[0].lastUserDate;
          res.render("user", {
            userList: userList,
            lastUserDate: lastUserDate,
          });
        }
      });
    }
  });
};

exports.product = (req, res) => {
  sql = "select max(product_date) as lastProductDate from product";
  db.query(sql, (err, lastProductDate) => {
    if (err) {
      console.log(err);
    } else {
      sql = "select * from product natural join image";
      db.query(sql, (err, productList) => {
        if (err) {
          console.log(err);
        } else {
          lastProductDate = lastProductDate[0].lastProductDate;

          res.render("product", {
            productList: productList,
            lastProductDate: lastProductDate,
          });
        }
      });
    }
  });
};

exports.productModify = (req, res) => {
  product_no = req.query.product_no;

  sql =
    "select * from product natural join image natural join options where product_no = ?";
  db.query(sql, product_no, (err, product) => {
    if (err) {
      console.log(err);
    } else {
      res.render("productModify", { product: product[0] });
    }
  });
};

exports.changeProductStatus = (req, res) => {
  product_no = req.body.product_no;

  sql = "select product_enable from product where product_no = ?";
  db.query(sql, product_no, (err, productStatus) => {
    if (err) {
      console.log(err);
    } else {
      productStatus = productStatus[0].product_enable;

      if (productStatus == 1) {
        changeProductStatus = 0;
      } else {
        changeProductStatus = 1;
      }

      sql = "update product set product_enable = ? where product_no = ?";
      db.query(sql, [changeProductStatus, product_no], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result.affectedRows) {
            res.send({ changeProductStatus: true });
          } else {
            res.send({ notAffectedRows: true });
          }
        }
      });
    }
  });
};

exports.order = (req, res) => {
  sql =
    "select * from detail natural join user natural join product natural join options natural join orders";
  db.query(sql, (err, orderList) => {
    if (err) {
      console.log(err);
    } else {
      res.render("order", { orderList: orderList });
    }
  });
};

exports.changeOrderStatus = (req, res) => {
  order_status = req.body.order_status;
  detail_no = req.body.detail_no;

  sql = "update detail set order_status = ? where detail_no = ?";
  db.query(sql, [order_status, detail_no], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.affectedRows) {
        res.send({ orderStatusChanged: true });
      }
    }
  });
};
