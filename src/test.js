

console.log("Hello");
setTimeout(()=>{
    console.log("1st TimeOut")
},0);
console.log("How are you");
setImmediate(()=> console.log("This is from Set Immediate"));
console.log("That is nice to know");
setTimeout(()=>{
    console.log("2nd TimeOut")
},1000);


