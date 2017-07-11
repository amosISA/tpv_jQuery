# TPV - PROYECTO FINAL DWEC 
<br />
## Descripción 
Se trata de pasar los items de la zona de la izquierda a la zona del carrito. Luego sumar sus cantidades, rellenar factura y
toda una serie de características más con jQuery, ajax, html, css y algún archivo con contenido en php. 

<br />
![tpv](/uploads/b61ebf0a90c89361cbf1ae7ec46bd8ef/tpv.png)
<br /><br /><br /><br />

## INDEX 
* **Problemas del TPV** 
* **Parte 1 del TPV** 
  * Objeto literal
  * Draggable y droppable
  * Contador 
  * Resizable 
  * Selectable - Grid, Checkboxradio - Radiogroup, Controlgroup – Default Functionality
  * Datepicker
  * Sorteable y tooltip
  * Accordion 
  * Explicación zona sorteable (con muchos problemas)
  * Cómo funciona el tpv hasta la parte 1
* **Parte 2 del TPV** 
  * Slider - Range 
  * Cambiar color al pasar por zona droppable 
  * Creación 3 tabs 
  * Cargamos productos (ajax)
  * 4 animaciones 
  * Validación de la factura 
* **Implementación de localStorage**

<br /><br /><br />

## PROBLEMAS DEL TPV
- `No he implementado sortable porque da muchos problemas al relacionarlo con drag and drop` 

<br /><br /><br />

## Parte 1 del TPV 
### 1. El proyecto empieza con un objeto literal donde almaceno todas las funciones a utilizar:
Es en la primera función del objeto donde inicio las funciones que quiero que se ejecuten pues así se lo digo en $(document).ready(): 
```
var tpv = {
    init: function(){
        tpv.draggable();
        ... 
                
    }
                
};
$(document).ready(tpv.init);
```
<br /><br /><br />
### 2. Hacemos draggable y droppable tanto la zona de la izquierda como la zona del carrito (derecha): 
Mediante la utilización de la función tpv.purchasesSalesDraggableDroppable(); 

<br /><br /><br />
### 3. Añadimo contador en la parte superior del carrito: 
Esto lo he hecho sumando a una variable counter +1 o -1 dependiendo de si los items se dropan en la zona de la derecha o salen. Con el metodo 
.droppable hago la zona de la derecha dropable pues dentro tiene otro metodo: drop que llama a otra funcion la cual cuando se ejecuta es que 
se han dropado los items y es cuando sumo o resto al contador: 
```
counter ++;
drop: function(event, ui){
    tpv.deleteSale(ui.draggable);
}

deletePurchase: function($item){
    ....
    counter ++;
    $("#count").text(counter);
}
```

<br /><br /><br />
### 4. Hacemos resizable la zona del carrito (que no se pase de su padre y con un máximo y mínimo de altura y anchura que puede superar): 
```
resizable: function(){
   $( "#derecha" ).resizable({
       containment: "parent",
       maxWidth: 500,
       maxHeight: 620
    });
}
```

<br /><br /><br />
### 5. PAGO CON TARJETA: Selectable - Grid // Checkboxradio - Radiogroup // Tipos de tarjeta: Controlgroup – Default Functionality: 
Aquí tenemos un radio button para el pago en efectivo o para el pago con tarjeta. Los tres elementos estan escondidos pero si seleccionamos el pago con tarjeta aparecen: 
```
//los radiobuttons efectivo y tarjeta 
$( "#opcionesPago input" ).checkboxradio(); //fieldset con dos inputs 
$( "#opcionesPago" ).controlgroup();
$("#radio-1").prop("checked","true"); //por defecto el radio de efectivo esta a true 
$("#radio-1").checkboxradio("refresh");//al cambiar el estado del radio efectivo mediante jquery hay q refrescarlo 

//si seleccionamos en efectivo se esconde lo relacionado con las tarjetas
$("input:radio[id=radio-2]").click(function(){
    $("#selectable").show();
    $( "#opcionesTrajetas" ).show();
    $( "#payment" ).show();
});

$("input:radio[id=radio-1]").click(function(){
   $("#selectable").hide();
   $( "#opcionesTrajetas" ).hide();
    $( "#payment" ).hide();
});

//Para los tipos de tarjeta utilizamos un controlgroup (select con opciones): 
controlGroupOpcionesTarjetas: function(){
    $( ".controlgroup" ).controlgroup();
}

//para el selectable un ol li con 9 elementos 
$( "#selectable" ).selectable();

//boton para el pago con tarjeta personalizado con una imagen mia 
$('#payment').button({
    label: 'Pago con tarjeta',
    icons: {primary: 'my-custom-icon'}, //como primer estilo q coja esa clase q la tengo en el css
    iconPosition: "end"
});

.my-custom-icon {
    background-image: url(../img/euro.png) !important; //el important es para q sobreescriba si ya existe esta clase con este atributo 
    width: 5px;
    height: 5px;
}

```

