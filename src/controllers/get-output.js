const { VM } = require("vm2");
const fs = require("fs");
const { exec } = require("child_process");
const { fetchError, pythonLimiter } = require("./utils");


function JavaScriptManager(req, res, next){

    let  { input } = req.body;
    try {
        let output = [];
        const vm = new VM({
            console:'inherit',
            timeout:3000,
            allowAsync:true,
            wasm:false,
            allowAsync:false,
            sandbox:{
                console:{
                    log:(msg) => output.push(msg)
                }
            },
            require:{
                external:true,
                root:"./exec/"
            }
        })
        vm.run(input);
        res.json({output:output.join('\n')})
    }catch (e) {
        res.status(400).json({error:`${e.name}: ${e.message}`})
    }
}

 function PythonManager(req, res, next) {
    let  { input } = req.body;

    try {
        if(input.includes("subprocess")) throw "Attempted to access unallowed ressource:subprocess";
        
        fs.writeFile("./exec/main.py",pythonLimiter.limiter +"\n" + input ,(err)=>{
            if(!err){
                let output = [];
        
                const vm = new VM({
                    console:'inherit',
                    timeout:3000,
                    allowAsync:true,
                    wasm:false,
                    allowAsync:false,
                    sandbox:{ 
                        exec,getOutput:(msg)=>{output.push(msg)}
                     },
                    require:{
                        external:true,
                        root:"./exec/",
                        builtin:["child_process"]
                    }
                })
                
                try {
                    vm.run(`
                        getOutput(exec("python3 ./exec/main.py " ,{ encoding:"utf-8"}))    `
                     );
                     res.json({output});
                } catch (error) {
                    if(error.stderr){
                        res.status(400).json({ error: fetchError(error.stderr)});
                    }else{
                        res.status(400).json({ error: (error.message)});
                        
                    }
                }
            }
        });
        
    } catch (err) {
            res.status(400).json({ error:err });
    }

}


function CppManager (req, res, next){

    let  { input,option = "c"} = req.body;
    
    fs.writeFile("./exec/main.c", input ,(err)=>{
        if(!err){
            let output = [];
    
            const vm = new VM({
                console:'inherit',
                timeout:3000,
                allowAsync:true,
                wasm:false,
                allowAsync:false,
                sandbox:{ 
                    execSync,getOutput:(msg)=>{output.push(msg)}
                 },
                require:{
                    external:true,
                    root:"./exec/",
                    builtin:["child_process"]
                }
            })
            
            try {
                let compiler = option === "c" ? "gcc":"g++" ;
                

                vm.run(`
                    getOutput(execSync("${compiler} ./exec/main.c -o ./exec/main && ./exec/main" ,{ encoding:"utf-8"}))    `
                 );
                 res.json({output});
            } catch (error) {
                if(error.stderr){
                    res.status(400).json({ error: fetchError(error.stderr)});
                }else{
                    res.status(400).json({ error: (error.message)});
                    
                }
            }
        }
    }

    )
}


/*

-- security 
-- c/cpp timeout
-- performance with async programm and threads workers
 */

module.exports = { JavaScriptManager ,PythonManager, CppManager}

