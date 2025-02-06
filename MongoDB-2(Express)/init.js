const mongoose = require("mongoose");

main().then(()=> {
    console.log("db connected successfully");
}).catch(err => console.log(err));

async function main(){
    // await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}

const chatSchema = new mongoose.Schema({
    from : {
        type : String,
        required : true,
    },
    to : {
        type : String,
        required : true,
    },
    msg : {
        type : String,
        maxLength : 50, 
    },
    created_at : {
        type : Date,
        required : true,
    }
});

const Chat = mongoose.model("Chat", chatSchema);

// const chat1 = new Chat({
//     from : "neha",
//     to : "priya",
//     msg : "Hey, send me you physics notes",
//     created_at : new Date(),
// });

// chat1.save().then(res => console.log(res)).catch(err => console.log(err));

let allChats = [
    {
        from : "neha",
        to : "preeti",
        msg : "send me notes for the exam",
        created_at : new Date(),
    },
    {
        from : "rohit",
        to : "mohit",
        msg : "teach me JS callbacks",
        created_at : new Date(),
    },
    {
        from : "amit",
        to : "sumit",
        msg : "all the best!",
        created_at : new Date(),
    },
    {
        from : "anita",
        to : "ramesh",
        msg : "bring me some fruits",
        created_at : new Date(),
    },
    {
        from : "tony",
        to : "peter",
        msg : "love you 3000",
        created_at : new Date(),
    },
];

Chat.insertMany(allChats);