// Luo taulukon elokuvista
function readMovie(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/movies",true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    const movies = JSON.parse(xmlhttp.responseText); 
     // Luodaan taulukko, jossa elokuvat näytetään
     let table = document.createElement('table');
     // Silmukka elokuvien läpikäymiseen
     for (let i = 0; i < movies.length; i++) {
      // Luo taulukkorivin
      let newRow = document.createElement('tr');
      // Luo solut title, release, lenght, director, stars, writers, plot, budget ja imdb-kentille
      // Käyttää funktiota createCell
      newRow.appendChild(createCell(movies[i].title));
      newRow.appendChild(createCell(movies[i].release));
      newRow.appendChild(createCell(movies[i].lenght));
      newRow.appendChild(createCell(movies[i].director));
      newRow.appendChild(createCell(movies[i].stars));
      newRow.appendChild(createCell(movies[i].writers));
      newRow.appendChild(createCell(movies[i].plot));
      newRow.appendChild(createCell(movies[i].budget));
      newRow.appendChild(createCell(movies[i].imdb));
      //Luodaan päivitä-painike
      newRow.appendChild(createForm(movies[i], 'update'));
      //Luodaan poista-painike
      newRow.appendChild(createForm(movies[i], 'delete'));
      table.appendChild(newRow);
     }
     document.getElementById("demo").appendChild(table);

        }
    }
// Taulukon luonnissa kutsutaan funktiota, ettei tarvi kirjoittaa auki jokaiseen solun luontiin erikseen.
function createCell(value) {
  let newCell = document.createElement('td');
  newCell.innerHTML = value;
  return newCell;
}
    }
    readMovie();

// Luo päivitys, lisäys ja poistoformit
function createForm(movie, action) {
  let newCell = document.createElement('td');
  let form = document.createElement('form');
  form.method = (action == 'delete') ? 'POST' : 'GET';
  // Ternääri (ternatry) operaatio, ensimmäinen vaihtoehto true ja jälkimmäinen false. Vertaa IF
  form.action = (action == 'delete') ? '/deleteMovie' : '/updateMovie.html';
  //Lisää piilokenttä id:lle
  let input = document.createElement('input');
  input.value = movie._id;
  input.type = 'hidden'
  input.name = '_id'
  form.appendChild(input);
  // Jos update -> lisää lomakkeelle muutkin tiedot
  // lisätään elokuvan nimi
  input = document.createElement('input');
  input.value = movie.title;
  input.type = 'hidden' //palataan
  input.name = 'title'
  form.appendChild(input);
  // lisätään julkaisuvuosi
  input = document.createElement('input');
  input.value = movie.release;
  input.type = 'hidden'
  input.name = 'release'
  form.appendChild(input);
  // lisätään kesto
  input = document.createElement('input');
  input.value = movie.lenght;
  input.type = 'hidden'
  input.name = 'lenght'
  form.appendChild(input);
   // lisätään ohjaajan nimi
   input = document.createElement('input');
   input.value = movie.director;
   input.type = 'hidden' //palataan
   input.name = 'director'
   form.appendChild(input);
   // lisätään pääroleissa olevien nimet
   input = document.createElement('input');
   input.value = movie.stars;
   input.type = 'hidden'
   input.name = 'stars'
   form.appendChild(input);
   // lisätään käsikirjoittajien nimet
   input = document.createElement('input');
   input.value = movie.writers;
   input.type = 'hidden'
   input.name = 'writers'
   form.appendChild(input); 
   // lisätään juoni
   input = document.createElement('input');
   input.value = movie.plot;
   input.type = 'hidden' 
   input.name = 'plot'
   form.appendChild(input);
   // lisätään budjetti
   input = document.createElement('input');
   input.value = movie.budget;
   input.type = 'hidden'
   input.name = 'budget'
   form.appendChild(input);
   // lisätään imdb arvosana
   input = document.createElement('input');
   input.value = movie.imdb;
   input.type = 'hidden'
   input.name = 'imdb'
   form.appendChild(input);
  // Lisää painike
  input = document.createElement('input');
  input.type = 'submit';
  input.value = (action == 'delete') ? 'Delete movie' : 'Update movie';
  form.appendChild(input)
  newCell.appendChild(form);
  return newCell;

}