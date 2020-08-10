var nombre = document.getElementById("txtNombre");
var curp = document.getElementById("txtCurp");
var tel = document.getElementById("txtTelefono");
var ec = document.getElementById("txtEC");
var edad = document.getElementById("txtEdad");
var img = document.getElementById("txtimg");
var n = 0;

var lista = [{
    Nombre:"",
    Curp:"",
    Telefono:"",
    EstadoC:"",
    Edad:"",
    Imagen:""
}];

var Subir = function(){
    $("#tarjeta").empty();
    if(n==0){ //si el contador es 0, se toma la primer posición
        lista[0].Nombre=nombre.value;
        lista[0].Curp=curp.value;
        lista[0].Telefono=tel.value;
        lista[0].EstadoC=ec.value;
        lista[0].Edad=edad.value;
        lista[0].Imagen=img.value;
        n++;
    }
    else{ //crea un nuevo lugar en el arreglo
        lista.push({
            Nombre:nombre.value,
            Curp:curp.value,
            Telefono:tel.value,
            EstadoC:ec.value,
            Edad:edad.value,
            Imagen:img.value
        });
    }
    //https://i.pinimg.com/originals/05/29/60/0529605c95db0636eb5778ad34a855a9.jpg
    for(var i=0;i<=lista.length;i++){
        $("#tarjeta").append('<div class="bg-secondary text-white mx-auto row" ><img src="'+lista[i].Imagen+'"id="imgPrin" class="col-3" style="margin: 4px; height: 100%; width:100%"><div class="col-5"><img  src="img/man-user.png"><p id="Nom">Nombre: '+lista[i].Nombre+' </p><img src="img/tag.png"><p id="CURP">CURP: '+lista[i].Curp+'</p><img src="img/users-relation.png"><p id="EC">Estado Civil: '+lista[i].EstadoC+'</p></div><div class="col"><img src="img/call-answer.png"><p id="Tel">Teléfono: '+lista[i].Telefono+'</p><img src="img/plus-18-movie.png"><p id="Edad">Edad: '+lista[i].Edad+'</p></div></div>')
    }
}

var reset = function(){
    $("#tarjeta").empty()
    for(var r = datos.length;r>=0;r--){
        if(r==0){
            lista[0].Nombre=null;
            lista[0].Curp=null;
            lista[0].Telefono=null;
            lista[0].EstadoC=null;
            lista[0].Edad=null;
            n=0;
        }
        else{
            lista.pop();
        }
    }
}

var buscar = function(){
    $("#tarjeta").empty()
        for(var b =0;b<=lista.length;b++){
            if(lista[b].Nombre.includes(txtBuscar.value)){
                $("#tarjeta").append('<div class="bg-secondary text-white mx-auto row" ><img src="'+lista[b].Imagen+'"id="imgPrin" class="col-3" style="margin: 4px; height: 100%; width:100%"><div class="col-5"><img  src="img/man-user.png"><p id="Nom">Nombre: '+lista[b].Nombre+' </p><img src="img/tag.png"><p id="CURP">CURP: '+lista[b].Curp+'</p><img src="img/users-relation.png"><p id="EC">Estado Civil: '+lista[b].EstadoC+'</p></div><div class="col"><img src="img/call-answer.png"><p id="Tel">Teléfono: '+lista[b].Telefono+'</p><img src="img/plus-18-movie.png"><p id="Edad">Edad: '+lista[b].Edad+'</p></div></div>')
        }
    }
}
