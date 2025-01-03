// Module.exports

// require() - a build-in function to include external modules that exist in separate files.
// module.eports - a special object

const sum = (a,b) => a+b;
const mul = (a,b) => a*b;
const g = 9.8;
const PI = 3.14;

// module.exports = "hello";

// let obj = {
//     "sum": sum,
//     "mul": mul,
//     "g": g,
//     "PI": PI
// };
// module.exports = obj;

module.exports = {
    "sum": sum,
    "mul": mul,
    "g": g,
    "PI": PI
};
