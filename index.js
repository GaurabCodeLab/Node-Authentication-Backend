require("dotenv").config();
const express = require("express");
const { router } = require("./routes/user");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", router);

app.listen(port, ()=>{
    console.log(`Server is running on port${port}`);
});