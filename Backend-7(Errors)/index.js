const express = require("express");
const app = express();
const ExpressError = require("./expressError.js");

app.use("/api", (req,res, next) => {
    let {token} = req.query;
    if(token === "giveaccess"){
        return next();
    }
    throw new ExpressError(401, "ACCESS DENIED!");
});

app.get("/api", (req,res) => {
    res.send("data");
})
app.get("/", (req,res) => {
    res.send("Hi, I am root");
});


app.get("/err", (req, res) => {
    abcd = abcd;
});

app.get("/admin", (req, res) => {
    throw new ExpressError(403, "Access to admin is Forbidden");
});

app.use((err, req, res, next) => {
    // console.log("----Error1------");
    // res.send(err);
    let {status=500, message="Some error occurred"} = err;
    res.status(status).send(message);
});

const port = 8080;
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});