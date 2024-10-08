
const express = require("express");
const app = express();
const cookieParser =require("cookie-parser");
const errorMiddleware =require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
const product =require("./routes/productRoute");
app.use("/api/v1",product);

const user =require("./routes/userRoute");
app.use("/api/v1",user);


const order =require("./routes/orderRoute");
app.use("/api/v1",order);


app.use(errorMiddleware);



module.exports = app;