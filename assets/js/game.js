/**
 * 2C = Tow of Clubs (Treboles)
 * 2D = Tow of Diamonds (Diamantes)
 * 2H = Tow of Hearts (Corazones) 
 * 2S = Tow of Spades (Espadas)
*/

const miModulo = (() => {
    'use strict';

    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
        special = ['A','J', 'Q', 'K'];
    
    let puntosJugadores = [];

    const btnPedir  = document.querySelector('#btnPedir'),
        btnDetener  = document.querySelector('#btnDetener'),
        btnNuevo    = document.querySelector('#btnNuevo');

    const puntosHtml         = document.querySelectorAll('small'),
        divCartasJugadores     = document.querySelectorAll('.divCartas');
        
        // La funcion Encargada de crear un nuevo deck
    const crearDeck = () =>{
        deck = [];
        
        for( let i = 2; i <= 10; i++ ){
            for(let type of types){
                deck.push( i + type );
            }
        }
            
        for( let type of types){
            for( let spc of special){
                deck.push( spc + type );
            }
        }
            
        return _.shuffle( deck );
    }
        
        // Funcion encargada de inicializar el Juago
    const inicializarJuego = (numJugadores = 2) =>{
        deck = crearDeck();
        puntosJugadores = [];
        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

        puntosHtml.forEach(elem  => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = ``);

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }
    // Esta funcion me permite tomar una carta
    const pedirCarta = () =>{

        if(deck.length === 0){
            throw 'No hay cartas en el deck';
        }
        return deck.pop(); // Carta de la baraja
    }

    // pedirCarta();

    // Permite validad el valor de la carta 
    const valorCarta = ( carta ) =>{
        const value = carta.substring(0, carta.length - 1);

        return (isNaN( value )) ? 
                (value === 'A') ? 11 : 10
                : value * 1;
    }

    // Turno: = Primer jugador y el ultimo sera la computadora
    const acumularPuntos = (carta, turno) =>{
        
        puntosJugadores[turno] += valorCarta(carta);  
        puntosHtml[turno].innerText = puntosJugadores[turno];
        
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) =>{
        const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () =>{

        const [puntosMinimos, puntosComputadora ] = puntosJugadores;
        setTimeout(() =>{
            if( (puntosComputadora === puntosMinimos) || ( puntosMinimos > 21 ) ) {
                alert('La Casa Gana');
            }else if (puntosMinimos === 21){
                alert('Genial Ganaste');
            } else{
                alert('Genial Ganaste');
            }
        }, 100.0);
    }

    // Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) =>{
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            // Inserta las cartas en el HTML
            crearCarta(carta, puntosJugadores.length - 1);

        } while ( ( puntosComputadora < puntosMinimos ) && ( puntosMinimos <= 21 ) );

        determinarGanador();
    }

    // Eventos funcion
    btnPedir.addEventListener('click', () =>{
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos (carta, 0);
        // Inserta las cartas en el HTML
        crearCarta(carta, 0);

        if ( puntosJugador > 21 ){
            console.warn('Lo siento, Usted Perdio');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        }else if( puntosJugador === 21){
            console.warn('21 Cool');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
        }
    });

    // Evento de detener el turno del juegador
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });



    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });

    return {
        nuevoJuego:inicializarJuego 
    }
})();
