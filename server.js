// Ota express käyttöön
const express =  require('express');
const app = express();

// Ota mongoose käyttöön -> tietokantayhteys
const mongoose = require('mongoose');

//Ota movies käyttöön
const movie = require('./movieSchema.js');

//Ota mongodb käyttöön
const mongodb = require('mongodb');

//Ota bodyparser käyttöön lomakkeen käsittelyä varten
const bodyparser = require('body-parser');

//Aseta määritykset express-palvelimelle
//Ota käyttöön public-tiedosto
app.use(express.static('public'));
//Ota käyttöön bodyparser
app.use(bodyparser.urlencoded({extended:false}));

//Muodostetaan tietokantayhteys
// Luo vakio connectionstringille

const uri = 'mongodb+srv://jusu:seamk123@cluster0.dbrx1ls.mongodb.net/MovieDB?retryWrites=true&w=majority'

// Muodostetaan yhteys tietokantaan
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser:true})

// Luodaan vakio tietokantayhteydelle
const db = mongoose.connection
// Näytä ilmoitus, jos yhteys ok
db.once('open', function() {
    console.log('Tietokantayhteys avattu');
})

// Kirjoita get-funktio, req.query toimii nyt
app.get('/movies', function(req,res) {
     // Hae elokuvat tietokannasta
    movie.find(req.query, function( err, result) { //tyhjät {} hakuehdossa tuo kaikki, req.query rajaa hakua
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
    })

// Elokuvan lisäys post-funktio
app.post('/newMovie', function (req, res) {
    //console.log(req.body)
    //Varmistetaan, ettei ole ID:tä ja poistetaan jos on.
    delete req.body._id; 
    //Lisätään collectioniin uusi elokuva
    db.collection('movies').insertOne(req.body);
    res.send('Movie is added with following data: ' + JSON.stringify(req.body)); //req.body on JSON-objekti, joten muutetaan se Stringiksi ennen palautusta.
})

// Poistofunktio
app.post('/deleteMovie', function (req, res) {
    //Poistetaan collectionista elokuva
    db.collection('movies').deleteOne( { _id: new mongodb.ObjectId(req.body._id)}, function( err, result){
        if ( err ) {
            res.send('Error deleting with following data: ' + err);
        } else {
            res.send('Movie is deleted with following id: ' + req.body._id);
        }
    });
   
})

// Päivitysfunktio
app.post('/updateMovie', function(req,res){
    //Päivitetän collectionista elokuva. Kolme parametria: ID, mitä päivitetään ja funktio virheenkäsittelyyn ja palautteeseen.
    db.collection('movies').updateOne({_id:new mongodb.ObjectID(req.body._id)},{$set:{title:req.body.title, author:req.body.author, publisher:req.body.publisher}},function(err,results){
        if ( err ) {
            res.send('Error updating: ' + err);
        } else {
            res.send('Movie is updated with following id: ' + req.body._id + ' and following data: ' + JSON.stringify(req.body) );
        }
    });
   
})


//Laitetaan palvelin kuuntelemaan porttia 8080
const server = app.listen(8080, function(){});