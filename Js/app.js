'use strict';
//COntenedor Principal
const contenedor = document.createElement("div");
contenedor.setAttribute("class", "contenedor");
document.body.appendChild(contenedor);
const titulo = document.createElement("h1");
const textoTitulo = document.createTextNode("MatcheADAs");
titulo.appendChild(textoTitulo);
titulo.setAttribute("class", "estiloLetras");
titulo.style.fontSize = "45px";

contenedor.appendChild(titulo);

//Contenedor Control
const contenedorControl = document.createElement("div");
contenedor.appendChild(contenedorControl);
contenedorControl.setAttribute("class","contenedorControl");
//Puntaje
const contenedorPuntaje = document.createElement("div");
contenedorPuntaje.setAttribute("class", "contenedorPuntaje");
contenedorControl.appendChild(contenedorPuntaje);
const parrafoCombo = document.createElement ("p");

const parrafoPuntos = document.createElement ("p");

const textoCombo = document.createTextNode ("Combo x");
parrafoCombo.appendChild(textoCombo);
contenedorPuntaje.appendChild(parrafoCombo);
const spanCombo = document.createElement("span");
const txtSpanCombo = document.createTextNode(" 1");
spanCombo.setAttribute("id","combo");
spanCombo.appendChild(txtSpanCombo);
parrafoCombo.appendChild(spanCombo);

const textoPuntos = document.createTextNode ("Puntos: ");
parrafoPuntos.appendChild(textoPuntos);
contenedorPuntaje.appendChild(parrafoPuntos);
const spanPuntos = document.createElement("span");
const txtSpanPuntos = document.createTextNode(" 0");
spanPuntos.setAttribute("id","puntos");
spanPuntos.appendChild(txtSpanPuntos);
parrafoPuntos.appendChild(spanPuntos);

//Div botones info y refresh

const contenedorBotones= document.createElement("div");
contenedorControl.appendChild(contenedorBotones);

const botonInformacion = document.createElement("button");
const botonReiniciar = document.createElement("button");

contenedorBotones.appendChild(botonInformacion);
contenedorBotones.appendChild(botonReiniciar);

const iconoBotonInformacion = document.createElement("i");
botonInformacion.appendChild(iconoBotonInformacion);
botonInformacion.setAttribute("class","botonControl");
iconoBotonInformacion.setAttribute("class","fas fa-info-circle");


const iconoBotonReiniciar = document.createElement("i");
botonReiniciar.appendChild(iconoBotonReiniciar);
botonReiniciar.setAttribute("class","botonControl");
iconoBotonReiniciar.setAttribute("class","fas fa-redo");

const botonFacil = document.createElement("button");
const botonNormal = document.createElement("button");
const botonDificil = document.createElement("button");
const botonFacilTexto = document.createTextNode("Facil");
const botonNormalTexto = document.createTextNode("Normal");
const botonDificilTexto = document.createTextNode("Dificil");

const contenedorGrilla = document.createElement("div");
contenedorGrilla.setAttribute("class", "contenedorGrilla");
const grilla = document.createElement("div");
grilla.setAttribute("class", "grilla");
contenedorGrilla.appendChild(grilla);
contenedor.appendChild(contenedorGrilla);

//Reloj

const contenedorReloj = document.createElement("div");
contenedorReloj.setAttribute("class","contenedorTiempo");
contenedor.appendChild(contenedorReloj);
const iconoReloj = document.createElement("i");
contenedorReloj.appendChild(iconoReloj);
iconoReloj.setAttribute("class","fas fa-hourglass-half");
const parrafoReloj = document.createElement ("p");
contenedorReloj.appendChild(parrafoReloj);
const textoReloj = document.createTextNode ("  0:00");
parrafoReloj.appendChild(textoReloj);


botonFacil.appendChild(botonFacilTexto);
botonNormal.appendChild(botonNormalTexto);
botonDificil.appendChild(botonDificilTexto);
document.body.appendChild(botonFacil);
document.body.appendChild(botonNormal);
document.body.appendChild(botonDificil);

//Generar grilla
let cellSize;
let cantidad;
let arrayMatriz = [];
const emojis = ["🐸", "🐷", "🦝", "🐔", "🐵", "🐱"]

const crearMatriz = (cantidad,tamanio) =>{
    let matrizSize = cantidad;
    let cellSize = tamanio
    for(let i = 0; i < matrizSize; i++) {
        arrayMatriz.push([]);
        for(let j = 0; j < matrizSize; j++) {
            const emoji = emojis[Math.floor(Math.random()*(emojis.length-1))];
            arrayMatriz[i][j]= emoji;
            grilla.append(crearCeldas(i, j, emoji, cellSize));
        }
        
    }console.log(arrayMatriz)
}
let celda;
const crearCeldas = (i, j, emoji, cellSize) =>{
    celda = document.createElement('div');
    celda.dataset.row = i;
    celda.dataset.column = j;
    celda.style.width = `${cellSize}px`;
    celda.style.height = `${cellSize}px`;
    celda.style.position = 'absolute';
    celda.style.left = `${j*cellSize}px`;
    celda.style.top = `${i*cellSize}px`;
    celda.style.fontSize = `${cellSize-20}px`;
    celda.innerHTML = emoji;
    celda.id=`${j}-${i}`
    celda.addEventListener('click', clickearCeldas);
    return celda;
}

