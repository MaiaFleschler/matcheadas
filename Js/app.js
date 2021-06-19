'use strict';

const botonFacil = document.createElement("button");
const botonNormal = document.createElement("button");
const botonDificil = document.createElement("button");

const botonFacilTexto = document.createTextNode("Facil");
const botonNormalTexto = document.createTextNode("Normal");
const botonDificilTexto = document.createTextNode("Dificil");

botonFacil.appendChild(botonFacilTexto);
botonNormal.appendChild(botonNormalTexto);
botonDificil.appendChild(botonDificilTexto);

document.body.appendChild(botonFacil);
document.body.appendChild(botonNormal);
document.body.appendChild(botonDificil);

const crearCeldas = (cantidad,tamanio) => {

let filas = cantidad;
let col = cantidad;
let cellSize = tamanio;

let pos_x = 0;

for(let i = 0; i < filas; i++) {

    let pos_y = 0;

    for(let j = 0; j < col; j++) {

        const celda = document.createElement('div');
        celda.style.width = `${cellSize}px`;
        celda.style.height = `${cellSize}px`;

        celda.style.position = 'absolute';
        celda.style.left = `${pos_y}px`;
        celda.style.top = `${pos_x}px`;
        celda.style.border = '1px solid #000';

        celda.setAttribute('data-x', i);
        celda.setAttribute('data-y', j);

        pos_y = pos_y + cellSize;

        document.body.appendChild(celda);

    }

    pos_x = pos_x + cellSize;

}

document.body.style.position = 'relative';

}

botonFacil.addEventListener("click", ()=>{
	crearCeldas(9,40);
});
botonNormal.addEventListener("click", ()=>{
	crearCeldas(8,50);
});
botonDificil.addEventListener("click", ()=>{
	crearCeldas(7,60);
});



