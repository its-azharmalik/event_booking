const express = require('express');
const morgan = require("morgan");
const bd = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const cors = require("cors");
const db = require('./config/db.config');

dotenv.config();

const PORT = process.env.PORT;

const app = express();

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bd.urlencoded({ extended: false }));
app.use(bd.json());

app.get('/home', (req,res) =>{
    res.json("welcome");
})

app.listen(PORT, () => {
    console.log(`App running on PORT ${`${PORT}`.bold.yellow}`);
});