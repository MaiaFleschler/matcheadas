'use strict';
//Contenedor Principal
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

const textoCombo = document.createTextNode ("Combo x 0");
parrafoCombo.appendChild(textoCombo);
contenedorPuntaje.appendChild(parrafoCombo);

const textoPuntos = document.createTextNode ("Puntos: 0");
parrafoPuntos.appendChild(textoPuntos);
contenedorPuntaje.appendChild(parrafoPuntos);

//Botones info y refresh

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
botonReiniciar.setAttribute("class", "botonReiniciar")
iconoBotonReiniciar.setAttribute("class","fa fa-undo");

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
const textoReloj = document.createTextNode ("0:00");
parrafoReloj.appendChild(textoReloj);


//Generar grilla
let arrayMatriz = [];
const emojis = ["🐸", "🐷", "🐶", "🐔", "🐵", "🐱", "🐹"];


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
        
    }
}
let celda;
const crearCeldas = (i, j, emoji, cellSize) =>{
    celda = document.createElement('div');
    celda.dataset.row = i;
    celda.dataset.column = j;
    celda.style.width = `${cellSize}%`;
    celda.style.height = `${cellSize}%`;
    celda.style.position = 'absolute';
    celda.style.left = `${j*cellSize}%`;
    celda.style.top = `${i*cellSize}%`;
    celda.style.textAlign = "center";
    celda.style.fontSize = `${cellSize*3.5}px`;
    celda.innerHTML = emoji;
    celda.id=`${i}-${j}`
    celda.setAttribute("class","celda");
    celda.addEventListener('click', clickearCeldas);
    return celda;
}

//Completar o vaciar grilla

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

//Bloque horizontal
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
//Traer elemento del DOM
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


//Unir bloques horizontales y verticales
const unirBloques =()=>{
    let matrizUnion = [];
    const matrizH = tieneBloqueHorizontal();
    const matrizV = tieneBloqueVertical();
    matrizUnion = matrizH.concat(matrizV);
    let arrayABorrar = deshacerMatriz(matrizUnion);
    return arrayABorrar;
}

//Eliminar bloques
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
const moverCelda = (clickAnterior, clickPosterior) =>{
    const dataRowAnterior = clickAnterior.dataset.row;
    const dataRowPosterior = clickPosterior.dataset.row;
    const dataColumnAnterior = clickAnterior.dataset.column;
    const dataColumnPosterior = clickPosterior.dataset.column;

    clickAnterior.style.top = `${dataRowPosterior * cellSize}%`
    clickAnterior.style.left = `${dataColumnPosterior * cellSize}%`
    clickPosterior.style.top = `${dataRowAnterior * cellSize}%`
    clickPosterior.style.left = `${dataColumnAnterior * cellSize}%`

    clickAnterior.dataset.row = dataRowPosterior;
    clickAnterior.dataset.column = dataColumnPosterior;
    clickPosterior.dataset.row = dataRowAnterior;
    clickPosterior.dataset.column = dataColumnAnterior;
    //Intercambiar Id
    clickAnterior.setAttribute("id", `${dataRowPosterior}-${dataColumnPosterior}`);
    clickPosterior.setAttribute("id", `${dataRowAnterior}-${dataColumnAnterior}`);
    //Intercambiar emojis de la matriz:
    arrayMatriz[dataRowPosterior][dataColumnPosterior] = clickAnterior.innerHTML;
    arrayMatriz[dataRowAnterior][dataColumnAnterior] = clickPosterior.innerHTML;    
}

