const express = require("express");
const mongoose = require("mongoose");
const userSchema = require("./userSchema");
const cors = require("cors");
require('dotenv').config();

const app = express();
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 8000;

const router = require("./Routes/Index");

app.use(express.json());
app.use(cors());
const middleware = require("./middleware");

mongoose.connect("mongodb+srv://vamsinayak:vamsig@cluster0.2d8evoi.mongodb.net/?retryWrites=true&w=majority").then(
    () => console.log("DB connected")
);

app.use("/api",router);

app.get('/data', (req, res) => {
    // Create a JWT token using the TOKEN_SECRET environment variable
    const token = jwt.sign({ userId: 1 }, ""+process.env.TOKEN_SECRET);
  
    res.send(token);
  });

app.post("/login", async(req,res) => {
    try{        
        if ('signup' === req.body.formType) {
            const { username, email, password} = req.body;
            const exist = await userSchema.findOne({email})
            if(exist){
                return res.send("User already exists");
            } 
            let newUser = new userSchema({
                username, email, password
            })
            newUser.save();
            return res.status(200).send("Registered Successfully",);
        } else {
            const { email, password} = req.body;
            const exist = await userSchema.findOne({email});
            if(!exist){
                return res.status(400).send("User not exists..please register");
            }
            if(password !== exist.password){
                return res.status(400).send("Invalid password");
            }
            const token = jwt.sign(
                { userId: exist._id },
                ""+process.env.TOKEN_SECRET,
                { expiresIn: '1h' }
            );
            return res.status(200).json(token);
        } 
    }
    catch(err){
        console.log(err);
        return err;
    }
})


app.get("/user", middleware, async (req,res) => {
    try{
        const id = req.userData.userId;
        const user = await userSchema.findOne({ _id: id });
        res.status(200).send({user})
    }
    catch(err){
        res.status(400).send("You are not logged in");
    }
})

app.listen(PORT,()=> console.log("server running.."));