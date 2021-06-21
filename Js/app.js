'use strict';
const container = document.getElementById("container");
const titulo = document.createElement("h1");
const textoTitulo = document.createTextNode("MatcheADAs");
titulo.appendChild(textoTitulo);
titulo.setAttribute("class", "estiloLetras");
titulo.style.fontSize = "45px";
container.appendChild(titulo);


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
document.body.appendChild(contenedorGrilla);


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
