const express = require("express");
const app = express();
const {sequelize} = require("./db")
const musicianRouter = require("./routes/musician");

const port = 3000;

app.use("/musicians", musicianRouter);

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})