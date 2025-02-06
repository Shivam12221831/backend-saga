const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(methodOverride("_method"));

main().then(()=> {
    console.log("db connected successfully");
}).catch(err => console.log(err));

async function main(){
    // await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}

// const chat1 = new Chat({
//     from : "neha",
//     to : "priya",
//     msg : "Hey, send me you physics notes",
//     created_at : new Date(),
// });

// chat1.save().then(res => console.log(res)).catch(err => console.log(err));

// Chat.findByIdAndDelete('679cf2df305124e71fa37c29').then(res => console.log(res)).catch(err => console.log(err));

app.get("/", (req, res) => {
    // console.log("Site is running fine");
    res.send("Site is running fine");
})

// Index Route
app.get("/chats", async (req, res) => {
    try{
        let chats = await Chat.find();
        // console.log(chats);
        // res.send("working fine!");
        res.render("index.ejs", {chats});
    } catch(err){
        next(err);
    }
})

// New Route
app.get("/chats/new", (req, res) => {
    // throw new ExpressError(404, "Page not found!");
    try{
        res.render("new.ejs");
    } catch(err){
        next(err);
    }
})

// Create Route
app.post("/chats", async (req, res) => {
    try{
        let data = req.body;
        // console.log(data);
        // await Chat.insertOne(data);
        const newChat = new Chat({
            from : data.from,
            to : data.to,
            msg : data.msg,
            created_at : new Date(),
        });
        const result = await newChat.save().catch(err => console.log(err));
        console.log(result);
        res.redirect("/chats");
    }  catch(err){
        next(err);
    }
})

// asyncWrap - wrap the callback - used to handle error of async callbacks without try catch b/c try catch used to much times in code
function asyncWrap(fn){
    return function(req, res, next){
        fn(req, res, next).catch((err) => next(err));
    }
}

// New - Show Route - It is created just to learn async error handling 
// we came here from backend-7(errors) so can skip this route till you reach backend7
app.get("/chats/:id", asyncWrap(async(req, res, next) => {
        let { id } = req.params;
        let chat = await Chat.findById(id);
        if(!chat){
            return next(new ExpressError(500, "Chat not found!"));
        }
        res.render("edit.ejs", {chat});
    })
);

// Edit Route
app.get("/chats/:id/edit", async (req,res) => {
    try{
        const {id} = req.params;
        let chat = await Chat.findById(id);
        // console.log(chat);
        res.render("edit.ejs", {chat});
    } catch(err){
        next(err);
    }
});

// Update Route
app.put("/chats/:id", async (req,res) => {
    try{
        const {id} = req.params;
        const newMsg = req.body;
        // console.log(id, newMsg);
        let updatedChat = await Chat.findByIdAndUpdate(id, {msg : newMsg.msg}, {new : true}, {runValidators : true});
        console.log(updatedChat);
        res.redirect("/chats");
    } catch(err){
        next(err);
    }
})

// Destroy Route
app.delete("/chats/:id", async(req,res) => {
    try{
        const {id} = req.params;
        console.log(id);
        let deletedChat = await Chat.findByIdAndDelete(id).catch(err => console.log(err));
        console.log(deletedChat);
        res.redirect("/chats");
    } catch(err){
        next(err);
    }
})

const handleValidationErr = (err) => {
    console.log("This was a validation error, Please follow rules");
    console.log(err.message);
    return err;
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if(err.name === "ValidationError"){
        err = handleValidationErr(err);
    }
    next(err);
})

// Error - handler
app.use((err, req, res, next) => {
    let { status = 500, message = "Some error occurred"} = err;
    res.status(status).send(message);
})


const port = 8080;
app.listen(port, () => {
    console.log(`App is listening on port : ${port}`);
});