<br /><br /><br />
### 6. El campo fecha del formulario tiene un datepicker 
### 7. Las imagenes del div de la izquierda son sorteables y tienen un tooltip asociado 
### 8. Para las factura añadimos un accordion 

<br /><br /><br />
### 9. Explicación zona sorteable: 
Hacer sorteable la zona de los productos (lista de la izquierda): 
```
$("#izquierda").sortable({
    containment: "document",
    connectWith: "#derecha",
    helper: "clone",
    items: "> li"
}).disableSelection();
```

Aquí hacemos q la zona del carrito acepte items sorteables de la zona de la izquierda -> connectWith: "#derecha", 
es decir, conectamos la zona derecha con la izquierda 
Luego se sortean los items de la zona q sean hijos directos -> items: "> li"
helper: clone -> para q no haya problemas como lo dice la API debe ser clone -> The helper option must be set to "clone" 
in order to work flawlessly. -> esto es asi pq en el draggable ponemos el helper a original
```
$("li", $purchases).draggable({
    cancel: "a.ui-icon", 
    revert: "invalid", 
    containment: "parent",
    connectToSortable: '#izquierda',
    helper: "original",
    cursor: "move"
});
```
Aquí hemos puesto containment: parent -> esto quiere decir q los li solo pueden navegar dentro de su padre, esto es, 
el #izquierda: Sin embargo, si ponemos float:left tanto al #izquierda como a los li podrán ser draggables 
	
Además el connectToSortable: '#izquierda', quiere decir q esa lista q es draggable se conecta con sus elementos  
que son sortable 

<br /><br /><br />
### 10. ¿CÓMO FUNCIONA LA APLICACIÓN HASTA LA PRIMERA PARTE DEL TPV? 
- Se pasan los productos al carrito 
- Click en el botón 'Cambiar cantidades': se actualiza el progressbar y abajo se crea una tabla con las cantidades a sumar (spinner) 
- Ahora pasamos a ver el precio haciendo click en el botón 'Calcular precio'
- Se nos habilita la zona del formulario 
- La rellenamos 
- Hacemos click en el botón 'Rellenar datos factura' 
- Y listo: ya tenemos el listado de las facturas mediante el Accordion!
- Luego nos saldrá una ventana parecido al confirm de javascript donde si hacemos click en confrimar se reinicia el progressbar y podemos 
- añadir más productos, y si hacemos click en cancelar solo cerramos la alerta (dialogConfirm: function())


<br /><br /><br /><br />
## Parte 2 del TPV 
### 1. Slider - Range 
Slider con los precios de los productos (había un ejemplo parecido por stackoverflow): 
A los productos le estableces un atributo data-price q contendrá su precio y luego mediante la siguiente función 
los listamos o los escondemos: 
```
//aqui primero los escondemos y luego si su precio se encuentra entre el rango del slider lo mostramos
function showProducts(minPrice, maxPrice) {
    $("#izquierda li").hide().filter(function() {
        var price = parseInt($(this).data("price"), 10);
        return price >= minPrice && price <= maxPrice;
    }).show();
    }
```

