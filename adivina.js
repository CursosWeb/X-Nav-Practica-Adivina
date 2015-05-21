i=0
var nombres = []
var coordenadas = []
var auxdata;
var aleatorio;

jQuery(document).ready(function(){
    var todo = {
            nombres : [],
            coordenadas : []
    }
        $('#dificultad,#juegos,#panel,.row').hide()

    $('#empieza').click(function(){
        $('.jumbotron,#abortar,#iniciar,#abortar').hide()
        $('#panel,.row,#map,#fot').show()
    })
    

    $('#iniciar').click(function(){
        map.on('click', function(e) {
            var popup = L.popup()
            .setLatLng(e.latlng)
            //.setContent('<p>'+e.latlng+ '</p>')
            .setContent('<p>Mi solución</p>')
            .openOn(map);
            comprobar(e.latlng)
        });
        dificultad = $("#dificultad option:selected").val()
        tipo = $("#juegos option:selected").val()
        todo = cogerJson(tipo)
        $('#abortar').show()
        $('#nuevo,#iniciar,#dificultad,#juegos').hide()
            
    })

    $('#abortar').click(function(){
        clearInterval(timer)
        $('#nuevo').show()
        $('#abortar,#iniciar,#dificultad,#juegos').hide()

        html = "<img src='foto1.jpg' class='col-lg-6'></div>"; 
        $("#fot").html(html)
    })

    $('#nuevo').click(function(){
        $('#abortar,#iniciar,#dificultad,#juegos').show()
        $('#nuevo').hide()
        
    })

    var map = L.map('map').setView([40.2838, -3.8215], 1);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    /*L.marker([0,0]).addTo(map)
        .bindPopup('Localizacion exacta')
        .openPopup();*/

    function comprobar(usuario){
        L.marker([coordenadas[aleatorio][0],coordenadas[aleatorio][1]]).addTo(map)
        .bindPopup('Localizacion exacta')
        .openPopup();
        L.marker([usuario.lat,usuario.lng]).addTo(map)
        .bindPopup('Mi solución')
        .openPopup();
        console.log('usuario ' + usuario.lat + usuario.lng)
        console.log('verdad ' + coordenadas[aleatorio] )
    }

    function cogerJson(nombre){
        
        $.getJSON('juegos/' + nombre ,function(data){
            data.features.forEach(function(sitio){                
                nombres.push(sitio.properties.name);
                coordenadas.push(sitio.geometry.coordinates);
            });
            aux()
        }) 
        
    }

    function aux(){
        aleatorio = Math.round(Math.random()*6);
        i=0;
        fotos(nombres[aleatorio])
        console.log('juego: ' + nombres[aleatorio])
        timer = setInterval(function () {fotos(nombres[aleatorio])}, dificultad);        
    }
    


    function fotos(tag){
        if(i<10){
            i++
            $.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?&tags=" + tag + "&tagmode=any&format=json&jsoncallback=?",
                function(data){
                    html = "<img src=" + data.items[i].media.m + " class='col-lg-6'></div>";           
                    $("#fot").html(html)
                }  
            )
        }else{
            html = "<img src='fin.jpg' class='col-lg-6'></div>";           
            $("#fot").html(html)
        }
    }
    
});







