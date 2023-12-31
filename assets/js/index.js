
(()=> {
    "use strict";

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
                if(puntosCasino >= 21 || puntosCasino > 15) {
                    break;
                }
            }
            turnoCasino = false; 
            setTimeout(()=>{
                if (puntosCasino <= 21 && puntosCasino > puntosJugador) {
                    alert('GANA EL CASINO');
                    nuevoJuego()
                }
                else if (puntosCasino < puntosJugador) {
                    alert('GANA EL JUGADOR');
                    nuevoJuego()
                }
                else if (puntosCasino > 21 && puntosJugador < 21) {
                    alert('GANA EL JUGADOR');
                    nuevoJuego()
                }
                else if(puntosJugador > puntosCasino) {
                    alert('GANA EL JUGADOR');
                    nuevoJuego()
                }
                else {
                    alert('JUGADOR Y CASINO EMPATAN');
                    nuevoJuego()
                }
            }, 100)    
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
            setTimeout(()=>{
                if(cartasJugador.length <= 4 && puntosJugador === 21) {
                    alert('GANA EL JUGADOR');
                    nuevoJuego();
                }
                else if(cartasJugador.length <= 4 && puntosJugador > 21) {
                    alert('GANA EL CASINO');
                    nuevoJuego();
                }
                else if(cartasJugador.length === 4 && puntosJugador < 21) {
                    detener();
                    juegoCasino();
                }
            }, 100) 
        }
    }

    btnDetener.onclick = function() {
        detener();
        juegoCasino();
    }
})();











