const express = require('express')
const mongoose = require('mongoose')
const path = require('path');

const app = express();

const port = 5000;

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

console.log(__dirname + '/public/index.html');

mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(() => {
    console.log(`mongo db connected`)
})

const Schema = mongoose.Schema;

const dataschema = new Schema({
    name: String,
    id: String,
    password: String,
    email: String,
    age: Number,
    gender: String,
    address: String,
    branch: String,
    skills: [String],
    resume: String,
    photo: String,
    
});

const Data = mongoose.model('Data', dataschema);

app.post('/register', (req, res) => {
    const { name, id, password, email, age, gender, address, branch, skills, resume, photo } = req.body;
    const newData = new Data({
        name,
        id,
        password,
        email,
        age,
        gender,
        address,
        branch,
        skills,
        resume,
        photo,
    });
    newData.save();
})

app.listen(port, () => {
    console.log(`server is running at port ${port}`);
})