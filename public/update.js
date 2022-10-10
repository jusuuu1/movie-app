// päivitysfunktio
document.body.onload = function() {
    document.getElementById('_id').value = getParam('_id'); 
    document.getElementById('title').value = getParam('title'); 
    document.getElementById('release').value = getParam('release');
    document.getElementById('lenght').value = getParam('lenght');
    document.getElementById('director').value = getParam('director');
    document.getElementById('stars').value = getParam('stars');
    document.getElementById('writers').value = getParam('writers');
    document.getElementById('plot').value = getParam('plot');
    document.getElementById('budget').value = getParam('budget');
    document.getElementById('imdb').value = getParam('imdb');
} 
function getParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}