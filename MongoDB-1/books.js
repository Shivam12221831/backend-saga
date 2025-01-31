const mongoose = require("mongoose");

main().then(()=> {
    console.log("connection successful established");
}).catch(err => console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

// const bookSchema = new mongoose.Schema({
//     title: String,
//     author: String,
//     price: Number,
// });

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required : true,
    },
    author:{
        type : String,
    },
    price : {
        type : Number,
        min : [1, "Price is too low for Amazon selling"],
    },
    discount : {
        type : Number,
        default : 10,
    },
    category :{
        type: String,
        enum : ["Fictional", "Non-Fictional"],
    },
    genre : {
        type : [String],
    }
});

const Book = mongoose.model("Book", bookSchema);

// const book1 = new Book({
//     title : "Marvel Comics",
//     author : "Stan Lee",
//     price : 2200,
//     category : "Fictional",
//     genre : ["comics", "superheroes", "marvel"],
// });

// book1.save().then((res) => console.log(res)).catch(err => console.log(err));

Book.findByIdAndUpdate("679bcb3fb37dbb0465b2e95d", {price : -68}, {runValidators: true}).then(res => console.log(res)).catch(err => console.log(err.errors.price.properties.message));
