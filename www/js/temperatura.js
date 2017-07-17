function consumeTemperatura(){
    _preloader("Obteniendo lecturas de Temperatura...",false);
    console.log("consumeTemperatura");

    $.ajax({
        url: urlWebService+"Ws_Temperatura?Id_Device=1&Temperatura_Action=get",
		type:'GET',
		success:function(re){
            
            var ObjJSON=[];
            var bandera = 0;
            var identificador =0;
            var data = {};
             $.each($(re).find('Lecturas'),function(){
                 $(this).children().each(function(i,elem){
                     var fecha = $(elem).find('TEM_FECHASTRING').text().split("/");
                     var fecha_sql = fecha[2]+"/"+fecha[1]+"/"+fecha[0];
                     
                      if(hoy_test == fecha_sql){
                         data[0] = $(elem).find('TEM_ID_TEMP').text();
                         data[1] = $(elem).find('TEM_ID_DEVICE').text();
                         data[2] = $(elem).find('TEM_FECHA').text();
                         data[3] = $(elem).find('TEM_HORA').text();
                         data[4] = $(elem).find('TEM_VALOR').text();
                         data[5] = fecha_sql;
                         data[6] = $(elem).find('TEM_HORASTRING').text();
                         ObjJSON.push({TEM_ID_TEMP: data[0],TEM_ID_DEVICE:data[1],TEM_FECHA:data[2],TEM_HORA:data[3],TEM_VALOR:data[4],TEM_FECHASTRING:data[5], TEM_HORASTRING:data[6]});
                      }
                     
                    /*if(ObjJSON.length==1000){
                         return false;
                     }*/
                });
                 
                //console.log(ObjJSON);
                 //con el arreglo armado, lo vamos recorriendo y vamos insertando en la base de datos.      
                 var cuantos = ObjJSON.length;
                 var contador = 0;
                 
                 if(cuantos == 0){
                    _preloader("",true);
                    $('#total_temperatura').text('N/A');
                }
                 
                 $.each(ObjJSON,function(k,valor){
                     if(contador==0){
                          _preloader("Procesando la información de Temperatura...");
                     }
                     if(hoy_test == ObjJSON[k].TEM_FECHASTRING){
                            base.inserta("INSERT OR IGNORE INTO temperatura (TEM_ID_TEMP, TEM_ID_DEVICE, TEM_FECHA, TEM_HORA, TEM_VALOR, TEM_FECHASTRING, TEM_HORASTRING) "+
                                "VALUES ('"+ObjJSON[k].TEM_ID_TEMP+"','"+ObjJSON[k].TEM_ID_DEVICE+"','"+ObjJSON[k].TEM_FECHA+"','"+ObjJSON[k].TEM_HORA+"','"+ObjJSON[k].TEM_VALOR+"','"+ObjJSON[k].TEM_FECHASTRING+"','"+ObjJSON[k].TEM_HORASTRING+"')",              
                                function(tx,respuesta){
                                    if(contador == (cuantos-1)){
                                        _preloader("",true);
                                        //promediarTemperatura();
                                        obtenerUltimoRegistroTemperatura();
                                     }
                                contador++;
                            });
                     }
                });

            });
            
		},
		error:function(re){
            //console.log("error: ");
            console.log(re);
            _preloader("",true);
		}
	});
}

function promediarTemperatura(){
    console.log("entro a la funcion de promediar Temperatura");
    
     base.crearBaseDeDatos(function(){
        //promediar para temperatura
            base.selecciona("SELECT TEM_FECHASTRING, AVG(TEM_VALOR*1.0) as TEM_VALOR  FROM temperatura WHERE TEM_FECHASTRING = '"+hoy_test+"'", function(tx1,res){
                if(res.rows.length>0){
                        for(var i=res.rows.length-1; i>=0; i--){
                            $('#total_temperatura').text(res.rows.item(i).TEM_VALOR.toFixed(2)+"° C");
                        }//for
                }else{
                                                //tipo,titulo,mensaje,btnConfirmLabel,callbackSuccess,btnCancelLabel,callbackError
                        _mensajeConfirmCancellCallback("info","Error al obtener los datos.","No hay registros para temperatura.","Entiendo",'','','');
                        $('#total_temperatura').text(0+"° C");
                        //$('#total_temperatura').text(promedio.toFixed(2)+"° C");
                }//if
            });
    });
}

function obtenerUltimoRegistroTemperatura(){
    console.log("entro a la funcion para obtener el ultimo registro de Temperatura");
     base.crearBaseDeDatos(function(){
        //promediar para temperatura
            base.selecciona("SELECT *  FROM temperatura ORDER BY TEM_FECHASTRING DESC", function(tx1,res){
                if(res.rows.length>0){
                        for(var i=res.rows.length-1; i>=0; i--){
                            if(i==(res.rows.length-1)){
                                console.log("TEMPERATURA "+res.rows.item(i).TEM_FECHASTRING+" a las "+res.rows.item(i).TEM_HORASTRING+" es : "+res.rows.item(i).TEM_VALOR);
                                $('#total_temperatura').text(res.rows.item(i).TEM_VALOR+"° C");
                            }
                        }//for
                }else{
                        //tipo,titulo,mensaje,btnConfirmLabel,callbackSuccess,btnCancelLabel,callbackError
                        _mensajeConfirmCancellCallback("info","Error al obtener los datos.","No hay registros para temperatura.","Entiendo",'','','');
                        $('#total_temperatura').text(0+"° C");
                        //$('#total_temperatura').text(promedio.toFixed(2)+"° C");
                }//if
            });
    });
}

function dropTemperatura(){
    _preloader("Eliminando la tabla");
    //console.log("Eliminando y creando la tabla de temperatura");
    consultas=[
        "DROP TABLE IF EXISTS temperatura"
       ,"CREATE TABLE IF NOT EXISTS temperatura (TEM_ID_TEMP INTEGER PRIMARY KEY, TEM_ID_DEVICE INT, TEM_FECHA INT, TEM_HORA INT, TEM_VALOR REAL, TEM_FECHASTRING STRING, TEM_HORASTRING STRING);"
    ];

    base.ejecuta(consultas, function(tx,res){
        console.log("Se elimino la tabla temperatura.");
        _preloader("",true);
    });
}
