window.onload = function () {
    //creo los arrays en los que guardare los datos
    aIdRegistro=new Array();
    aDireccion=new Array();
    aLatitud=new Array();
    aLongitud=new Array();

    IdRegistro=document.getElementById("IdRegistro");
    Direccion=document.getElementById("direccion");
    Latitud=document.getElementById("latitud");
    Longitud=document.getElementById("longitud");
    bSiguiente=document.getElementById("bSiguiente");
    bAnterior=document.getElementById("bAnterior");
    bModificar=document.getElementById("bModificar");
    bBorrar=document.getElementById("bBorrar");
    bTabla=document.getElementById("bTabla");
    bGrabar=document.getElementById("bGrabar");
    bNuevo=document.getElementById("bNuevo");
    posicion=0;

    cargarXml();

    bSiguiente.addEventListener("click", registroSiguiente, false);
    bAnterior.addEventListener("click", registroAnterior, false);
    bModificar.addEventListener("click", modificarRegistro, false);
    bNuevo.addEventListener("click", nuevo, false);
    bGrabar.addEventListener("click", grabar, false);
    bBorrar.addEventListener("click", borrarRegistro, false);
    bTabla.addEventListener("click", imprimirentabla, false);
}

function cargarXml(){
    //en esta función leemos los datos del fichero datos.js
    //en formato XML y lo transformamos en una coleccion de array

    var codigo=new DOMParser();
    var myXML=codigo.parseFromString(datosFichero, "text/xml");

   
    //guardo en los arrays la informacion del xml
    arrayIdRegistro=myXML.getElementsByTagName("idRegistro");
    arrayDireccion=myXML.getElementsByTagName("direccion");
    arrayLatitud=myXML.getElementsByTagName("latitud");
    arrayLongitud=myXML.getElementsByTagName("longitud");

    //guardo en arrays lo que obtengo del xml
    for (i=0; i<arrayIdRegistro.length; i++){
        aIdRegistro[i]=arrayIdRegistro[i].firstChild.nodeValue;
        aDireccion[i]=arrayDireccion[i].firstChild.nodeValue;
        aLatitud[i]=arrayLatitud[i].firstChild.nodeValue;
        aLongitud[i]=arrayLongitud[i].firstChild.nodeValue;
    }
    
    mostrarRegistro();
    
}

function mostrarRegistro(){
    //Visualizar el registro correspondiente a la posicion
    IdRegistro.value=aIdRegistro[posicion];
    Direccion.value=aDireccion[posicion];
    Latitud.value=aLatitud[posicion];
    Longitud.value=aLongitud[posicion];
}

function registroSiguiente(){
    posicion++;

    if (posicion>aIdRegistro.length-1){
        posicion=0;
    }
    mostrarRegistro();
}

function registroAnterior(){
    posicion--;

    if (posicion<0){
        posicion=0;
    }
    mostrarRegistro();
}

function modificarRegistro(){
    aIdRegistro[posicion]=IdRegistro.value;
    aDireccion[posicion]=Direccion.value;
    aLatitud[posicion]=Latitud.value;
    aLongitud[posicion]=Longitud.value;
}

function borrarRegistro(){
    aIdRegistro.splice(posicion,1);
    aDireccion.splice(posicion,1);
    aLatitud.splice(posicion,1);
    aLongitud.splice(posicion,1);

    posicion=0;
    mostrarRegistro(posicion);
}

function nuevo(){
    IdRegistro.value="";
    Direccion.value="";
    Latitud.value="";
    Longitud.value="";

}

function grabar(){
    aIdRegistro.push(IdRegistro.value);
    aDireccion.push(Direccion.value);
    aLatitud.push(Latitud.value);
    aLongitud.push(Longitud.value);
}

function imprimirentabla() {
    for (c = 0; c < aIdRegistro.length; c++) {
        var tabla = document.getElementById("tabla");
        var cuerpo = document.getElementById("cuerpo");
        linea = document.createElement("tr");
        parrafo = document.createElement("p");
        dato = document.createTextNode(aIdRegistro[c]);
        Columna = document.createElement("td");
        Columna.appendChild(dato);
        linea.appendChild(Columna);

        parrafo = document.createElement("p");
        dato = document.createTextNode(aDireccion[c]);
        Columna = document.createElement("td");
        Columna.appendChild(dato);
        linea.appendChild(Columna)

        parrafo = document.createElement("p");
        dato = document.createTextNode(aLatitud[c]);
        Columna = document.createElement("td");
        Columna.appendChild(dato);
        linea.appendChild(Columna)

        parrafo = document.createElement("p");
        dato = document.createTextNode(aLongitud[c]);
        Columna = document.createElement("td");
        Columna.appendChild(dato);
        linea.appendChild(Columna)

        cuerpo.appendChild(linea);
        
    }
    tabla.appendChild(cuerpo);
}