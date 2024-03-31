$(document).ready(function() {
    let tamaño = 10; 
    let tablero = new Array(tamaño);
    let btnModoBandera = $("#switch-bandera-bandera");
    let btnModoBomba = $("#switch-bandera-bomba");
    let esModoBomba = true;

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
        while (i < tamaño) {
            var filaRandom = numeroAleatorio(0,tamaño);
            var columnaRandom = numeroAleatorio(0,tamaño);

            if (tablero[filaRandom][columnaRandom] != -1) {
                tablero[filaRandom][columnaRandom] = -1;
                i++;
            }
        }

    }

    $('.btn-casillas').click(function () {
        var posicion = $(this).index();
        fila = Math.floor(posicion/tamaño);
        columna = (posicion%tamaño);
        console.log("la fila es " + fila);
        console.log("la columna es " + columna);

        if (esModoBomba == false) {
            if ($(this).hasClass("btn-casillas-bandera")) {
                $(this).removeClass("btn-casillas-bandera")
                $(this).addClass("btn-casillas-virgen")
                
            } else {
                $(this).removeClass("btn-casillas-virgen")
                $(this).addClass("btn-casillas-bandera")
            }
        }
    })
})