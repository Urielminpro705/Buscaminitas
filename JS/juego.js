$(document).ready(function() {
    let tamaño = 10; 
    let tablero = new Array(tamaño);
    let tableroVisual = $("#cont-tablero")
    let btnModoBandera = $("#switch-bandera-bandera");
    let btnModoBomba = $("#switch-bandera-bomba");
    let esModoBomba = true;
    let yaPerdio = false;
    let esPrimerToque = true;

    btnModoBandera.click(function () {
        if (esModoBomba == true) {
            $("#div-switch-bandera-efectoGota").removeClass("switch-bandera-efectoGota-reverse")
            $("#div-switch-bandera-efectoGota").css("left","50px");
            setTimeout(() => {
                $("#div-switch-bandera-efectoGota").addClass("switch-bandera-efectoGota");
            }, 1);
            btnModoBomba.removeClass("switch-modo-activo")
            btnModoBandera.addClass("switch-modo-activo")
            esModoBomba = false;
        }
    })
    
    btnModoBomba.click(function () {
        if (esModoBomba == false) {
            $("#div-switch-bandera-efectoGota").removeClass("switch-bandera-efectoGota")
            $("#div-switch-bandera-efectoGota").css("left","0");
            setTimeout(() => {
                $("#div-switch-bandera-efectoGota").addClass("switch-bandera-efectoGota-reverse");
                $("#div-switch-bandera-efectoGota").css("left","50px");
            }, 1);
            btnModoBomba.addClass("switch-modo-activo")
            btnModoBandera.removeClass("switch-modo-activo")
            esModoBomba = true;
        }
    })

    function crearTablero() {
        for(var i = 0; i < tamaño; i++) {
            tablero[i] = new Array(tamaño).fill(-2);
        }
    }

    function numeroAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function plantarBombas() {
        var i = 0;
        while (i < 20) {
            var filaRandom = numeroAleatorio(0,tamaño);
            var columnaRandom = numeroAleatorio(0,tamaño);

            if (tablero[filaRandom][columnaRandom] != -1) {
                tablero[filaRandom][columnaRandom] = -1;
                i++;
            }
        }
    }

    function detectarBombas(fila, columna) {
        if (tablero[fila][columna] == -1) {
            yaPerdio = true;
            console.log("Perdiste UWU")
        } else if(tablero[fila][columna] != 0) {
            var f = (fila == 0 || fila == (tamaño-1)) ? 1 : 0;
            var c = (columna == 0 || columna == (tamaño-1)) ? 1 : 0;

            var filaInicial;
            var columnaInicial;
            var contador = 0;
            if (fila == 0) {
                filaInicial = fila;
            } else {
                filaInicial = fila - 1;
            }
            if (columna == 0) {
                columnaInicial = columna;
            } else {
                columnaInicial = columna - 1;
            }

            var auxFila = filaInicial;
            var auxColumna = columnaInicial;
            var auxC = c
            var auxF = f

            while (f < 3) {
                while (c < 3) {
                    if (tablero[filaInicial][columnaInicial] == -1) {
                        contador += 1;
                    }
                    columnaInicial += 1;
                    c += 1;
                }
                columnaInicial = auxColumna;
                c = auxC;
                filaInicial += 1;
                f += 1;
            }

            f = auxF
            tablero[fila][columna] = contador;
            if (contador == 0) {
                filaInicial = auxFila;
                columnaInicial = auxColumna;
                while (f < 3) {
                    c = auxC;  
                    while (c < 3) {
                        detectarBombas(filaInicial, columnaInicial);
                        c += 1;
                        columnaInicial += 1;
                    }
                    if (columna == 0) {
                        columnaInicial = columna
                    } else {
                        columnaInicial = columna - 1;
                    }
                    f += 1;
                    filaInicial += 1;
                }
            }
        }
    }

    function mostrarCambios() {
        let casillasTocadas = [];
        for (var f = 0; f < tamaño; f++) {
            for (var c = 0; c < tamaño; c++) {
                if (tablero[f][c] != -2 && tablero[f][c] != -1) {
                    var indiceTotal = (tamaño*f) + c;
                    casillasTocadas.push(indiceTotal);
                }
            }
        }

        casillasTocadas.forEach(function (indice) {
            var casilla = tableroVisual.children().eq(indice);
            if (!casilla.hasClass("btn-casillas-bandera")) {
                casilla.removeClass("btn-casillas-virgen");
                casilla.addClass("btn-casillas-usado");
            }
            var fila = Math.floor(indice/tamaño);
            var columna = (indice%tamaño);
            if (tablero[fila][columna] != 0) {
                casilla.text(tablero[fila][columna]);
            }
        });
    }

    crearTablero();
    plantarBombas();

    $('.btn-casillas').click(function () {
        if (esPrimerToque == true) {
            tableroVisual.removeClass("tablero-mensajeDeInicio");
            esPrimerToque = false;
        }
        var posicion = $(this).index();
        var fila = Math.floor(posicion/tamaño);
        var columna = (posicion%tamaño);
        console.log("la fila es " + fila);
        console.log("la columna es " + columna);

        if (esModoBomba == false) {
            if ($(this).hasClass("btn-casillas-bandera")) {
                $(this).removeClass("btn-casillas-bandera");
                $(this).addClass("btn-casillas-virgen");
                
            } else if($(this).hasClass("btn-casillas-virgen")){
                $(this).removeClass("btn-casillas-virgen");
                $(this).addClass("btn-casillas-bandera");
            }
        } else {
            if (!$(this).hasClass("btn-casillas-bandera")) {
                detectarBombas(fila, columna);
                tablero.forEach(function(fila) {
                    console.log(fila)
                })
                mostrarCambios();
            }
        }
    })
})