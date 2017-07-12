var db;
var base={};
base.consulta="";

$(document).ready(function(){
    console.log("ready");
    document.addEventListener("deviceready",
    function(){
        db=window.openDatabase("myDB", "1.0", "myDB", 50000000);
    }
    ,false);
});

base.crearBaseDeDatos=function(callback){
    console.log("creando base de datos en caso de que no exista");
    consultas=[
        //"DROP TABLE IF EXISTS temperatura;",
        //"DROP TABLE IF EXISTS humedad;",
        "CREATE TABLE IF NOT EXISTS temperatura(TEM_ID_TEMP INTEGER PRIMARY KEY, TEM_ID_DEVICE INT, TEM_FECHA INT, TEM_HORA INT, TEM_VALOR,TEM_FECHASTRING, TEM_HORASTRING);",
        "CREATE TABLE IF NOT EXISTS humedad(HUM_ID_TEMP INTEGER PRIMARY KEY, HUM_ID_DEVICE INT, HUM_FECHA INT, HUM_HORA INT, HUM_VALOR, HUM_FECHASTRING, HUM_HORASTRING);"
       ];
        //"DROP TABLE IF EXISTS temperatura"
        //,"DROP TABLE IF EXISTS humedad"
        //,"INSERT INTO temperatura(TEM_ID_TEMP,TEM_ID_DEVICE,TEM_FECHA,TEM_HORA,TEMP_VALOR) VALUES(43,1,78569,4578,78.56);"
        // ,"CREATE TABLE IF NOT EXISTS humedad(HUM_ID_TEMP INTEGER PRIMARY KEY, HUM_ID_DEVICE INT, HUM_FECHA INT, HUM_HORA INT, HUM_VALOR REAL)"
    
    base.ejecuta(consultas, callback);
    
}//function

function leerTabla(tabla){
    base.selecciona("SELECT * FROM "+tabla,
        function(tx, resultado){
            for(var i=0; i<=resultado.rows.length-1; i++){
                var temp="\r\n*";
                for(var prop in resultado.rows.item(i)){
                    temp+="'"+resultado.rows.item(i)[prop]+"', ";
                }//for
                console.log(temp);
                $("#txtSalida").val($("#txtSalida").val()+temp);
            }//for
        }//function
    );
}//function

base.ejecuta=function(cons, callback){
    db.transaction(function(tx){
        for(var i=0; i<=cons.length-1; i++){
            tx.executeSql(cons[i]);
            console.log("consulta: "+cons[i]);
        }//for
    },
    base.errorConsulta, callback);
}//function

base.selecciona=function(cons, respuesta){
    db.transaction(function(tx){
        console.log("tratando de ejecutar la consulta: "+cons);
        tx.executeSql(cons, [], respuesta, base.errorConsulta2);
    },base.errorConsulta, base.bienConsulta);
}//function

base.inserta=function(cons, respuesta,cuantos,contador,dibujar){
    /*if(cuantos==undefined || cuantos ==''){
        cuantos = 0;
    }
    if(contador==undefined || contador ==''){
        contador = 0;
    }*/
    
    db.transaction(function(tx){
        console.log("tratando de insertar la consulta: "+cons);
        //console.log(contador+" : "+(cuantos-1));
         /*if(contador == (cuantos-1)){
            _preloader("",true);
            if(dibujar==true){
                promediar();
            }
         }*/
        //tx.executeSql(cons, []);
        tx.executeSql(cons, [], respuesta, base.errorConsulta2);
    },base.errorConsulta, base.bienConsulta);
}//function

base.bienConsulta=function(e){
    
}//function

base.errorConsulta2=function(e){
    console.log(JSON.stringify(e));
            //tipo,titulo,mensaje,btnConfirmLabel,callbackSuccess,btnCancelLabel,callbackError
    _mensajeConfirmCancellCallback("warning","Error al obtener los datos.", "Descripción del error: "+JSON.stringify(e),"Entendido",'','','');
}//function

base.errorConsulta=function(e){
            //tipo,titulo,mensaje,btnConfirmLabel,callbackSuccess,btnCancelLabel,callbackError
    console.log("error consulta: "+JSON.stringify(e)+": "+e.code);
    _mensajeConfirmCancellCallback("warning","Error al obtener los datos.", "No se pudo establecer conexión.<br />Descripción del error: "+JSON.stringify(e),"Entendido",'','','');
}//function