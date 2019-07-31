const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const Pet = require('./models/pet.js');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb+srv://anderson:'+ process.env.MONGO_ATLAS_PW +'@cluster0-l3zqp.mongodb.net/pewdiepets?retryWrites=true&w=majority', {useNewUrlParser: true})
.then(() => {
  console.log('Connected to the database');
}).catch((err) => {
  console.log('Connection failed! ' + err);
});

app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

app.get("/api/pets", (req, res) => {
  Pet.find().then(pets => {
    res.status(200).json(pets);
  });
});

app.get("/api/pets/:id", (req, res) => {
  console.log(req.params.id);
  Pet.findById(req.params.id).then(pet => {
    res.status(200).json(pet);
  });
});

app.post("/api/pets", multer({storage: storage}).single('image'), (req, res) => {
  const pet = new Pet({
    name: req.body.name,
    description: req.body.description,
    funfact: req.body.funfact,
    birth: req.body.birh,
    death: req.body.death,
    status: req.body.status,
    image: req.protocol + '://' + req.get("host") + '/images/' + req.file.filename
  });
  
  Pet.create(pet, (err, pet) => {
    if(err){
      console.log(err);
    }else{
      res.status(201);
    }
  });
});


app.listen('3000', () => {
    console.log("API is running");
});