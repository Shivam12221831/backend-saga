const mongoose = require("mongoose");

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch((err) => {
        console.log(err);
    }
);

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    age : Number,
});

const User = mongoose.model("User", userSchema);
// const Employee = mongoose.model("Employee", userSchema);

// const user1 = new User({ name : "Adam", email:"adam@yahoo.in", age:48});
// user1.save();

// const user2 = new User({ name:"Eve", email:"eve@yahoo.in", age:48});
// user2.save().then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });

// User.insertMany([
//     {name:"Tony", email:"tony@gmail.com", age:50},
//     {name:"Peter", email:"peter@gmail.com", age:30},
//     {name:"Bruce", email:"bruce@gmail.com", age:47},
// ]).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });

// User.find().then((data) => {
//     console.log(data);
// }).catch(err => {console.log(err)});


User.findOne({ age : {$gt:47}}).then((data) => {
    // console.log(data);
}).catch(err => {console.log(err)});


User.findById('6798e27ccdfade09f4da9aee').then((data) => {
    // console.log(data);
}).catch(err => {console.log(err)});

// User.updateOne({name: "Bruce"}, {age: 55}).then((res) => {
//     console.log(res);
// }).catch((err) => console.log(err));

// User.findOne({name : "Bruce"}).then((data) => {
//     console.log(data);
// }).catch(err => {console.log(err)});

// User.updateMany({age : {$gt : 48}}, {age: 55}).then((res) => {
//     console.log(res);
// }).catch((err) => console.log(err));

// FindOne and UpdateOne 
// User.findOneAndUpdate({name:"Bruce"}, {age:35}).then((res) => {
//     console.log(res);
// }).catch((err) => console.log(err));
// -- it will show old value not updated one to get that use option called new
// User.findOneAndUpdate({name:"Bruce"}, {age:42}, {new: true}).then((res) => {
//     console.log(res);
// }).catch((err) => console.log(err));


// FindById and update
// User.findByIdAndUpdate('6798e3d870d9558c4b7eda35', {age:60}, {new:true}).then((res) => {
//     console.log(res);
// }).catch((err) => console.log(err));


// // DeleteOne()
// User.deleteOne({name: "Bruce"}).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });

// // DeleteMany()
// User.deleteMany({age:{$lt:56}}).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// })