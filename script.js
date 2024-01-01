

$(document).ready(()=>{

    let apiKey = 'bdc_56a7d8d4697f4407935b120980f258b0';
    getLocation();

    const climatempo_token = '80383ef15d515451a3bcc16bd6f8b5c6';

    //Pega texto geral do brasil
    const api1 = 'https://apiadvisor.climatempo.com.br/api/v1/anl/synoptic/locale/BR?token=' + climatempo_token;
    $.ajax({
        method:'get',
        url: api1,
        success:(result)=>{
            $('.evento-pro-front-resolver').show();
            $('#msg').html(result[0].text);
        }
    });

    $.ajax({
        //Inicia o input no estado atual
        method:"get",
        url: 'https://api.bigdatacloud.net/data/ip-geolocation?lang=pt&key=' + apiKey,
        success:(data)=>{
            state = data.location.isoPrincipalSubdivisionCode.split('-')[1];
            var x = data.location.city;
            $('#location-input').val(x);
            obter_clima(x);
        }
    });
});


var climatempo_token = '80383ef15d515451a3bcc16bd6f8b5c6';


function obter_clima(estado)
{
    console.log(estado);
    const openweathermap = '2c65989416a1205d0ea77d800cbcb19b';
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + estado + '&appid=' + openweathermap + '&lang=pt_br';

    $.ajax({
        method:'get',
        url:url,
        success:(result)=>{
            $('.info-wind span').html(result.wind.speed + " Km/h");
            $('#imgtype').attr('src','images/' + (result.weather[0].main).toLowerCase() + '.png');
            $('.temperature').html((result.main.temp - 273.15).toFixed(1) + '<span>°C</span>');
            $('.description').html(result.weather[0].description);
            $("#humidade").html(result.main.humidity + "%");
  

        }
    });
}






function getLocation() {
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(showPosition);
    else
        x.innerHTML = "Geolocation is not supported by this browser.";
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitude: " + position.coords.longitude); 

}

const CONFIGURATION = {
    "ctaTitle": "Checkout",
    "mapOptions": {"center":{"lat":-14.2400,"lng":-53.1805},"fullscreenControl":false,"mapTypeControl":false,"streetViewControl":true,"zoom":11,"zoomControl":true,"maxZoom":22,"mapId":""},
    "mapsApiKey": "AIzaSyAKEKQxfBgKWb0N4WcgQWidTzHYc1REMF4",
    "capabilities": {"addressAutocompleteControl":true,"mapDisplayControl":false,"ctaControl":false}
  };
  
  const ADDRESS_COMPONENT_TYPES_IN_FORM = [
    'location',
    //'locality',
  ];
  
  function getFormInputElement(componentType) {
    return document.getElementById(`${componentType}-input`);
  }
  
async function initMap() {
    const {Autocomplete} = google.maps.places;
  
    const autocomplete = new Autocomplete(getFormInputElement('location'), {
      fields: ['address_components','geometry', 'name'],
      types: ['address'],
    });
  
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        console.log(`No details available for input: '${place.name}'`);
        return;
      }
    });
  }
  