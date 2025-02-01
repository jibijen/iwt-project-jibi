const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const bodyParser= require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});

console.log(__dirname + '/public/index.html');

mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(() => {
    console.log(`mongo db connected`)
})

const Schema = mongoose.Schema;

const dataschema = new Schema({
    name: String,         // User's full name. Correct.
    id: String,           // Unique identifier for the user. Correct.
    password: String,     // User's password. Correct.
    email: String,        // User's email address. Correct.
    age: Number,          // User's age. Correct.
    gender: String,       // User's gender (e.g., Male, Female, Other). Correct.
    address: String,      // User's address. Correct.
    branch: String,       // User's branch (e.g., CSE, ECE). Correct.
    skills: [String],     // Array of skills (e.g., ['JavaScript', 'Python']). Correct.
    resume: String,       // File path or name for the uploaded resume. Correct.
    photo: String 
    
});

const Data = mongoose.model('Data', dataschema);

app.post('/register', (req, res) => {
    const { name, id, password, email, age, gender, address, branch, skills } = req.body;
    console.log(req.body);
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
        
    });
    newData.save();
})

app.listen(port, () => {
    console.log(`server is running at port ${port}`);
})