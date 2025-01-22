// function PersonMaker(name, age){
//     const person = {
//         name : name,
//         age: age,
//         talk() {
//             console.log(`Hi, my name is ${this.name}`);
//         },
//     };
//     return person;
// }

// let p1 = PersonMaker("adam", 25);
// console.log(p1);
// let p2 = PersonMaker("eve", 25);
// console.log(p2.talk());
// console.log(p1.talk === p2.talk);  // false b/c for every person it is taking d/f memory locations

// Constructors -- doesn't return anything & start with capital
// function Person(name, age){
//     this.name = name;
//     this.age = age;
//     // console.log(this);
// }

// Person.prototype.talk = function(){
//     console.log(`Hi, i am ${this.name}`);
// }

// let p1 = new Person("adam", 25);
// let p2 = new Person("eve", 25);
// now
// console.log(p1.talk === p2.talk);  // true


// Classes - template for creating objects
class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    talk() {
        console.log(`Hi, my name is ${this.name}`);
    }
}

let person1 = new Person("Shivam", 21);
let person2 = new Person("Rahul", 23);
console.log(person1.talk === person2.talk);  // true
