const express = require("express");
const morgan = require("morgan");


const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//routes

app.use("/api/code/" ,require("./routes/code-router"));


app.use((err,req,res,next)=>{
    if(err.name === "SyntaxError"){
        res.status(400).json({error:"Bad escaped character"})
    }
    console.error(err); 
});


module.exports = app;

