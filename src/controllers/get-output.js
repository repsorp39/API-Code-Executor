const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const  { v4:uuid } = require("uuid");

function CompilerManagement(req, res, next){

    const { lang, input } = req.body;
    const availableLanguages = ["py","js","c","cpp"];

    if(!availableLanguages.includes(lang?.toLowerCase())){
        return res.status(400).json({message:`${lang} is not supported`});
    }

    if(!input){
        return res.status(400).json({message:`Input is required!`});
      }

   const userId = req.userId;
   const filename = !userId ? `${uuid()}-tmp.${lang}`: `${userId}.${lang}`;
   const filePath = path.join(__dirname, "..", "public", filename);
   const compiler = lang === "py" ? "python" : lang === "js" ? "node" : lang;

    fs.writeFile(filePath, input, (err)=>{
            if(err) {
                res.end();
                console.log(err)
            };
            
            const cmd = `timeout 6s docker run  --rm  -v ./src/public:/codesource -e filename=${filename} -e compiler=${compiler}  c_area`;

            exec(cmd, (error, stdout, stderr)=>{

                if(error){

                    
                    res.sendStatus(500)
                }

                if(stdout){
                    res.status(200).json({output:stdout});
                }

                if(filename.includes("-tmp")){
                    fs.unlink(filePath,(err)=>{});
                }
            })
    });
}

module.exports = { CompilerManagement }

