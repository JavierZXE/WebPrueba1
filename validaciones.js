$('.btnEnviar').click(function(e) {
    e.preventDefault();
    var rut = $('#inputRut').val();
    var nombre = $('#inputNombre').val();
    var apellido = $('#inputApellido').val();
    var email = $('#inputEmail').val();
    var region = $('#inputRegion').val();
    var fechaNacimiento = $('#inputFechanacimiento').val();
    var gradoEducacion = $('#inputEducacion').val();

    if($.trim(rut) == "" || $.trim(nombre) == "" || $.trim(apellido) == "" || $.trim(email) == "" || region == null || fechaNacimiento == "" || gradoEducacion == null) {
        alert("Todos los campos son obligatorios");
        return;
    }

    var rutPattern = /^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/;
    if(!rutPattern.test(rut)) {
        alert("El Rut no es válido");
        $('#inputRut').focus();
        return;
    }

    var rutSinFormato = rut.replace(/\./g, '').split('-');
    var cuerpo = rutSinFormato[0];
    var dv = rutSinFormato[1].toUpperCase();
    var suma = 0;
    var multiplo = 2;
    for(var i=1; i<=cuerpo.length; i++) {
        var index = multiplo * cuerpo.charAt(cuerpo.length - i);
        suma = suma + index;
        if(multiplo < 7) {
            multiplo = multiplo + 1;
        } else {
            multiplo = 2;
        }
    }
    var dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11 ? 0 : dvEsperado;
    dvEsperado = dvEsperado === 10 ? 'K' : dvEsperado;
    if(dv != dvEsperado) {
        alert("El dígito verificador del Rut no es válido");
        $('#inputRut').focus();
        return;
    }

    var namePattern = /^[a-zA-Z\s]*$/;
    if(!namePattern.test(nombre)) {
        alert("El nombre solo debe contener letras");
        $('#inputNombre').focus();
        return;
    }
    if(!namePattern.test(apellido)) {
        alert("El apellido solo debe contener letras");
        $('#inputApellido').focus();
        return;
    }

    var emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if(!emailPattern.test(email)) {
        alert("El correo electrónico no es válido");
        $('#inputEmail').focus();
        return;
    }

    alert("Formulario enviado con éxito. Datos enviados:\nRut: " + rut + "\nNombre: " + nombre + "\nApellido: " + apellido + "\nEmail: " + email + "\nRegión: " + region + "\nFecha de Nacimiento: " + fechaNacimiento + "\nGrado de Educación: " + gradoEducacion);

    $('#inputRut').val('');
    $('#inputNombre').val('');
    $('#inputApellido').val('');
    $('#inputEmail').val('');
    $('#inputRegion').val('');
    $('#inputFechanacimiento').val('');
    $('#inputEducacion').val('');
});

$('.btnAnnadir').click(function(e) {
    e.preventDefault();
    var categoria = $('#inputCategoria').val();
    var imagen = $('#inputImagen').val();
    var marca = $('#inputMarca').val();
    var descripcion = $('#inputDescripcion').val();
    var precio = $('#inputPrecio').val();
    var stock = $('#inputStock').val();

    if(categoria == null || $.trim(imagen) == "" || $.trim(marca) == "" || $.trim(descripcion) == "" || $.trim(precio) == "" || $.trim(stock) == "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    var imagenExtension = imagen.substring(imagen.lastIndexOf('.') + 1).toLowerCase();
    if(imagenExtension != "webp" && imagenExtension != "png" && imagenExtension != "bmp" && imagenExtension != "jpeg" && imagenExtension != "jpg") {
        alert("La imagen debe ser un archivo de tipo imagen (gif, png, bmp, jpeg, jpg)");
        $('#inputImagen').focus();
        return;
    }

    var namePattern = /^[a-zA-Z\s]*$/;
    if(!namePattern.test(marca)) {
        alert("La marca solo debe contener letras");
        $('#inputMarca').focus();
        return;
    }
    if(!namePattern.test(descripcion)) {
        alert("La descripción solo debe contener letras");
        $('#inputDescripcion').focus();
        return;
    }

    var numberPattern = /^[1-9][0-9]*$/;
    if(!numberPattern.test(precio)) {
        alert("El precio solo debe contener números naturales");
        $('#inputPrecio').focus();
        return;
    }
    if(!numberPattern.test(stock)) {
        alert("El stock solo debe contener números naturales");
        $('#inputStock').focus();
        return;
    }

    alert("Formulario enviado con éxito. Datos enviados:\nCategoria: "+ categoria +"\nImagen: "+ imagen +"\nMarca: "+ marca +"\nDescripcion: "+ descripcion +"\nPrecio: "+ precio +"\nStock: "+ stock);

    $('inputCategoria').val('');
    $('inputImagen').val('');
    $('inputMarca').val('');
    $('inputDescripcion').val('');
    $('inputPrecio').val('');
    $('inputStock').val('');
});
