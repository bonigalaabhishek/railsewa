const express = require("express");
const app = express();
const dbUrl= 'mongodb+srv://bonigalaabhishek:67FTGd3s2CKky1vN@cluster0.yegtxr0.mongodb.net/ecommerse?retryWrites=true&w=majority&appName=Cluster0';
const mongoose = require("mongoose");
app.use(express.json());

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
},{timestamps:true});

const productModel = mongoose.model("products",productSchema);
app.get("/api/products",async(req,res)=>{
    let products = await productModel.find();
    res.json(products)
})
mongoose.connect(dbUrl).then(()=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log(err)
});

app.listen(8081,()=>{
    console.log("Server is connected")
})