//Devolver Item
const devolverItem =(clickAnterior, clickPosterior)=>{
    moverCelda(clickAnterior, clickPosterior);
    let arrayABorrar = unirBloques();
    if(arrayABorrar.length===0){
        setTimeout(moverCelda, 400, clickPosterior, clickAnterior);
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
                for(let k = i; k>=0 ; k--){ //Recorre la columna de un espacio vacio para arriba
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
//Contador combos
const contarCombos = ()=>{
    const matrizH = tieneBloqueHorizontal();
    const matrizV = tieneBloqueVertical();
    let contadorCombos;
    contadorCombos = matrizH.length + matrizV.length;
    return contadorCombos;
}

//Puntaje
const sumarPuntos = (cantidad, combos)=>{
    console.log(cantidad);
    console.log(combos);
    resultado += cantidad*100*(combos);  
    parrafoPuntos.innerHTML = `Puntos: ${resultado}`;    
}

//Ciclo de matches cuando se inicializa el juego
const cicloMatchInicializar = ()=>{
    let arrayABorrar = unirBloques();
    while(arrayABorrar.length !== 0){
        eliminarBloques();
        descenderBloque();
        rellenarVacios();
        arrayABorrar = unirBloques();
    } 
}

//Ciclo de matches
const cicloMatch = ()=>{
    let arrayABorrar = unirBloques();
    let contadorItems = 0;
    let cantCombos = contarCombos();
    let combos = 0;
    if(arrayABorrar.length !== 0){
        setTimeout(() => {
            eliminarBloques();
        },200);
        setTimeout(() => {
            descenderBloque();
        },400);
        setTimeout(() => {
            rellenarVacios();
        },600);
        console.log(arrayABorrar);
    contadorItems += arrayABorrar.length;
    sumarPuntos(contadorItems, cantCombos);    
    arrayABorrar = unirBloques();   
    combos = cantCombos;
    cantCombos++; 
    setTimeout(()=>{
        cicloMatch();
    },400);
    }  
    parrafoCombo.innerHTML = `Combo x ${combos}`;
    setTimeout(function(){parrafoCombo.innerHTML = `Combo x 0`},500);        
}

//Verifica Adyacencia
 const esAdyacente = (distanciaRow, distanciaColumn) =>{
    return((distanciaRow >= -1 && distanciaRow <= 1) && (distanciaColumn >= -1 && distanciaColumn <= 1)) //horizontales y verticales adyacentes
        && (distanciaRow === 0 || distanciaColumn === 0)//omite diagonales adyacentes 
 }

//Seleccionar item
let resultado = 0;
let clickAnterior = null;
let clickPosterior;
const clickearCeldas = (e) =>{
    clickPosterior = e.target;
    if(clickAnterior){
        const dataRowAnterior = clickAnterior.dataset.row;
        const dataRowPosterior = clickPosterior.dataset.row;
        const dataColumnAnterior = clickAnterior.dataset.column;
        const dataColumnPosterior = clickPosterior.dataset.column;
        const distanciaRow = dataRowAnterior - dataRowPosterior;
        const distanciaColumn = dataColumnAnterior - dataColumnPosterior;
        if(esAdyacente(distanciaRow, distanciaColumn)){
                devolverItem(clickAnterior, clickPosterior);
                clickAnterior.classList.remove("seleccion-celda")
                clickAnterior = null;      
                cicloMatch();
        }else{ //items no adyacentes    
            clickPosterior.classList.add("seleccion-celda");
            clickAnterior.classList.remove("seleccion-celda");
            clickAnterior = clickPosterior;
        }
    }else{
        clickAnterior = clickPosterior;
        clickAnterior.classList.add("seleccion-celda");
    }
}; 

//Reloj 
let max = 45;
let tiempo;
const tiempoJuego = ()=>{
   
    if(max>0){
    max--;
    if(max>9){
        parrafoReloj.innerHTML = `0:${max}`;
    } else{
        parrafoReloj.innerHTML = `0:0${max}`;
    }
    } else{
        juegoTerminado();
        clearInterval(tiempo);
    }
}

//Dificultad y modales
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
            cellSize = 11.1;
            activarGrilla(cantidad,cellSize);                   
            cicloMatchInicializar();
            tiempo = setInterval(tiempoJuego, 1000);
            max= 45;
            resultado = 0;
            parrafoPuntos.innerHTML = `Puntos: ${resultado}`;   
            break;

        case "normal":
            cantidad = 8;
            cellSize = 12.5;
            activarGrilla(cantidad,cellSize);
            cicloMatchInicializar();
            tiempo = setInterval(tiempoJuego, 1000);
            max= 45;
            resultado = 0;
            parrafoPuntos.innerHTML = `Puntos: ${resultado}`;   
            break;

        case "dificil":
            cantidad = 7;
            cellSize = 14.3;
            activarGrilla(cantidad,cellSize);
            cicloMatchInicializar();
            tiempo = setInterval(tiempoJuego, 1000);
            max= 45;
            resultado = 0;
            parrafoPuntos.innerHTML = `Puntos: ${resultado}`;    
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
        button: "A Jugar",
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
        text: `Puntaje final: ${resultado}`,
        closeOnClickOutside: false,
        buttons: {
            reiniciar: {
                text: "Reiniciar",
                value: "reiniciar",
            },
            nuevoJuego: {
                text: "Nuevo juego",
                value: "resetear",
            },
        },
    }).then((value) => {
        if(value==="resetear"){
            mostrarModalDificultad();
        }else if(value === "reiniciar"){
            activarGrilla(cantidad,cellSize);
            cicloMatchInicializar();
            tiempo = setInterval(tiempoJuego, 1000);
            max= 45;
            resultado = 0;
            parrafoPuntos.innerHTML = `Puntos: ${resultado}`;   
        }
    });
};  


