// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

/*
// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}
*/
var urlWebService ="http://mail.interseccion.com.mx:8901/";
var palaSecr="AppGricolaCycasa";
var f = new Date();
var f_anio = f.getFullYear();
var f_mes = f.getMonth() +1;
var f_dia = f.getDate();

var hoy_test = f_anio+ "/" + ((f_mes<10)?"0"+f_mes:f_mes) + "/" +((f_dia<10)?"0"+f_dia:f_dia);
console.log("La fecha es: "+hoy_test);
//var hoy_test = "2017/03/09";

$(document).ready(function(){

});//function

function _preloader(mensaje,closer){
    if(closer==true){
        swal.close();
    }else{
        swal({
          title: '<strong>Cargando...</strong>',
          //type: 'info',
          html:
            '<div class="text-center"><i>'+mensaje+'</i><br/>'+
            '<i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i></div>',
          showCloseButton: false,
          showCancelButton: false,
          allowOutsideClick: false,
          showConfirmButton:false,
          animation: false,
          customClass: 'animated jello'
        });
    }
    
}

function _mensajeConfirmCancellCallback(tipo,titulo,mensaje,btnConfirmLabel,callbackSuccess,btnCancelLabel,callbackError){
    
    if(btnCancelLabel!=''){
        mostrarCancelar = true;
    }else{
        mostrarCancelar = false;
    }
    
    swal({
      title: titulo,
      text: mensaje,
      type: tipo,
      showCancelButton: mostrarCancelar,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: btnConfirmLabel,
      cancelButtonText: btnCancelLabel,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      animation: false,
      customClass: 'animated jello'
    }).then(function() {
        
        if(callbackSuccess!=''){
           callbackSuccess(); 
        }
    }, function(dismiss) {
      if (dismiss === 'cancel') {
        if(callbackError!=''){
           callbackError(); 
        }
      }
    })
}

function clave(){
    var cara="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    clav="";
    for(var i=0; i<=20-1; i++){
        clav+=cara.substr(parseInt(Math.random()*cara.length),1);
    }//for
    return clav;
}//function

function quitaNull(txt){
    return txt==null?"":txt;
}//function




function irA(peticion,flotilla,id,idAutomovil,servicio_id,redireccion){
    var url='';

    switch(peticion){
        case "login":
            url='index.html';
            break;
        case "inicio":
            url='inicio.html';
            break;
    }
    if(peticion!="salir"){
        window.location = ''+url;
    }
}

function cerrarApp(){
    //almacenamiento.limpiarTodo();
//    navigator.app.exitApp();
    window.location.href = "index.html";
}

function permiteNumerosConDecimal(evt, obj)
{
    
    var charCode = (evt.which) ? evt.which : event.keyCode
    var value = obj.value;

    if(charCode==127 ||charCode==37 ||charCode==39)
        return true;
        
    var dotcontains = value.indexOf(".") != -1;
    if (dotcontains)
        if (charCode == 46) return false;
    if (charCode == 46 && value!='') return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;

}
function permiteNumerosSinDecimal(evt, obj)
{
    
    var charCode = (evt.which) ? evt.which : event.keyCode
    var value = obj.value;
    console.log(charCode);
    if(charCode==127 ||charCode==37 ||charCode==39)
        return true;
    var dotcontains = value.indexOf(".") != 1;
    if (dotcontains)
        if (charCode == 46) return false;
    if (charCode == 46) return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;

}

function permiteNumerosSinDecimalConGuionConEspacio(evt, obj)
{
    
    var charCode = (evt.which) ? evt.which : event.keyCode
    var value = obj.value;
    if(charCode==127 ||charCode==37 ||charCode==39)
        return true;
    var dotcontains = value.indexOf(".") != 1;
    var spacecontains = value.indexOf(" ") != -1;
    var guioncontains = value.indexOf("-") != -1;
    if (dotcontains)
        if (charCode == 46) return false;
    if (spacecontains)
        if (charCode == 32) return false;
    if (guioncontains)
        if (charCode == 45) return false;

    if (charCode == 46) return true;
    if (charCode == 32) return true;
    if (charCode == 45) return true;

    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;

}

$(document).ready(function(){
        
    var valor = 5.5;
    $(".dial").knob({
        'min':0,
        'max':10,
        'step':0.1,
        'readOnly':true
    });
    
    
    activando(valor);
    
    
});//function

function activando(val){
    $('.dial')
        .val(val)
        .trigger('change');

    if(val >= 0 && val < 4){
         $('.dial').trigger(
            'configure',
            {
                "min":0,
                "max":10,
                "fgColor":"#df0909"
            }
        );
    }
    if(val >= 4 && val < 8 ){
         $('.dial').trigger(
            'configure',
            {
                "min":0,
                "max":10,
                "fgColor":"#f7f95b"
            }
        );
    }
    if(val >= 8 && val < 11){
         $('.dial').trigger(
            'configure',
            {
                "min":0,
                "max":10,
                "fgColor":"#95f159"
            }
        );
    }

}

// Transaction error callback
//
function errorCB(tx, err) {
    alert("Error processing SQL: "+err);
}

// Transaction success callback
//
function successCB() {
    alert("success!");
}


function promediar(){
    console.log("entro a la funcion de promediar");
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

function cargandoDatos(){
    $('#total_humedad').html('<i class="fa fa-refresh fa-spin"></i>');
    $('#total_temperatura').html('<i class="fa fa-refresh fa-spin"></i>');
}