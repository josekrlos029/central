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

function cerrarSesion(){
    
    localStorage.setItem("idCentral", "");
    location.href= "index.html";
    
}

function update() {

    var regid = localStorage.getItem("regId");
    var idCentral = localStorage.getItem("idCentral");

    var data = {
        regId: regid,
        idCentral: idCentral
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

function listaMensajeros(){
    
    var data = {
       idCentral: localStorage.getItem("idCentral")
    };

    var url = "http://admin.tudomicilio.net/restaurante/listarMensajeros";
    
    $.ajax({
        type: "POST",
        async: false,
        url: url,
        data: data
    })
            .done(function(msg) {
                
                $("#mensajero").html(msg);
    });
    
}

function updateMensajeroDomicilio() {

    var idMensajero = $("#mensajero").val();
    var idDomicilio = $("#idDomi").val();
    
    alert("m="+idMensajero+" d="+idDomicilio);
    
    var data = {
        idMensajero: idMensajero,
        idDomicilio: idDomicilio
    };

    var url = "http://admin.tudomicilio.net/restaurante/asignarMensajero";
    
    $.ajax({
        type: "POST",
        url: url,
        data: data
    })
            .done(function(msg) {
                var json = eval("(" + msg + ")");
                if (json.msj == "exito") {
                    alert("Solicitud Procesada Correctamente");
                    $("#close9").click();
                    cargarPedidios();
                } else if (json.msj == "no") {
                    alert("Error al Asignar Mensajero al Domicilio, Intenta nuevamente");
                } else {
                    alert("Error en el servidor, intenta nuevamente. ");
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

    var idCentral = localStorage.getItem("idCentral");

    var data = {
        idCentral: idCentral
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

function popAsignarDomicilio(idDomicilio) {
    $("#idDomi").val(idDomicilio);
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
    listaMensajeros();
    $.mobile.loading("hide");
}

function popAsignarServicio(idServicio) {
    $("#idServ").val(idServicio);
    listaMensajeros();
}

function entregado() {
    
    var idDomicilio = $("#idEntregado").val();
    var data = {
        idDomicilio: idDomicilio,
        idCentral: localStorage.getItem("idCentral"),
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
        idCentral: localStorage.getItem("idCentral"),
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
        idCentral: localStorage.getItem("idCentral"),
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
        idCentral: localStorage.getItem("idCentral"),
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
        idCentral: localStorage.getItem("idCentral"),
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
        idCentral: localStorage.getItem("idCentral"),
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
        idCentral: localStorage.getItem("idCentral"),
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
        idCentral: localStorage.getItem("idCentral"),
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

function verEnMapa(latR, lngR, latU, lngU) {
                removeMarkers();
                mapa.addMarker({
                    lat: latR,
                    lng: lngR,
                    title: 'Restaurante',
                    animation: google.maps.Animation.DROP,
                    click: function(e) {
                    }
                });
                mapa.addMarker({
                    lat: latU,
                    lng: lngU,
                    title: 'Usuario',
                    animation: google.maps.Animation.DROP,
                    click: function(e) {
                    }
                });
                mapa.drawRoute({
                    origin: [latR, lngR],
                    destination: [latU, lngU],
                    travelMode: 'driving',
                    strokeColor: '#131540',
                    strokeOpacity: 0.6,
                    strokeWeight: 6
                });
            }