'use strict';

const botonFacil = document.createElement("button");
const botonNormal = document.createElement("button");
const botonDificil = document.createElement("button");
const botonFacilTexto = document.createTextNode("Facil");
const botonNormalTexto = document.createTextNode("Normal");
const botonDificilTexto = document.createTextNode("Dificil");
const grilla = document.getElementById("grilla");

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
            celda.style.fontSize = `${cellSize-20}px`;
            celda.style.width = `${cellSize}px`;
            celda.style.height = `${cellSize}px`;
            celda.style.position = 'absolute';
            celda.style.left = `${i*cellSize}px`;
            celda.style.top = `${j*cellSize}px`;
            celda.style.border = '1px solid #000';
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

