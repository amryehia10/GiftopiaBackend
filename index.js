const Routes = require("./utiles/handler.routes");
const database = require("./utiles/handler.database");
const express = require("./packages/node_modules/express");
const cors = require("./packages/node_modules/cors");
const AuthMiddleware = require("./middle-wares/AuthMiddleware ");

const port = process.env.port || 7050;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

database.connection.on("open", () => {
  console.log("Open");
  app.use("/auth", Routes.AuthRoute);
  app.use("/cart", Routes.CartRoute);
  app.use("/user", Routes.UserRoute);
  app.use("/order", Routes.OrderRoute);
  app.use("/review", Routes.ReviewRoute);
  app.use("/wishlist", Routes.WishlistRoute);
  app.use("/contact", Routes.ContactRoute);
  app.use("/product", Routes.ProductRoute);
  app.use("/category", Routes.CategoryRoute);
});

database.connection.on("error", () => {
  console.log("Error Happened");
});

app.listen(port, () => console.log(`Running on: http://localhost:${port}`));
