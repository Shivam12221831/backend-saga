const mongoose = require("mongoose");
const {Schema} = mongoose;

main().then(() => console.log("db connected successful")).catch((err) => console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/RelationDemo");
}

const orderSchema = new mongoose.Schema({
    item : String,
    price : Number,
});

const customerSchema = new Schema({
    name : String,
    orders : [
        {
            type: Schema.Types.ObjectId,    // read mongoose docs -> populate section to know more
            ref: "Order",
        },
    ],
});

// customerSchema.pre("findOneAndDelete", async() => {
//     console.log("PRE middleware");
// });

customerSchema.post("findOneAndDelete", async(customer) => {
    // console.log("POST middleware");
    if(customer.orders.length){
        let res = await Order.deleteMany({ _id : {$in : customer.orders}});
        console.log(res);
    };
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

// const addOrder = async () => {
//     let result = await Order.insertMany([
//         { item: "Samosa", price:12 },
//         { item: "Chips", price: 20 },
//         { item: "Chocolate", price: 60 },
//     ]);
//     console.log(result);
// };
// addOrder();

// const addCustomer = async () => {
//     let customer1 = new Customer({
//         name : "Rahul Kumar",
//     });
//     let order1 = await Order.findOne({item:"Chips"});
//     let order2 = await Order.findOne({item:"Chocolate"});
//     customer1.orders.push(order1);   
//     // Even we pushing whole obj order1 but if we see on mongosh and we find that only orderId is there in array of orders // This all b/c of type that we defined in customer schema
//     customer1.orders.push(order2);

//     let result = await customer1.save();
//     console.log(result);
// };

// addCustomer();

// Populate() in mongoose
// Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s). We may populate a single document, multiple documents, a plain object, multiple plain objects, or all objects returned from a query.
// we have save our orders in customers as ref ids. So, if we want to get whole docs not only ids their then we make use of .populate("field_name");
const findCustomer = async() => {
    let result = await Customer.find({}).populate("orders");
    console.log(result[0]);
}
// findCustomer();

// Handling Deletion 
const addCustomer = async() => {
    let cust1 = new Customer({
        name : "puneetkumar",
    });
    let order1 = new Order({
        item: "Burger",
        price: 100,
    });
    let order2 = new Order({
        item: "Protein-Bar",
        price: "150",
    });
    cust1.orders.push(order1);
    cust1.orders.push(order2);

    await cust1.save();
    await order1.save();
    await order2.save();

    console.log("data added successfully");
};

// addCustomer();

const delCustomer = async() => {
    let delData = await Customer.findByIdAndDelete('67ab57cdca26920fcd973f8d');
    console.log(delData);
};
delCustomer();

// --- In above scenario if we delete customer data but its related order will be there in order collection.
// --- So, to remove this also to make consistency of data, we can mongoose middlewares
// Mongoose middlewares - There are two 2 middleware
// Pre - run before the query is executed
// Post - run after the query is executed

