const Routes = require("./utiles/handler.routes");
const database = require("./utiles/handler.database");
const express = require("./packages/node_modules/express");

const port = process.env.port || 7050;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


database.connection.on("open", () => {
    console.log("Open");
    app.use("/cart",Routes.CartRoute);
    app.use("/product", Routes.ProductRoute);
    app.use("/contact", Routes.ContactRoute);
    app.use("/category", Routes.CategoryRoute);
    
});

database.connection.on("error", () => { console.log("Error Happened") })

app.listen(port, () => console.log(`Running on: http://localhost:${port}`))