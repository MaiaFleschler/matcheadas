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

const crearCeldas = (cantidad,tamanio) =>{
    const emojis = ["🐸", "🐷", "🐰", "🐔", "🐵", "🐱"]
    let filas = cantidad;
    let col = cantidad;
    let cellSize = tamanio;
    const arrayMatriz = [];

    for(let i = 0; i < filas; i++) {
        arrayMatriz.push([]);
        for(let j = 0; j < col; j++) {
            const celda = document.createElement('div');
            celda.style.width = `${cellSize}px`;
            celda.style.height = `${cellSize}px`;
            celda.style.position = 'absolute';
            celda.style.left = `${i*cellSize}px`;
            celda.style.top = `${j*cellSize}px`;
            celda.style.fontSize = `${cellSize-20}px`;
            const emoji = emojis[Math.floor(Math.random()*emojis.length)];
            arrayMatriz[i].push(emoji);
            celda.innerText = emoji;
            grilla.appendChild(celda);
        }
    }
}

botonFacil.addEventListener("click", ()=>{
	crearCeldas(9,56);
});
botonNormal.addEventListener("click", ()=>{
	crearCeldas(8,63);
});
botonDificil.addEventListener("click", ()=>{
	crearCeldas(7,72);
});
