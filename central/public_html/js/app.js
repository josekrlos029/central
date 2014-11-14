// Diccionario de Estados
// p -> pendiente
// a -> Aceptado por parte del restaurante
// n -> No Aceptado
// c -> Cancelado
// l -> Domicilio listo
// r -> Recibida

function atras() {
    history.back();
}

function update() {

    var regid = localStorage.getItem("regId");

    var data = {
        regId: regid
    };

    var url = "http://admin.tudomicilio.net/restaurante/updateRegIdCentral";
    //var url = "http://192.168.1.33/domicilios/restaurante/updateRegId";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    })
            .done(function(msg) {
                var json = eval("(" + msg + ")");
                if (json.msj == "exito") {
                    //alert("ok");

                } else if (json.msj == "no") {
                    alert("No puedes recibir pedidos, intenta ingresando nuevamente.");
                } else {
                    alert("Error en el servidor, contactate con la empresa TuDomicilio ");
                }

            });

}

function cargarPedidios() {

    var $this = $(this),
            theme = $this.jqmData("theme") || $.mobile.loader.prototype.options.theme,
            msgText = $this.jqmData("msgtext") || $.mobile.loader.prototype.options.text,
            textVisible = $this.jqmData("textvisible") || $.mobile.loader.prototype.options.textVisible,
            textonly = !!$this.jqmData("textonly");
    html = $this.jqmData("html") || "";
    $.mobile.loading("show", {
        text: msgText,
        textVisible: textVisible,
        theme: theme,
        textonly: textonly,
        html: html
    });

    var idRestaurante = localStorage.getItem("idRestaurante");

    var data = {
        idRestaurante: idRestaurante
    };
    var url = "http://admin.tudomicilio.net/restaurante/listaDomicilios";
    //var url = "http://192.168.1.33/domicilios/restaurante/domicilios";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {
        $("#contenido").hide();
        $("#contenido").html(msg);
        setTimeout(function() {
            $('#lista1').trigger('create');
            $('#lista2').trigger('create');
            $('#lista3').trigger('create');
            $("#uno").click();
            $("#two").hide();
            $("#three").hide();
            
            //$('.boton').button('refresh');
            $(".l1").trigger('create');
            $(".l2").trigger('create');
            $("#contenido").show();
            $.mobile.loading("hide");
        }, 1000);

    });

}

function popAceptar(idDomicilio) {
    
    $("#idAceptar").val(idDomicilio);
}

function popAceptar2(idServicio) {
    
    $("#idAceptar2").val(idServicio);
}

function popRechazar(idDomicilio) {
    
    $("#idRechazar").val(idDomicilio);
}

function popCancelar(idDomicilio) {
    
    $("#idCancelar").val(idDomicilio);
}

function popListo(idDomicilio) {
    
    $("#idListo").val(idDomicilio);
}

function popEntregado(idDomicilio) {
    $("#idEntregado").val(idDomicilio);
}

function popListo2(idServicio) {
    
    $("#idListo2").val(idServicio);
}

function popEntregado2(idServicio) {
    $("#idEntregado2").val(idServicio);
}

function entregado() {
    
    var idDomicilio = $("#idEntregado").val();
    var data = {
        idDomicilio: idDomicilio,
        estado: "e"
    };
    
    var url = "http://admin.tudomicilio.net/restaurante/cambiarEstadoDomicilio";
    //var url = "http://192.168.1.33/domicilios/restaurante/cambiarEstadoDomicilio";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {

        var json = eval("(" + msg + ")");
        if (json.msj == "exito") {
            alert("Exito, Se le notificará al cliente la novedad !");
        } else if (json.msj == "no") {
            alert("Error en el servidor, intenta nuevamente");
        } else {
            alert("Error en el servidor, contactate con la empresa TuDomicilio ");
        }
        $("#close5").click();
        cargarPedidios();
        //ubicarPedidos();
    });
}

function aceptar() {
    var idDomicilio = $("#idAceptar").val();
    
    var data = {
        idDomicilio: idDomicilio,
        estado: "a"
    };
    var url = "http://admin.tudomicilio.net/restaurante/cambiarEstadoDomicilio";
    //var url = "http://192.168.1.33/domicilios/restaurante/cambiarEstadoDomicilio";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {

        var json = eval("(" + msg + ")");
        if (json.msj == "exito") {
            alert("Domicilio Aceptado, Se le notificará al cliente la novedad !");
        } else if (json.msj == "no") {
            alert("Error en el servidor, intenta nuevamente");
        } else {
            alert("Error en el servidor, contactate con la empresa TuDomicilio ");
        }
        $("#close1").click();
        cargarPedidios();
        //ubicarPedidos();

    });
}

