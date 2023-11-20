"use strict";

console.log("Black Jack")

/*
    Back Jack es un juego por turnos en el que cada jugador
    debe sumar 21 puntos utilizando el valor
    nominal de hasta 4 cartas de una baraja de póker. 
    
    Gana el jugador que llegue a 21 puntos o se acerque más

    Pierde el jugador que haga menos puntos o sobrepase los 21
*/

/*
    El código debe permitir crear un nuevo juego: 
        -eliminar todas las cartas
        -poner los marcadores a 0
        -empezar en el turno del jugador

    El código debe permitir añadir una carta o detener el turno

    El código debe marcar como ganador al jugador que haga 21

    El código debe marcar como perdedor al jugador que haga menos de 21
    habiendo terminado los dos turnos o que haya sobrepasado los 21 en su turno
*/

let cartasJugador = [];
let puntosJugador = 0;
let turnoJugador = true;
let turnoCasino = true;
let cartasCasino = []; 
let puntosCasino = 0;
const puntuacionJugador = document.getElementById("puntuacionJugador");
const puntuacionCasino = document.getElementById("puntuacionCasino");
const btnNuevoJuego = document.getElementById('btn-newGame');
const btnPedirCarta = document.getElementById('btn-getCard');
const btnDetener = document.getElementById('btn-stop');
const cartaJugador = document.getElementById('player-cards');
const cartaCasino = document.getElementById('casino-cards');
const baraja = [
    {name: "C2", value: 2},{name: "C3", value: 3},{name: "C4", value: 4},{name: "C5", value: 5},{name: "C6", value: 6},{name: "C7", value: 7},{name: "C8", value: 8},
    {name: "C9", value: 9},{name: "C10", value: 10},{name: "CJ", value: 10}, {name: "CQ", value: 10}, {name: "CK", value: 10}, {name: "CA", value: 11}, 
    {name: "P2", value: 2},{name: "P3", value: 2},{name: "P4", value: 4},{name: "P5", value: 5}, {name: "P6", value: 6},{name: "P7", value: 7},{name: "P8", value: 8},
    {name: "P9", value: 9},{name: "P10", value: 10},{name: "PJ", value: 10},{name: "PQ", value: 10},{name: "PK", value: 10}, {name: "PA", value: 11}, 
    {name: "T2", value: 2},{name: "T3", value: 2},{name: "T4", value: 4}, {name: "T5", value: 5}, {name: "T6", value: 6},{name: "T7", value: 7},{name: "T8", value: 8},
    {name: "T9", value: 9},{name: "T10", value: 10},{name: "TJ", value: 10},{name: "TQ", value: 10},{name: "TK", value: 10},{name: "TA", value: 11},
    {name: "D2", value: 2},{name: "D3", value: 2},{name: "D4", value: 4},{name: "D5", value: 5}, {name: "D6", value: 6},{name: "D7", value: 7},{name: "D8", value: 8},
    {name: "D9", value: 9},{name: "D10", value: 10},{name: "DJ", value: 10}, {name: "DQ", value: 10}, {name: "DK", value: 10}, {name: "DA", value: 11},  
 ];


function nuevoJuego() {
    turnoJugador = true;
    turnoCasino = true;
    cartasJugador = [];
    cartasCasino = [];
    puntosJugador = 0;
    puntosCasino = 0;
    puntuacionJugador.textContent = `${puntosJugador}`;
    puntuacionCasino.textContent = `${puntosCasino}`;
    cartaJugador.innerHTML = ``;
    cartaCasino.innerHTML = ``;
}

function juegoCasino() {
    while (turnoCasino === true) {
        for(let i = 0; i <= 4; i++) {
            cartasCasino.push(pedirCarta());
            puntosCasino += cartasCasino[cartasCasino.length - 1].value;
            puntuacionCasino.textContent = `${puntosCasino}`;
            cartaCasino.innerHTML += `
                <li><img id="card-image" class="game-card" src="assets/img/${cartasCasino[cartasCasino.length - 1].name}.png" alt=""></img></li>
            `;
            if(puntosCasino > 22) {
                break;
            }
        }
        turnoCasino = false; 
        if (puntosCasino == 21){
            alert('GANA EL CASINO');
        }
        else if (puntosCasino < 21 && puntosCasino > puntosJugador) {
            alert('GANA EL CASINO')
        }
        else if (puntosCasino < puntosJugador) {
            alert('GANA EL CASINO');
        }
        else if (puntosCasino > 21 && puntosJugador < 21) {
            alert('GANA EL JUGADOR');
        }
        else {
            alert('JUGADOR Y CASINO EMPATAN')
        }
    } 
}

function pedirCarta() {
    let posicion = Math.floor(Math.random() * baraja.length);
    let carta = baraja[posicion];
    return carta;
}

function detener() {
    return turnoJugador = false;
}

btnNuevoJuego.onclick = function() {
    nuevoJuego();
};

btnPedirCarta.onclick = function() {
    if (cartasJugador.length <= 4 && puntosJugador < 21 && turnoJugador) {
        cartasJugador.push(pedirCarta());
        puntosJugador += cartasJugador[cartasJugador.length - 1].value;
        puntuacionJugador.textContent = `${puntosJugador}`;
        cartaJugador.innerHTML += `
            <li><img id="card-image" class="game-card" src="assets/img/${cartasJugador[cartasJugador.length - 1].name}.png" alt=""></img></li>
        `;
        if(cartasJugador.length <= 4 && puntosJugador === 21) {
            alert('GANA EL JUGADOR');
            turnoCasino = false;
        }
        else if(cartasJugador.length <= 4 && puntosJugador > 21) {
            alert('GANA EL CASINO');
        }
        else if(cartasJugador.length === 4 && puntosJugador < 21) {
            detener();
            juegoCasino();
        }
    }
}

btnDetener.onclick = function() {
    detener();
    juegoCasino();
}









