$(document).ready(main);
 
var contador = 1;
var contador2 = 1;
 
function main () {
	$('.mn').click(function(){
		if (contador == 1) {
			$('nav').animate({
				left: '0'
			});
			contador = 0;
		} else {
			contador = 1;
			$('nav').animate({
				left: '-100%'
			});
		}
	});
    
    $('.mn2').click(function(){
		if (contador2 == 1) {
			$('aside').animate({
				right: '0'
			});
			contador2 = 0;
		} else {
			contador2 = 1;
			$('aside').animate({
				right: '-100%'
			});
		}
	});
}


 document.writeln('<nav id="menu">');		
     document.writeln('<div class="col-100 menu-lateral-left2 bg-blanco text-center padding-1em">');
         document.writeln('<h2 class="text-gris bullet">Usuario: Juan Flores</h2>');
         document.writeln('<a href="#">');
             document.writeln('<div class="btn-dorado margin-centro">');
                 document.writeln('<span class="fa fa-user"></span> Ver mi perfil');
             document.writeln('</div>');
         document.writeln('</a>');

         document.writeln('<ul class="text-left padding-0 bg-gris-claro margin-no-espacios margin-vertical-1em" >');
             document.writeln('<a href="principal.html"><li><span class="fa fa-bu llhorn"></span> Inicio <span class="fa fa-chevron-right pull-right"></span></li></a>');
             document.writeln('<a onclick="cerrarApp();"><li><span class="fa fa-g ift"></span> Salir <span class="fa fa-chevron-right pull-right"></span></li></a>');
         document.writeln('</ul>');
     document.writeln('</div>');
 document.writeln('</nav>');




