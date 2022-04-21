let latitudUsuario;
let longitudUsuario;

function iniciar() {
  var boton = document.getElementById('obtener');
  boton.addEventListener('click', obtener, false);
}


function obtener() {
  navigator.geolocation.getCurrentPosition(guardarCoordenadas, mostrarError);
}

function guardarCoordenadas(posicion) {
  var ubicacion = document.getElementById('ubicacion');
  var datos = '&nbsp;&nbsp; Ubicación:<br>';
  datos += '&nbsp;&nbsp; Latitud: ' + posicion.coords.latitude + '<br>';
  datos += '&nbsp;&nbsp; Longitud: ' + posicion.coords.longitude + '<br>';
  datos += '&nbsp;&nbsp;';
  ubicacion.innerHTML = datos;

  longitudUsuario = posicion.coords.longitude;
  latitudUsuario = posicion.coords.latitude;
  iniciarMap();
}

function mostrarError() {
  alert("Debe permitir acceso a la ubicación")
}


//Geolocalización
function iniciarMap() {

  var coordenadasUsuario = { lat: latitudUsuario, lng: longitudUsuario };
  var coord = { lat: 10.010948, lng: -84.204369 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: coord
  });


  var marker = new google.maps.Marker({
    position: coord, title: "Sucursal de AkiShop",
    map: map
  });

  var markerUsuario = new google.maps.Marker({
    position: coordenadasUsuario, title: "Tú ubicación",
    map: map
  });

  // Ubicación Usuario
  var origen = new google.maps.LatLng(latitudUsuario, longitudUsuario);
  // Ruta quemada
  var destino = new google.maps.LatLng(10.010948, -84.204369);
  var miRuta = [origen, destino];
  var trazo = new google.maps.Polyline({ path: miRuta, strokeColor: "#0000FF", strokeOpacity: 0.8, strokeWeight: 3 });
  trazo.setMap(map);
}

window.addEventListener('load', iniciar, false);
