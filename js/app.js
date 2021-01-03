let $respuesta = document.querySelector('.respuesta');

window.addEventListener('load', () => {
    
    let $btn = document.getElementById('btn');
    $btn.addEventListener('click', consultar);

})

function consultar(){
    let $ciudad = document.getElementById('ciudad').value;
    let $pais = document.getElementById('pais').value;
    
    if( $ciudad == '' || $pais == ''){
        mensaje('Consulta no valida, Intente nuevamente', 'error');
    }else{
        consultaApi($ciudad, $pais);
    }
}

function mensaje(mensaje, tipo){

    limpiarHTML();

    let divMensaje = document.createElement('p');
    divMensaje.textContent = mensaje;
    divMensaje.classList.add(tipo);
    
    $respuesta.appendChild(divMensaje);

    setTimeout(() => {
        divMensaje.remove();
    }, 3000);
}

function consultaApi(ciudad, pais){

    preloader();

    const key = '5738cc97f790fa2d10f803faac03e070';
    url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${key}`;

    fetch(url)
        .then( res => res.json())
        .then( res => {
            let { main: { temp } } = res;
            let grados = temp - 273.15 //de kelvin a centigrados
            mostrarDatos(Math.round(grados), ciudad, pais);
        })
        .catch( error => mensaje('ciudad no encontrada', 'error'));

}

function mostrarDatos(grados, ciudad, pais){

    $respuesta.innerHTML = `
        <p>${ciudad} - ${pais}</p>
        <p class='clima'>${grados} &#xB0;</p>
    `;

}

function preloader(){

     $respuesta.innerHTML = `
     <div class="spinner">
         <div class="double-bounce1"></div>
         <div class="double-bounce2"></div>
     </div>
     `;

}

function limpiarHTML(){

    $respuesta.innerHTML = '';

    // if($respuesta.firstChild){
    //     $respuesta.removeChild($respuesta.firstChild);
    // }

}