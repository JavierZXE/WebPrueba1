let carrito = [];

$(document).ready(function() {
  let storedCart = localStorage.getItem('carrito');
  if (storedCart) {
    carrito = JSON.parse(storedCart);
    renderCarrito();
  }
})

$('.agregar').click(function() {
  let card = $(this).closest('.card');
  let producto = {
    img: card.find('.card-img-top').attr('src'),
    title: card.find('.card-title').text(),
    description: card.find('.card-text').text(),
    precio: card.find('.precio').text(),
    cantidad: 1
  };
  addToCarrito(producto);
});

function addToCarrito(producto) {
  let exists = carrito.some(function(el) {
    return el.description === producto.description;
  });
  if (exists) {
    carrito.forEach(function(el) {
      if (el.description === producto.description) {
        el.cantidad++;
      }
    });
  } else {
    carrito.push(producto);
  }
  renderCarrito();
}

function renderCarrito() {
  $('.offcanvas-body').empty();
  if (carrito.length > 0) {
    carrito.forEach(function(producto) {
      let productoDiv = `
        <div class="row mb-2">
          <div class="col-3">
            <img src="${producto.img}" class="img-fluid">
            <button type="button" class="eliminar btn btn-danger"></button>
          </div>
          <div class="col-5">
            <h6>${producto.title}</h6>
            <p>${producto.description}</p>
          </div>
          <div class="col-4"> 
            <p class="precio">${producto.precio}</p>
            <input type="number" class="cantidad" min="1" value="${producto.cantidad}" max="${producto.stock}"> 
          </div>
        </div>
      `;
      $('.offcanvas-body').append(productoDiv);
    });
    $('.eliminar').click(function() {
      let description = $(this).parent().siblings('.col-5').children('p').text();
      carrito = carrito.filter(function(el) {
        return el.description !== description;
      });
      renderCarrito();
    });
  } else {
    $('.offcanvas-body').append("<p>Tu Carro Esta Vacio</p>");
  }
}

window.addEventListener('beforeunload', function() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
});

let exchangeRate;

$.getJSON('https://mindicador.cl/api', function(data) {
  exchangeRate = data.dolar.valor;
});

let preciosOriginales = [];

$('.dropdown-menu .dropdown-item').click(function() {
  let currency = $(this).text();
  
  if (currency === 'USD') {
    $('.precio').each(function() {
      let priceInPesos = Number($(this).text().replace('$', '').replace('.', ''));
      preciosOriginales.push(priceInPesos);
      
      let priceInDollars = (priceInPesos / exchangeRate).toFixed(2);
      $(this).text('$' + priceInDollars);
    });
  } else if (currency === 'CLP') {
    $('.precio').each(function(index) {
      let originalPrice = preciosOriginales[index];
      if (originalPrice) {
        $(this).text('$' + originalPrice.toLocaleString('de-DE'));
      }
    });
    preciosOriginales = [];
  }
});
