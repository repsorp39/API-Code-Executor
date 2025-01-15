const express = require("express");
const morgan = require("morgan");


const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//routes

app.use("/api/code/" ,require("./routes/code-router"));


app.use((err,req,res,next)=>{
    res.sendStatus(500);
    console.error(err); 
});


module.exports = app;

