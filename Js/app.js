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
const txtSpanCombo = document.createTextNode(" 0");
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


//Generar grilla
let arrayMatriz = [];
const emojis = ["🐸", "🐷", "🦝", "🐔", "🐵","🦒","🐨"]


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
    celda.id=`${i}-${j}`
    celda.addEventListener('click', clickearCeldas);
    return celda;
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
        crearMatriz(cantidad,cellSize);
    }
}

const tieneBloqueHorizontal = () => {
    let matrizH = [];
    let arraycito = [];
    for(let i = 0; i < arrayMatriz.length; i++) {
        const array = arrayMatriz[i];
        for(let j = 0; j < array.length; j++) {
            if(arraycito.indexOf(`${i}${j}`) === -1){
            if(array[j] === array[j + 1] && array[j] === array[j + 2]) {
                let arrayBloque = [];
                arrayBloque.push(`${i}${j}`);
                arrayBloque.push(`${i}${j+1}`);
                arrayBloque.push(`${i}${j+2}`);

                arraycito.push(`${i}${j}`);
                arraycito.push(`${i}${j+1}`);
                arraycito.push(`${i}${j+2}`);
                
                let y=j;
                let m=0;
                for(let x=3; m<1; x++){
                    if(array[y+2] === array[j+x]){
                        arrayBloque.push(`${i}${j+x}`);
                        arraycito.push(`${i}${j+x}`);
                        y++;
                    }else{
                        m++;
                    }
                 } matrizH.push(arrayBloque);
            }}
        }
    
    } 
     return matrizH;
}

//Bloque vertical
const tieneBloqueVertical = () => {
    let matrizV = [];
    let arraycito = [];
    for(let i = 0; i < arrayMatriz.length; i++){
        for(let j = 0; j < arrayMatriz[i].length-2; j++){
            if(arraycito.indexOf(`${j}${i}`) === -1){
            if(arrayMatriz[j][i] === arrayMatriz[j + 1][i] && arrayMatriz[j][i] === arrayMatriz[j + 2][i]){ 
                let arrayBloque = [];
                arrayBloque.push(`${j}${i}`);
                arrayBloque.push(`${j+1}${i}`);
                arrayBloque.push(`${j+2}${i}`);

                arraycito.push(`${j}${i}`);
                arraycito.push(`${j+1}${i}`);
                arraycito.push(`${j+2}${i}`);
                
                let y=j;
            
                for(let x=3; y<arrayMatriz[i].length-4; x++){
                    if(arrayMatriz[y+2][i] === arrayMatriz[j+x][i]){
                        arrayBloque.push(`${j+x}${i}`);
                        arraycito.push(`${j+x}${i}`);
                        y++;
                    }else{
                        break;
                    }
                } matrizV.push(arrayBloque);
                
            }}
        }
    } 
    return matrizV;
}
//Trae elemento del dom
const getCeldaDom = (fila,columna)=>{
    const celda = document.getElementById(`${fila}-${columna}`);
    return celda;
}

//Deshacer Bloques
const deshacerMatriz = (matriz) =>{
    let array = [];
    for(let i=0; i<matriz.length; i++){
        for(let j=0; j<matriz[i].length; j++){
            array.push(matriz[i][j]);
        }
    }
    return array;
}


//Une bloques horizontales y verticales
const unirBloques =()=>{
    let matrizUnion = [];
    const matrizH = tieneBloqueHorizontal();
    const matrizV = tieneBloqueVertical();
    matrizUnion = matrizH.concat(matrizV);
    let arrayABorrar = deshacerMatriz(matrizUnion);
    return arrayABorrar;
}

//funcion borrar bloques
const eliminarBloques =()=>{
    let arrayABorrar = unirBloques();
        for(let elemento of arrayABorrar){
        let fila = Number(elemento.slice(0,1));
        let columna = Number(elemento.slice(1));
        arrayMatriz[fila][columna]="";
        getCeldaDom(fila,columna).innerHTML="";
    }       
}


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
    //Intercambia Id
    clickAnterior.setAttribute("id", `${dataRowPosterior}-${dataColumnPosterior}`);
    clickPosterior.setAttribute("id", `${dataRowAnterior}-${dataColumnAnterior}`);
    //intercambia emojis de la matriz:
    arrayMatriz[dataRowPosterior][dataColumnPosterior] = clickAnterior.innerHTML;
    arrayMatriz[dataRowAnterior][dataColumnAnterior] = clickPosterior.innerHTML;    
    console.log(arrayMatriz[dataRowPosterior][dataColumnPosterior]);
    console.log(arrayMatriz[dataRowAnterior][dataColumnAnterior]);
}

//Devolver Item
const devolverItem =(clickAnterior, clickPosterior, dataRowAnterior, dataColumnAnterior, dataRowPosterior, dataColumnPosterior)=>{
    moverCelda(clickAnterior, clickPosterior, dataRowAnterior, dataColumnAnterior, dataRowPosterior, dataColumnPosterior)
    let arrayABorrar = unirBloques();
    if(arrayABorrar.length===0){
        moverCelda(clickPosterior, clickAnterior, dataRowAnterior, dataColumnAnterior, dataRowPosterior, dataColumnPosterior)
    }
}

//Rellenar vacios
const rellenarVacios = () => {
    for(let i = 0; i < arrayMatriz.length; i++) {
        const array = arrayMatriz[i];
        for(let j = 0; j < array.length; j++) {
            if(arrayMatriz[i][j] === ""){
                const emoji = emojis[Math.floor(Math.random()*(emojis.length-1))];
                arrayMatriz[i][j]= emoji;
                getCeldaDom(i,j).innerHTML=emoji;
            }    
        }
    }
}