<br /><br /><br />
### 2. Cuando pasamos por encima de la zona dropable cambia de color 

<br /><br /><br />
### 3. Creamos 3 tabs: 
- Uno para la calculadora: tiene un js y un css aparte (calculadora.css // calculadora.js)

- Otro para buscar productos -> guardamos todos los productos en un array y luego los recorremos y si el input coincide con su descripción lo mostramos

- Y uno último para crear productos -> tenemos 3 inputs text (descripcion, precio y ruta de la imagen). Luego a partir de esos 3 creamos un objeto y lo metemos 
en el array definido como global (myProductsJSON[]). Pero antes vaciamos el array y luego volvemos a recorrer metemos todos los productos más este último. Y por último 
con ajax lo metemos al archivo json. 

Aquí para subir la imagen a nuestra carpeta tenemos el siguiente código: 
```
var formdata = new FormData($form[0]);

var request = new XMLHttpRequest();
request.open("post","upload.php"); //en este archivo php subimos la imagen de la carpeta temporal a la img/ 
request.send(formdata); //le pasamos la info del formulario 

//truco para coger la ruta 
var imageValue = $("#fileImage").val(); //aquí da algo como c://fakpath/k1.jpg
var imageSplit = imageValue.split("\\"); //hago un split de lo anterior y da un array con las posiciones: c:, fakpath, k1.jpg -> 3 posiciones 
var lastItem = imageSplit.slice(imageSplit.length-1); //aquí cogemos el ultimo item del array q es el q nos interesa (el nombre de la imagen subida -> k1.jpg)
var fileName = "img/"+lastItem[0]; -> le pasamos la ruta a nuestro objeto y luego lo guardamos en el json 
```

<br /><br /><br />	
### 4. Cargamos productos con ajax: mediante la función getItemsJSON(): 
Primero los recorremos todos y luego les asignamos propiedades: 
```
$.getJSON('items.json', function(data){
	... 
}
```

<br /><br /><br />
### 5. Implementar 4 animaciones: 
He implementado 2 (fold y puff) al mostrar el selectable de los numeros de la tarjeta y las opciones de la tarjeta. 
Luego otras 2 (slide y explode) al ocultar los mismo que arriba (selectable y opciones tarjeta).

<br /><br /><br />
### 6. Validación 
Lo he hecho con un js externo donde solo llamao a esa función cuando hago click en el botón de Rellenar datos factura: 
$("#create").click(function(){
    if(validacion()) tpv.factura();
});

<br /><br /><br />
### 6. Theme para el TPV 
Como tengo mi propio css. Es decir, no he copiado la url que usa jQuer ui para el css sino que para cada elemento de jQuery UI he ido copiando en mi css personalizado 
los mismos y los he modificado a mi gusto. 
Css: css/jqueryuicss.css
Y a cada elemento, botón... le he puesto unos colores (colores rojos claros). 


<br /><br /><br /><br />
## Implementación de localStorage
Todo empieza cuando hacemos click en Rellenar Datos Factura: 
```
//tpv.factura(); 

//aquí guardo en un array las cantidades de los spinners, los precios de los productos, y las descripciones 
var inputValues = $('.filaProd').map(function() {
   return $(this).val();
}).toArray();
//... asi con los otros dos 

//luego añado la info a un objeto 
infoTable.push({}); 

//y lo guardo en localStorage 
localStorage.setItem("infoFactura",JSON.stringify(infoTable));

//luego para mostrar la info cuando se actualice el navegador lo q hago es lo sigueinte en init(); 
if(localStorage.infoFactura){
    infoTable = JSON.parse(localStorage.infoFactura);
} 

//despues de esto muestro la info de localstorage 
tpv.mostramosAcordeonConLocalStorage();

//parseo la info de localstorage 
var sacarInfo = JSON.parse(localStorage.getItem("infoFactura"));

//y con un foreach voy sacando la info 
$.each(sacarInfo, function( index, value ) {} // .... 
```


































	
	
	
	
	
	
	
	
	
	
	
	
	