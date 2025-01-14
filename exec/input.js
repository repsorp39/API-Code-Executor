const { VM } = require("vm2");

const { exec } = require("child_process");


let output = [];
const vm = new VM({
    console:'inherit',
    timeout:3000,
    allowAsync:true,
    wasm:false,
    allowAsync:false,
    sandbox:{ 
        exec, console:{
            log:(msg)=>{
                output.push(msg)
            }
            
        }
     },
     
    require:{
        external:true,
        root:"./exec/",
        builtin:["child_process"]
    }
})

vm.run(`exec('ls /',(error, stdout, stderr) =>{
    console.log(error);
    console.log(stdout);
    console.log(stderr);
})`);

console.log(output);
