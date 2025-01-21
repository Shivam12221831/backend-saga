class Person{
    constructor(name, age){
        console.log("person class constructor");
        this.name =name;
        this.age = age;
    }
    talk(){
        console.log(`Hi, my name is ${this.name}`);
    }
}

class Student extends Person{
    constructor(name, age, marks){
        console.log("student class constructor");
        super(name, age);
        this.marks = marks;
    }
}

class Teacher extends Person{
    constructor(name, age, subject){
        console.log("teacher class constructor");
        super(name, age);
        this.subject = subject;
    }
}

let s1 = new Student("shivam", 21, 99);
let t1 = new Teacher("Jaspreet", 28, "English");
console.log(s1.talk === t1.talk)  // true

class Mammel{
    constructor(name){
        this.name = name;
        this.type = "warm-blooded";
    }
    eat(){
        console.log("I am eating");
    }
}

class Dog extends Mammel{
    constructor(name){
        super(name);
    }
    bark(){
        console.log("wooff!...");
    }
    eat(){  // this will get higher preference over baseClass eat()
        console.log("Dog is eating");
    }
}

class Cat extends Mammel{
    constructor(name){
        super(name);
    }
    meow(){
        console.log("meow!....");
    }
}

