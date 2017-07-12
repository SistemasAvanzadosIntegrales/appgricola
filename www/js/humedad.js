
function consumeHumedad(){
    cargandoDatos();
    
    _preloader("Obteniendo lecturas de Humedad...",false);
    console.log("consumeHumedad");
   
    $.ajax({
        url: urlWebService+"Ws_Humedad?Id_Device=1&Humedad_Action=get",
		type:'GET',
		success:function(re){
            console.log(re);
            var ObjJSON=[];
            var bandera = 0;
            var identificador =0;
            var data = {};

            $.each($(re).find('Lecturas'),function(){
                 $(this).children().each(function(i,elem){
                        //las lecturas las almacenamos en un objeto
                        var fecha = $(elem).find('HUM_FECHASTRING').text().split("/");
                        var fecha_sql = fecha[2]+"/"+fecha[1]+"/"+fecha[0];
                     
                     
                     if(hoy_test == fecha_sql){
                         data[0] = $(elem).find('HUM_ID_TEMP').text();
                         data[1] = $(elem).find('HUM_ID_DEVICE').text();
                         data[2] = $(elem).find('HUM_FECHA').text();
                         data[3] = $(elem).find('HUM_HORA').text();
                         data[4] = $(elem).find('HUM_VALOR').text();
                         data[5] = fecha_sql;
                         data[6] = $(elem).find('HUM_HORASTRING').text();
                         
                         ObjJSON.push({HUM_ID_TEMP: data[0],HUM_ID_DEVICE:data[1],HUM_FECHA:data[2],HUM_HORA:data[3],HUM_VALOR:data[4],HUM_FECHASTRING:data[5],HUM_HORASTRING:data[6]});

                        /*
                        debugg para que no guarde mas de 1000 registros
                        if(ObjJSON.length==1000){
                             return false;
                         }*/
                     }

                }); 
                 
                 //console.log(ObjJSON);
                 //console.log("cuantos: "+ObjJSON.length);
                
                 //con el arreglo armado, lo vamos recorriendo y vamos insertando en la base de datos.
                 var cuantos = ObjJSON.length;
                 var contador = 0;
                if(cuantos == 0){
                    _preloader("",true);
                    $('#total_humedad').text('N/A');
                    consumeTemperatura();
                }
                 $.each(ObjJSON,function(k,valor){
                     if(contador==0){
                          _preloader("Procesando la información de Humedad...",false);
                     }
                     //console.log(ObjJSON[k].HUM_FECHASTRING);
                     if(hoy_test == ObjJSON[k].HUM_FECHASTRING){
                            base.inserta("INSERT OR IGNORE INTO humedad(HUM_ID_TEMP, HUM_ID_DEVICE, HUM_FECHA, HUM_HORA, HUM_VALOR, HUM_FECHASTRING, HUM_HORASTRING) "+
                                    "VALUES ("+ObjJSON[k].HUM_ID_TEMP+","+ObjJSON[k].HUM_ID_DEVICE+","+ObjJSON[k].HUM_FECHA+","+ObjJSON[k].HUM_HORA+",'"+ObjJSON[k].HUM_VALOR+"','"+ObjJSON[k].HUM_FECHASTRING+"','"+ObjJSON[k].HUM_HORASTRING+"')",
                                    function(tx,respuesta){
                                    console.log("cuantos: "+cuantos+" : "+contador);
                                       if(contador == (cuantos-1)){
                                            _preloader("",true);
                                            promediarHumedad();
                                            consumeTemperatura();
                                         }
                                contador++;
                            });
                     }
                    
                });
                //return false;
                   // promedio = total_humedad/contador_humedad;
                    //$('#total_humedad').text(promedio.toFixed(2));
                      //_preloader("Terminado.",true);
                    
                 
            });
            
		},
		error:function(re){
            //console.log("error: ");
            console.log(re);
            _preloader("",true);
		}
	});
}

function promediarHumedad(){
    console.log("entro a la funcion de promediar Humedad");
    base.crearBaseDeDatos(function(){
            //promediar para humedad
            base.selecciona("SELECT HUM_FECHASTRING, AVG(HUM_VALOR*1.0) as HUM_VALOR  FROM humedad WHERE HUM_FECHASTRING = '"+hoy_test+"'", function(tx1,res){
                if(res.rows.length>0){
                        for(var i=res.rows.length-1; i>=0; i--){
                            $('#total_humedad').text(res.rows.item(i).HUM_VALOR.toFixed(2));
                        }//for
                }else{
                                                //tipo,titulo,mensaje,btnConfirmLabel,callbackSuccess,btnCancelLabel,callbackError
                    _mensajeConfirmCancellCallback("info","Error al obtener los datos.","No hay registros para humedad.","Entiendo",'','','');
                    $('#total_humedad').text(0);
                }//if
            }); 
    });   
}
function dropHumedad(){
    _preloader("Eliminando la tabla");
    console.log("Eliminando y creando la tabla de huemdad");
    consultas=[
        "DROP TABLE IF EXISTS humedad"
       ,"CREATE TABLE IF NOT EXISTS humedad (HUM_ID_TEMP INTEGER PRIMARY KEY, HUM_ID_DEVICE INT, HUM_FECHA INT, HUM_HORA INT, HUM_VALOR REAL, HUM_FECHASTRING STRING, HUM_HORASTRING STRING);"
    ];

    base.ejecuta(consultas, function(tx,res){
        console.log("Se elimino la tabla humedad.");
        _preloader("",true);
    });
}

