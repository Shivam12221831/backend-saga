const express = require("express");
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended : true }));
app.use(express.json());

app.get("/register", (req, res) => {
    // console.log(req.query);
    let {username, password} = req.query;
    res.send(`Standard Get response. Welcome ${username}!`);
})

app.post("/register", (req, res) => {
    console.log(req.body);
    let {username, password} = req.body;
    res.send(`Standard Post response. Welcome ${username}!`);
})

app.listen(port, () => {
    console.log(`App is running on port ${port}.`);
})