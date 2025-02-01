const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

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
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
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
    let chats = await Chat.find();
    // console.log(chats);
    // res.send("working fine!");
    res.render("index.ejs", {chats});
})

// New Route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
})

// Create Route
app.post("/chats", async (req, res) => {
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
})

// Edit Route
app.get("/chats/:id/edit", async (req,res) => {
    const {id} = req.params;
    let chat = await Chat.findById(id);
    // console.log(chat);
    res.render("edit.ejs", {chat});
});

// Update Route
app.put("/chats/:id", async (req,res) => {
    const {id} = req.params;
    const newMsg = req.body;
    // console.log(id, newMsg);
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg : newMsg.msg}, {new : true}, {runValidators : true});
    console.log(updatedChat);
    res.redirect("/chats");
})

// Destroy Route
app.delete("/chats/:id", async(req,res) => {
    const {id} = req.params;
    console.log(id);
    let deletedChat = await Chat.findByIdAndDelete(id).catch(err => console.log(err));
    console.log(deletedChat);
    res.redirect("/chats");
})

const port = 8080;
app.listen(port, () => {
    console.log(`App is listening on port : ${port}`);
});