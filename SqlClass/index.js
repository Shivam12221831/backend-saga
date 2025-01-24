const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended : true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// let createRandomUser = () => {
//     return {
//       userId: faker.string.uuid(),
//       username: faker.internet.username(), // before version 9.1.0, use userName()
//       email: faker.internet.email(),
//       avatar: faker.image.avatar(),
//       password: faker.internet.password(),
//       birthdate: faker.date.birthdate(),
//       registeredAt: faker.date.past(),
//     };
//   }

// console.log(createRandomUser());

// create user with these four credentials id, name, email, password

const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    database : "delta_app",
    password : "root",
});

let getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(), // before version 9.1.0, use userName()
        faker.internet.email(),
        faker.internet.password(),
    ];
}

// console.log(getRandomUser());

// GET - / - Fetch and show total number of users on our app
app.get("/", (req, res) => {
    let q = "SELECT Count(*) from user";
    try{
        connection.query(q, (err, result) => {
            if(err) throw err;
            // console.log(result[0]["Count(*)"]);
            let count = result[0]["Count(*)"];
            res.render("home.ejs", {count});
        });
    }catch(err){
        console.log(err);
        res.send("Some error in DB");
    }
})

// Show route
app.get("/user", (req,res) => {
    let q = "SELECT * FROM user";
    try{
        connection.query(q, (err, users) => {
            if(err) throw err;
            // console.log(result);
            res.render("showuser.ejs", { users });
        });
    } catch(err){
        console.log(err);
        res.send("some error is occur");
    }
});

// Edit username
// GET - /user/:id/edit  - to get form to edit username, based on id
// - This form will require a password
// PATCH - /user/:id  - to edit username, if correct password was entered in form

app.get("/user/:id/edit", (req,res) => {
    let { id } = req.params;
    console.log(id);
    let q = "SELECT * FROM user WHERE id=?";
    try{
        connection.query(q, id, (err, result) => {
            if(err) throw err;
            // console.log(result);
            let user = result[0];
            res.render("edit.ejs", { user });
        });
    } catch(err){
        console.log(err);
        res.send("some error occured!");
    }
});

// app.patch("/user/:id", (req,res) => {
//     let { id } = req.params;
//     console.log(id);
//     let user = req.body;
//     let q = `UPDATE user SET name='${user.username}' WHERE password == ${user.password}`;
//     try{
//         connection.query(q, (err, result) => {
//             if(err) throw err;
//             console.log(result);
//         });
//     } catch(err){
//         console.log(error);
//         res.send("You have entered worng password");
//     }
//     // res.send("patch is working fine");
// })

const port = 8080;
app.listen(port, () => {
    console.log(`listening on port : ${port}`);
});

// let q = "SHOW TABLES";

// // Inserting New Data
// let q = "INSERT INTO user (id, name, email, password) VALUES (?, ?, ?, ?)";    // these ? are called placeholders
// let user = ["123a", "123_newusera", "abd@gmail.com", "abca"];

// If you want to add multi rows in your table
// let q = "INSERT INTO user (id, name, email, password) VALUES ?";    // these ? are called placeholders
// let users = [["123b", "123_newuserb", "abd@gmail.comb", "abcb"],
// ["123c", "123_newuserc", "abd@gmail.comc", "abcc"]];

//  Entering data in bulk using faker package
// first truncate user table to add new data
// let q = "INSERT INTO user (id, name, email, password) VALUES ?";    // these ? are called placeholders
// let data = [];
// for(let i=1; i<=100; i++){
//     data.push(getRandomUser());
// }

// try{
//     connection.query(q, [data], (err, result) => {
//         if(err) throw err;
//         console.log(result);
//     })
// } catch(err){
//     console.log(err);
// }

// connection.end();