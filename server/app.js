const cors = require('cors')
const express = require("express")

const computerRouter = require("./routers/computerRouter");

const app = express();

app.use(express.json());
app.use(cors());
app.use(computerRouter);
app.use("/", (req, res) => {
    res.send("ok")
})

module.exports = app;