//Bloque horizontal
const tieneBloqueHorizontal = (matriz) => {
    for(let i = 0; i < matriz.length; i++) {
        const array = matriz[i];
        for(let j = 0; j < array.length; j++) {
            if(array[j] === array[j + 1] && array[j] === array[j + 2]) {
                let arraycito = [];
                arraycito.push(array[j]);
                arraycito.push(array[j+1]);
                arraycito.push(array[j+2]);
                
                let y=j;
                let m=0;
                for(let x=3; m<1; x++){
                    if(array[y+2] === array[j+x]){
                        arraycito.push(array[j+x]);
                        y++;
                    }else{
                        m++;
                    }
                 } console.log(arraycito);
            }
        }
    }
}

// Completar o vaciar Grilla

const vaciarGrilla = () => {
    grilla.innerHTML = "";
    arrayMatriz = [];
}

let grillaVacia = true;

const activarGrilla = (cantidad, cellSize) =>{
    if (grillaVacia === true){
        crearMatriz(cantidad,cellSize);
        grillaVacia = false;
    }else{
        vaciarGrilla(grilla);
        console.log(arrayMatriz)
        crearMatriz(cantidad,cellSize);
    }
}

// Dificultad
botonFacil.addEventListener("click", ()=>{
	cantidad = 9;
    cellSize = 56;
    activarGrilla(cantidad,cellSize);
    tieneBloqueHorizontal(arrayMatriz);
});
botonNormal.addEventListener("click", ()=>{
    cantidad = 8;
    cellSize = 63;
	activarGrilla(cantidad,cellSize);
    tieneBloqueHorizontal(arrayMatriz);
});
botonDificil.addEventListener("click", ()=>{
    cantidad = 7;
    cellSize = 72;
	activarGrilla(cantidad,cellSize);
    tieneBloqueHorizontal(arrayMatriz);
});

//Intercambiar Posiciones
const moverCelda = (clickAnterior, clickPosterior, dataRowAnterior, dataColumnAnterior, dataRowPosterior, dataColumnPosterior) =>{
    clickAnterior.style.top = `${dataRowPosterior * cellSize}px`
    clickAnterior.style.left = `${dataColumnPosterior * cellSize}px`
    clickPosterior.style.top = `${dataRowAnterior * cellSize}px`
    clickPosterior.style.left = `${dataColumnAnterior * cellSize}px`

    clickAnterior.dataset.row = dataRowPosterior;
    clickAnterior.dataset.column = dataColumnPosterior;
    clickPosterior.dataset.row = dataRowAnterior;
    clickPosterior.dataset.column = dataColumnAnterior;
    //intercambia emojis de la matriz:
    arrayMatriz[dataRowPosterior][dataColumnPosterior] = clickAnterior.innerHTML;
    console.log(arrayMatriz[dataRowPosterior][dataColumnPosterior])
    arrayMatriz[dataRowAnterior][dataColumnAnterior] = clickPosterior.innerHTML;    
    console.log(arrayMatriz[dataRowAnterior][dataColumnAnterior])
}



//Seleccion item
let clickAnterior = null;
const clickearCeldas = (e) =>{
    const clickPosterior = e.target;
    if(clickAnterior){
        const dataRowAnterior = clickAnterior.dataset.row;
        const dataRowPosterior = clickPosterior.dataset.row;
        const dataColumnAnterior = clickAnterior.dataset.column;
        const dataColumnPosterior = clickPosterior.dataset.column;
        const distanciaRow = dataRowAnterior - dataRowPosterior;
        const distanciaColumn = dataColumnAnterior - dataColumnPosterior;

        if((distanciaRow >= -1 && distanciaRow <= 1) && (distanciaColumn >= -1 && distanciaColumn <= 1)){ //horizontales y verticales adyacentes
            if((distanciaRow === 1 || distanciaRow === -1) && (distanciaColumn === 1 || distanciaColumn === -1)){ //omite diagonales adyacentes 
                clickPosterior.classList.add("seleccion-celda");
                clickAnterior.classList.remove("seleccion-celda");
                clickAnterior = clickPosterior;
            }else{
                moverCelda(clickAnterior, clickPosterior, dataRowAnterior, dataColumnAnterior, dataRowPosterior, dataColumnPosterior)
                tieneBloqueHorizontal(arrayMatriz);
                clickAnterior.classList.remove("seleccion-celda")
                clickAnterior = null;
            }
        }else{ //items no adyacentes    
            clickPosterior.classList.add("seleccion-celda");
            clickAnterior.classList.remove("seleccion-celda");
            clickAnterior = clickPosterior;
        }
    }else{
        clickAnterior = clickPosterior;
        clickAnterior.classList.add("seleccion-celda");
    }
}


swal({
    title: "¡Bienvenida!",
    text: "En MatcheADAs tu objetivo es juntar tres o más ítems del mismo tipo, ya sea en fila o columna. Para eso, selecciona un ítem y a continuación un ítem adyacente para intercambiarlos de lugar.",
    
    buttons: {
        
        catch: {
          text: "A jugar",
          value: "catch",
        },
        
      },
    
})
    .then((value) =>{ 
        
          
swal({
    title:"Nuevo juego",
    text: "Selecciona una dificultad",
        buttons: {
            confirm: {
              text: "Fácil",
              value: true,
              visible: true,
              className: "",
              closeModal: true
            },
            catch: {
                text: "Normal",
                value: true,
                visible: true,
                className: "",
                closeModal: true
              },
            cancel: {
              text: "Difícil",
              value: true,
              visible: true,
              className: "",
              closeModal: true,
            }
          }
        })
    })


    
        
      