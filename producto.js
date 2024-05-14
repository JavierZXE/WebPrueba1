$('.btnVista').click(function(e) {
    e.preventDefault();
    var marca = $('#inputMarca').val();
    var descripcion = $('#inputDescripcion').val();
    var precio = $('#inputPrecio').val();
    var stock = $('#inputStock').val();

    if($.trim(marca) == "" || $.trim(descripcion) == "" || $.trim(precio) == "" || $.trim(stock) == "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    var reader = new FileReader();
    reader.onload = function(e) {
        var imagen = e.target.result;

        var vistaPrevia = '<div class="card mb-4" style="width: 18rem;">' +
                                '<img src="' + imagen + '" class="card-img-top" alt="...">' +
                                '<div class="card-body">' +
                                  '<h5 class="card-title">' + marca + '</h5>' +
                                  '<p class="card-text">' + descripcion + '</p>' +
                                  '<p class="precio">$' + precio + '</p>' +
                                  '<p class="stock">Stock: <span class="stock-quantity">' + stock + '</span></p>' +
                                  '<button type="button" class="agregar btn btn-dark disabled">Añadir al carro</button>' +
                                '</div>' +
                            '</div>';

        $('.vistaprevia').html(vistaPrevia);
    };
    reader.readAsDataURL(document.getElementById('inputImagen').files[0]);
});
