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
const arrayMatriz = [];
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
        console.log(arrayMatriz)
    }
}
let celda;
const crearCeldas = (i, j, emoji, cellSize) =>{
    celda = document.createElement('div');
    celda.dataset.row = j;
    celda.dataset.column = i;
    celda.style.width = `${cellSize}px`;
    celda.style.height = `${cellSize}px`;
    celda.style.position = 'absolute';
    celda.style.left = `${i*cellSize}px`;
    celda.style.top = `${j*cellSize}px`;
    celda.style.fontSize = `${cellSize-20}px`;
    celda.innerHTML = emoji;
    celda.id=`${j}-${i}`
    celda.addEventListener('click', clickearCeldas);
    return celda;
}
 

// Dificultad
botonFacil.addEventListener("click", ()=>{
	cellSize = 56;
    crearMatriz(9,cellSize);
});
botonNormal.addEventListener("click", ()=>{
    cellSize = 63,
	crearMatriz(8,cellSize);
});
botonDificil.addEventListener("click", ()=>{
    cellSize = 72;
	crearMatriz(7,cellSize);
});

//Seleccion item
let clickAnterior = null;
const clickearCeldas = (e) =>{
    const clickPosterior = e.target;

    if(clickAnterior){
        console.log("esto funciona");
        const dataRowAnterior = clickAnterior.dataset.row;
        const dataRowPosterior = clickPosterior.dataset.row;
        const dataColumnAnterior = clickAnterior.dataset.column;
        const dataColumnPosterior = clickPosterior.dataset.column;
        const distanciaRow = dataRowAnterior - dataRowPosterior;
        const distanciaColumn = dataColumnAnterior - dataColumnPosterior;
        console.log(`${distanciaColumn} distanciacolumn`)
        console.log(`${distanciaRow} distanciarow`)

        if((distanciaRow >= -1 && distanciaRow <= 1) && (distanciaColumn >= -1 && distanciaColumn <= 1)){ //horizontales y verticales adyacentes
            if((distanciaRow === 1 || distanciaRow === -1) && (distanciaColumn === 1 || distanciaColumn === -1)){ //omite diagonales adyacentes 
                clickPosterior.classList.add("seleccion-celda");
                clickAnterior.classList.remove("seleccion-celda");
                clickAnterior = clickPosterior;
            }else{
                clickAnterior.style.top = `${dataRowPosterior * cellSize}px`
                clickAnterior.style.left = `${dataColumnPosterior * cellSize}px`
                clickPosterior.style.top = `${dataRowAnterior * cellSize}px`
                clickPosterior.style.left = `${dataColumnAnterior * cellSize}px`

                clickAnterior.dataset.row = dataRowPosterior;
                clickAnterior.dataset.column = dataColumnPosterior;
                clickPosterior.dataset.row = dataRowAnterior;
                clickPosterior.dataset.column = dataColumnAnterior;

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