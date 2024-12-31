const express = require("express");
const app = express();

// console.log(app);

const port = 3000;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})

// app.use((req, res) => {
//     console.log("request received...");
//     // console.log(req);
//     // let code = "<h1>Fruits </h1> <ul><li>apple</li><li>orange</li></ul>";
//     // res.send(code);
//     res.send("Hello, Shivam Singh");
// })

app.get("/", (req, res) =>{
    res.send("Hello, I am root");
});

// app.get("/help", (req,res) => {
//     res.send("Welcome to Help page");
// });

// app.get("/About", (req,res) => {
//     res.send("Welcome to About page");
// });

// app.get("*", (req,res) => {
//     res.send("Sorry, this page does not exists");
// });

// app.post("/", (req,res) => {
//     res.send("Welcome to Root page by post method");
// });

app.get("/:username/:id", (req,res) => {
    let {username,id} = req.params;
    res.send(`This account belongs to @${username} with id : ${id}`);
})