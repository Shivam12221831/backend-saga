const express = require("express");
const app = express();

// app.use((req,res, next) => {
//     // let { query } = req.body;
//     // console.log(query);
//     console.log("Hi, I am 1st middleware");
//     // res.send("middleware finised");
//     // next();
//     return next();   // better of writing next() b/c if you write any after next() will not execute
// });

// app.use((req,res,next) => {
//     console.log("Hi, I am 2nd middleware");
//     next();
// });

// Ex- Utility Middleware - logger
// to know more about logger read doc for morgan
app.use((req, res, next) => {
    req.time = new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path, req.time);
    return next();
});

// path customised middleware 
app.use("/random", (req, res, next) => {
    console.log("I am only for random page request!!!");
    return next();
});

// API token as Query String
// Let's create a middleware for an api that checks if the access token was passed in the query string or not.
// we are sending req on /api in query we are checking "giveaccess"
// app.use("/api", (req, res, next) => {
//     let {token} = req.query;
//     if(token === "giveaccess"){
//         return next();
//     }
//     return res.send("Access Denied!");
// })

// app.get("/api", (req, res) => {
//     res.send("data");
// })

// Passing multiple middlewares like in above token check middleware we pass it as fn. and we do so for passing many middleware.
const checkToken =  (req, res, next) => {
    let {token} = req.query;
    if(token === "giveaccess"){
        return next();
    }
    // return res.send("Access Denied!");
    throw new Error("Access Denied!");
};

app.get("/api", checkToken ,(req, res) => {
    res.send("data");
})

// If we run this we can see error stack that is provided by express default handler
// app.get("/wrong", (req,res) => {
//     abcd = anflk;
// })

app.get("/", (req,res) => {
    res.send("Hi, I am root");
});

app.get("/random", (req,res) => {
    res.send("this is a random page");
});

// 404 error
app.use((req, res) => {
    res.status(404).send("Page not found!");
});

const port = 8080;
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});