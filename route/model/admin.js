var db = require("../../db");

exports.dashboard = async (req, res) => {
  const conn = await db().getConnection();

  sql = `select 
  (select count(*) from detail where order_status = '배송준비중') as readyStatusCount, 
  (select count(*) from detail where order_status = '배송중') as shippingStatusCount, 
  (select count(*) from options where option_num = 0) as productLackCount, 
  (select max(order_date) from orders) as lastOrderDate, 
  (select max(user_date) from user) as lastUserDate`;
  const [dashboard_card_data] = await conn.query(sql);

  readyStatusCount = dashboard_card_data[0].readyStatusCount;
  shippingStatusCount = dashboard_card_data[0].shippingStatusCount;
  productLackCount = dashboard_card_data[0].productLackCount;
  lastOrderDate = dashboard_card_data[0].lastOrderDate
    ? dashboard_card_data[0].lastOrderDate
    : "";
  lastUserDate = dashboard_card_data[0].lastUserDate;

  sql = `SELECT file_save_name, product_name, option_name, detail.option_num, detail.product_price, user_name, order_status, order_date 
        FROM orders, detail, options, product, image, user 
        WHERE orders.order_no = detail.order_no 
        AND detail.option_no = options.option_no 
        AND options.product_no = product.product_no 
        AND product.product_no = image.product_no 
        AND orders.user_no = user.user_no 
        ORDER BY order_date DESC;`;

  const [order_list] = await conn.query(sql);

  sql = `SELECT * FROM user;`;
  const [user_list] = await conn.query(sql);

  res.render("dashboard", {
    readyStatusCount: readyStatusCount,
    shippingStatusCount: shippingStatusCount,
    productLackCount: productLackCount,
    lastOrderDate: lastOrderDate,
    orderList: order_list,
    userList: user_list,
    lastUserDate: lastUserDate,
  });

  conn.release();
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
  orderListSql = `SELECT detail_no, product_name, option_name, detail.option_num, detail.product_price, user_name, order_status, order_date 
  from orders, detail, options, product, user 
  where orders.order_no = detail.order_no and 
  detail.option_no = options.option_no and 
  options.product_no = product.product_no and 
  orders.user_no = user.user_no 
  order by order_date desc;`;
  orderListSqlFormat = db.format(orderListSql);

  db.query(orderListSqlFormat, (err, orderList) => {
    if (err) {
      console.log(err);
    } else {
      orderStatusList = ["배송준비중", "배송중", "배송완료", "주문취소"];

      res.render("order", {
        orderList: orderList,
        orderStatusList: orderStatusList,
      });
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
