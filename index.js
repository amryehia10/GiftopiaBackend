const database = require("./utiles/handler.database");
const express = require("./packages/node_modules/express");
const cartRoute = require("./routes/route.cart");

const port = process.env.port || 7050;
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

database.connection.on("open", () => {
    console.log("Opened");
    // app.use("/api/log", LoginRouter)
    // app.use("/api/reg", RegisterRouter)
    // app.use("/api/student", StudentRouter)
});

database.connection.on("error", () => { console.log("Error Happened") })


app.use("/cart",cartRoute);

app.listen(port, () => console.log(`Running on: http://localhost:${port}`))