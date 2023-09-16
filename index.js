//Variables
var jugadas;

var seleccionadas;
var idSelecionada;  

var aciertos;
var movimientos;


//traigo todas las cards
const cards = document.querySelectorAll('.card');

const fondoGris = "/img/gris.webp";
//traigo el botton start para capturar el evento del click
const start = document.querySelector('.button-start');

//declaro una constante con las imagenes para los huequitos
const imagenes = ['/img/frutilla.webp',
                '/img/banana.webp',
                '/img/pera.webp',
                '/img/sandia.webp',
                '/img/uva.webp',
                '/img/manzana.webp',
                '/img/naranja.webp',
                '/img/cereza.webp',
                '/img/frutilla.webp',
                '/img/banana.webp',
                '/img/pera.webp',
                '/img/sandia.webp',
                '/img/uva.webp',
                '/img/manzana.webp',
                '/img/naranja.webp',
                '/img/cereza.webp'];


//Eventos

//evento al cargar la pagina
document.addEventListener('DOMContentLoaded', () => {
    blockeoCards(true);
    mezclarImagenes(imagenes);
    jugadas = 0;

    seleccionadas = ["", ""];
    idSelecionadas = ["", ""]  

    aciertos = 0;
    movimientos = 0;

    for(let i = 0; i < imagenes.length ; i++){
        console.log(imagenes[i]);
    }
    
    
})

//start.addEventListener('click', iniciarJuego);

start.addEventListener('click', () => {
    cronometro();
    generacionTablero();
})




//Funciones

//mezcla el orden de las url dentro del array para que cada vez sea un orden distinto
function mezclarImagenes(imagenes) {
    for (let i = imagenes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imagenes[i], imagenes[j]] = [imagenes[j], imagenes[i]];
    }
}

function iniciarJuego(){
    cronometro();
    //prueba();
    //generacionTablero();
}

function cronometro() {
    blockeoCards(false);
    let time = 61;
    start.classList.add('disabled');
    const contador = setInterval(() => {

        time--;
        Tiempo.innerHTML = time;

        if (time == 0) {
            clearInterval(contador);
            alert('Se te acabo el tiempo')
            location.reload();
        }

    }, 1000);
}

//activa o desactiva el clikeo en las cards segun si ya empezo o no el juego 
function blockeoCards(valor) {
    for (let i = 0; i < cards.length; i++) {
        cards[i].disabled = valor;
    }
}

//le coloca a cada card una imagen de fondo 
function generacionTablero() {
    cards.forEach((button, index) => {
        button.style.backgroundImage = `url('${fondoGris}')`;
    } );
}



function destapar(id){
    
    cards[id].style.backgroundImage = `url('${imagenes[id]}')`

    jugadas++;
    seleccionadas[jugadas - 1] = imagenes[id];
    idSelecionadas[jugadas - 1] = id;
    
        if(jugadas == 2){
            if(seleccionadas[0] == seleccionadas[1]){
                aciertos++;
                contador_aciertos.innerHTML = aciertos;
            }else{
                blockeoCards(true);
                setTimeout(function() {
                    blockeoCards(false);
                    cards[idSelecionadas[0]].style.backgroundImage = `url('${fondoGris}')` ;
                    cards[idSelecionadas[1]].style.backgroundImage =  `url('${fondoGris}')`;
                } , 850);
            }
            jugadas = 0;
            movimientos++;
            contador_movimientos.innerHTML = movimientos;
            if (aciertos == 8){
                setTimeout(function() {
                    alert('HAS GANADO');
                    location.reload();
                })
            }
        }
}


