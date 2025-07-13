const express = require("express");
const app = express();
const dbUrl= 'mongodb+srv://bonigalaabhishek:67FTGd3s2CKky1vN@cluster0.yegtxr0.mongodb.net/ecommerse?retryWrites=true&w=majority&appName=Cluster0';
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes');
app.use(express.json());
app.use('/api/users',userRoutes)

mongoose.connect(dbUrl).then(()=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log(err)
});

app.listen(8081,()=>{
    console.log("Server is connected")
})