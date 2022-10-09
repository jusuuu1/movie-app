//Otetaan Mongoose käytöön
const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const movieSchema = mongoose.Schema;

//Tietokantarakenne
let movie = new movieSchema ( {
    title: {
       type: String
    },
    release: {
      type: String
   },
    lenght: {
      type: String
    },
    director: {
      type: String
    },
    stars: {
      type: String
    },
    writers: {
      type: String
   },
   plot: {
    type: String
 },
 budget: {
  type: String
},
imdb: {
  type: String
}
  },
    { collection: 'movies'}
  )

// Export model, jossa kokoelman ja skeeman nimi
module.exports = mongoose.model('movies', movie);