function rechazar() {
    var idDomicilio = $("#idRechazar").val();
    var data = {
        idDomicilio: idDomicilio,
        estado: "n"
    };
    var url = "http://admin.tudomicilio.net/restaurante/cambiarEstadoDomicilio";
    //var url = "http://192.168.1.33/domicilios/restaurante/cambiarEstadoDomicilio";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {

        var json = eval("(" + msg + ")");
        if (json.msj == "exito") {
            alert("Domicilio Rechazado, Se le notificará al cliente la novedad !");
        } else if (json.msj == "no") {
            alert("Error en el servidor, intenta nuevamente");
        } else {
            alert("Error en el servidor, contactate con la empresa TuDomicilio ");
        }
    });
    $("#close2").click();
    cargarPedidios();
    //ubicarPedidos();

}

function cancelar() {
    var idDomicilio = $("#idCancelar").val();
    var data = {
        idDomicilio: idDomicilio,
        estado: "c"
    };
    var url = "http://admin.tudomicilio.net/restaurante/cambiarEstadoDomicilio";
    //var url = "http://192.168.1.33/domicilios/restaurante/cambiarEstadoDomicilio";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {

        var json = eval("(" + msg + ")");
        if (json.msj == "exito") {
            alert("Domicilio Cancelado, Se le notificará al cliente la novedad !");
        } else if (json.msj == "no") {
            alert("Error en el servidor, intenta nuevamente");
        } else {
            alert("Error en el servidor, contactate con la empresa TuDomicilio ");
        }
        $("#close3").click();
        cargarPedidios();
        //ubicarPedidos();
    });
}

function listo() {
    var idDomicilio = $("#idListo").val();
    var data = {
        idDomicilio: idDomicilio,
        estado: "l"
    };
    
    var url = "http://admin.tudomicilio.net/restaurante/cambiarEstadoDomicilio";
    //var url = "http://192.168.1.33/domicilios/restaurante/cambiarEstadoDomicilio";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {

        var json = eval("(" + msg + ")");
        if (json.msj == "exito") {
            alert("Domicilio Listo, Se le notificará al cliente la novedad !");
        } else if (json.msj == "no") {
            alert("Error en el servidor, intenta nuevamente");
        } else {
            alert("Error en el servidor, contactate con la empresa TuDomicilio ");
        }
        $("#close4").click();
        cargarPedidios();
        //ubicarPedidos();

    });
}

function listo2() {
    var idServicio = $("#idListo2").val();
    var data = {
        idServicio: idServicio,
        estado: "l"
    };
    
    var url = "http://admin.tudomicilio.net/restaurante/cambiarEstadoServicio";
    //var url = "http://192.168.1.33/domicilios/restaurante/cambiarEstadoDomicilio";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {

        var json = eval("(" + msg + ")");
        if (json.msj == "exito") {
            alert("Servicio Listo, Se le notificará al cliente la novedad !");
        } else if (json.msj == "no") {
            alert("Error en el servidor, intenta nuevamente");
        } else {
            alert("Error en el servidor, contactate con la empresa TuDomicilio ");
        }
        $("#close7").click();
        cargarPedidios();
        //ubicarPedidos();

    });
}

function entregado2() {
    
    var idServicio = $("#idEntregado2").val();
    var data = {
        idServicio: idServicio,
        estado: "e"
    };
    
    var url = "http://admin.tudomicilio.net/restaurante/cambiarEstadoServicio";
    //var url = "http://192.168.1.33/domicilios/restaurante/cambiarEstadoDomicilio";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {

        var json = eval("(" + msg + ")");
        if (json.msj == "exito") {
            alert("Exito, Se le notificará al cliente la novedad !");
        } else if (json.msj == "no") {
            alert("Error en el servidor, intenta nuevamente");
        } else {
            alert("Error en el servidor, contactate con la empresa TuDomicilio ");
        }
        $("#close8").click();
        cargarPedidios();
        //ubicarPedidos();
    });
}

function aceptar2() {
    var idServicio = $("#idAceptar2").val();
    var data = {
        idServicio: idServicio,
        estado: "a"
    };
    var url = "http://admin.tudomicilio.net/restaurante/cambiarEstadoServicio";
    //var url = "http://192.168.1.33/domicilios/restaurante/cambiarEstadoDomicilio";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {

        var json = eval("(" + msg + ")");
        if (json.msj == "exito") {
            alert("Domicilio Aceptado, Se le notificará al cliente la novedad !");
        } else if (json.msj == "no") {
            alert("Error en el servidor, intenta nuevamente");
        } else {
            alert("Error en el servidor, contactate con la empresa TuDomicilio ");
        }
        $("#close6").click();
        cargarPedidios();
        //ubicarPedidos();

    });
}