import express from "express";
import router from "./router/index.js";
import bodyParser from "body-parser";
const app=express()

app.use(bodyParser.json())
app.use(router)

app.listen(3000,()=>{
    console.log("app listening at port 3000");
})