//Descender Bloque
const descenderBloque = () =>{
    for(let i = arrayMatriz.length-1; i >= 0; i--){
        for(let j = arrayMatriz.length-1; j >= 0; j--){
            if(arrayMatriz[i][j] === ""){
                for(let k = i; k>=0 ; k--){ //recorre la columna de un espacio vacio para arriba
                    if(arrayMatriz[k][j]!==""){
                        let sig= arrayMatriz[k][j];
                        let sig2 = getCeldaDom(k,j).innerHTML;
                        arrayMatriz[i][j]=sig;
                        getCeldaDom(i,j).innerHTML=sig2;
                        arrayMatriz[k][j]="";
                        getCeldaDom(k,j).innerHTML="";
                        break;
                    }
                }
            }
        }
    }
}
//Contador Combos
const contarCombos = ()=>{
    const matrizH = tieneBloqueHorizontal();
    console.log(matrizH);
    const matrizV = tieneBloqueVertical();
    console.log(matrizV);
    let contadorCombos;
    contadorCombos = matrizH.length + matrizV.length;
    console.log(contadorCombos);
    return contadorCombos;
}

//Puntaje
const sumarPuntos = (cantidad, combos)=>{
    console.log(cantidad);
    console.log(combos);
    let puntaje = cantidad*100*(combos);
    console.log(puntaje);
    return puntaje;
}

// Ciclo de matches cuando se inicializa el juego
const cicloMatchInicializar = ()=>{
    let arrayABorrar = unirBloques();
    while(arrayABorrar.length !== 0){
        eliminarBloques();
        descenderBloque();
        rellenarVacios();
        arrayABorrar = unirBloques();
    } 
}

// Ciclo de matches
const cicloMatch = ()=>{
    let arrayABorrar = unirBloques();
    let contadorItems = 0;
    let resultado = 0;
    let cantCombos = contarCombos();
    let combos;
    while(arrayABorrar.length !== 0){
        eliminarBloques();
        descenderBloque();
        rellenarVacios();
        console.log(arrayABorrar);
        contadorItems += arrayABorrar.length;
        resultado = sumarPuntos(contadorItems, cantCombos);    
        arrayABorrar = unirBloques();   
        combos = cantCombos;
        cantCombos++; 
    } 
    parrafoPuntos.innerHTML = `Puntos: ${resultado}`;
    parrafoCombo.innerHTML = `Combo x ${combos}`;
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
                devolverItem(clickAnterior, clickPosterior, dataRowAnterior, dataColumnAnterior, dataRowPosterior, dataColumnPosterior);
                clickAnterior.classList.remove("seleccion-celda")
                clickAnterior = null;      
                cicloMatch();     
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

// Dificultad

let cellSize;
let cantidad;

const mostrarModalDificultad = () =>{          
swal({
    title:"Nuevo juego",
    text: "Selecciona una dificultad",  
    closeOnClickOutside: false, 
    buttons: {
        facil: {
            text: "Fácil",
            value: "facil",            
        },
        normal: {
            text: "Normal",
            value: "normal",
        },
        dificil: {
            text: "Difícil",
            value: "dificil",            
        },
    },
}).then((value) => {
    switch (value) {
        case "facil":
            cantidad = 9;
            cellSize = 56;
            activarGrilla(cantidad,cellSize);                   
            cicloMatchInicializar();
            break;

        case "normal":
            cantidad = 8;
            cellSize = 63;
            activarGrilla(cantidad,cellSize);
            cicloMatchInicializar();
            break;

        case "dificil":
            cantidad = 7;
            cellSize = 72;
            activarGrilla(cantidad,cellSize);
            cicloMatchInicializar();
            break;

        default:
            swal("Hubo un error!");
            mostrarModalBienvenida();
    }
});
};

const span = document.createElement("span");
span.innerHTML="En MatcheADAs tu objetivo es juntar tres o más ítems del mismo tipo, ya sea en fila o columna. Para eso, selecciona un ítem y a continuación un ítem adyacente para intercambiarlos de lugar.<br><br> Si se forma un grupo, esos items se eliminarán y ganarás puntos. ¡Sigue armando grupos de 3 o más antes de que se acabe el tiempo! <br><br><strong>Controles</strong><br>Click izquierdo: Selección <br>Enter o Espacio: Selección <br>Flechas o WASD: Movimiento e intercambio"

const mostrarModalBienvenida = () => {
    swal({
        title: "¡Bienvenida!",
        content: span,
        button: "A jugar",
        closeOnClickOutside: false,
    }).then(() => {
        mostrarModalDificultad();
    });
};    

const reiniciarJuego = () => {
    swal({
        title: "Reiniciar juego?",
        text: "Perderás todo tu puntaje acumulado!",
        closeOnClickOutside: false,
        buttons: {
            cancel: "Cancelar",
            nuevoJuego: {
                text: "Nuevo juego",
                value: "resetear",
            },
        },
    }).then((value) => {
        if(value==="resetear"){
        mostrarModalDificultad();
        }
    });
};    

mostrarModalBienvenida();
botonReiniciar.addEventListener("click", ()=>{
    reiniciarJuego();
})
botonInformacion.addEventListener("click",()=>{
    swal({
        title: "¡Bienvenida!",
        content: span,
        button: "A jugar",
        closeOnClickOutside: false,
    })
})

const juegoTerminado = () => {
    swal({
        title: "¡Juego terminado!",
        text: "Puntaje final: 0",
        closeOnClickOutside: false,
        buttons: {
            reiniciar: "Reiniciar",
            nuevoJuego: {
                text: "Nuevo juego",
                value: "resetear",
            },
        },
    }).then((value) => {
        if(value==="resetear"){
        mostrarModalDificultad();
        }
    });
};    


