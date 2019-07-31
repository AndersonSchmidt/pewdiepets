const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const Pet = require('./models/pet.js');
require('dotenv').config();

pets = [
    {
      id: 1,
      name: 'Joergen',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      status: 'Dead',
      image: 'https://vignette.wikia.nocookie.net/pewdiepieminecraft/images/3/39/J%C3%B8rgan.PNG'
    },
    {
      id: 2,
      name: 'Watersheep',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      status: 'Dead',
      image: 'https://www.pngkey.com/png/detail/808-8084390_even-the-sheep-follows-the-rules-although-its.png'
    },
    {
      id: 3,
      name: 'Virgin Turtle',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      status: 'Alive',
      image: 'https://res.cloudinary.com/lmn/image/upload/c_limit,h_360,w_640/e_sharpen:100/f_auto,fl_lossy,q_auto/v1/gameskinnyc/t/u/r/turtle-baby-turtle-ea1cf.png'
    },
    {
      id: 4,
      name: 'Ikea Bird',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      status: 'Alive',
      image: 'https://gamepedia.cursecdn.com/minecraft_br_gamepedia/thumb/0/02/Parrot_yellow_blue.png/150px-Parrot_yellow_blue.png?version=57cfc87e0410dce6e8a6acedde19513c'
    },
    {
      id: 5,
      name: 'Sven',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      status: 'Alive',
      image: 'https://vignette.wikia.nocookie.net/pewdiepieminecraft/images/c/c5/Sven_blue_collar.jpg/revision/latest?cb=20190708145024'
    },
    {
      id: 6,
      name: 'Boat Cow',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      status: 'Dead',
      image: '/images\1564590294611-200px-Wolf_%28Tamed%29.png'
    }
  ];

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
    res.json(pets);
});

app.get("/api/pets/:id", (req, res) => {
    let pet = pets.filter((pet) => {
        return pet.id === +req.params.id;
    })[0];

    res.json(pet);
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