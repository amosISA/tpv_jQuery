function validacion(){
	$(".error").remove();

	//Campo número factura
	if($("#ifac").val() != ""){
		$("#ifac").focus().after("<span class='error'>El campo factura debe estar vacío, se autoincrementa!</span>");
           return false;
	}

	//Campo Nombre
	if($("#inombre").val() == ""){
		$("#inombre").focus().after("<span class='error'>Ingrese su nombre</span>");
           return false;
	}

	//Campo DNI
    var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
    var nie = $("#idni").val();

    if( !(/^\d{8}[A-Z]$/.test(nie)) && nie.charAt(8) != letras[(nie.substring(0, 8))%23]) { //q este formado por 8 numeros seguidos y una letra correcta
        $("#idni").focus().after("<span class='error'>Ingrese su dni</span>");
        return false;
    }

	//Campo Domicilio
	if($("#idomicilio").val() == ""){
		$("#idomicilio").focus().after("<span class='error'>Ingrese su domicilio</span>");
           return false;
	}

	//Campo IBAN
	//MS22-2222-2222-22-2222222222
	var ib = $("#iiban");
    if(!validariban(ib)){
		$("#iiban").focus().after("<span class='error'>El formato del IBAN debe ser: MS22-2222-2222-22-2222222222</span>");
        return false;
    }

	//Campo date
	if($("#datepicker").val() == ""){
		$("#datepicker").focus().after("<span class='error'>La fecha no puede estar vacía</span>");
           return false;
	}

	return true;
}

function validariban(str){
	var iban = str.val();
	var m = iban.match(/^[A-Z][A-Z][0-9][0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/);
	if (m){
		return true;
	}else
		return false;
}
