const mongoose = require("mongoose");
const {Schema} = mongoose;

main().then(() => console.log("db connected successful")).catch((err) => console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/RelationDemo");
}

const userSchema = new Schema({
    username: String,
    email: String,
});

const postSchema = new Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const addData = async() => {
    let user1 = new User({
        username: "shivamsingh",
        email: "shivam@gmail.com",
    });
    let post1 = new Post({
        content: "Hello, World!",
        likes: 100,
    });
    post1.user = user1;
    await user1.save();
    let result = await post1.save();
    console.log(result);
};
// addData();

const newData = async() => {
    let user1 = await User.findOne({username:"shivamsingh"});
    let post2 = new Post({
        content: "Bye Bye",
        likes: 50,
    });
    post2.user = user1;
    let result = await post2.save();
    console.log(result);
};
// newData();

const showData = async() =>{
    let result = await Post.find({}).populate("user", "username");
    console.log(result);
};
showData();