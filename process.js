// Process -
// process: This object provides info about, and control over, the current Node.js process.
// console.log(process);
console.log(process.version);
console.log(process.release);

// process.argv: returns an array containing the command-line arguments passed when the Node.js process was launched.
console.log(process.argv);
// this array first two elements are reserved for
// 1- executable path of node
// 2- currently running file path
// rest are command-line passed arguments

let args = process.argv;
for(let i=2; i<args.length; i++){
    console.log("hello & welcome ", args[i]);
}
