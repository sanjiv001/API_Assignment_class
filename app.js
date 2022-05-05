const express = require("express");
const app = express()
app.use(express.json());
require("./connection/database");

const customerRouter = require("./router/customer_router");
app.use(customerRouter);

app.listen(90)