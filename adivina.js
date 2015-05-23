//url en navegador, bootstrap, css solucion, hacer geojson
i=0
var nombres = []
var coordenadas = []
var auxdata;
var aleatorio;
var user;
var solucion;
var tipo;
var timer = ''
var estado = 0
var final;

jQuery(document).ready(function(){
     $('#dificultad,#juegos,#panel,#historial,.row,#historial,#historial1').hide()

    $('#empieza').click(function(){
        $('.jumbotron,#abortar,#iniciar,#abortar').hide()
        $('#panel,.row,#map,#fot').show()
    })
   
    

    $('#iniciar').click(function(){
        map.on('click', function(e) {
            var popup = L.popup()
            .setLatLng(e.latlng)
            .setContent('<p>Mi solución</p>')
            .openOn(map);
            comprobar(e.latlng)
        });
        dificultad = $("#dificultad option:selected").val()
        tipo = $("#juegos option:selected").val()
        cogerJson(tipo)
        $('#abortar').show()
        $('#nuevo,#iniciar,#dificultad,#juegos,#historial,#historial1').hide()
            
    })

    $('#abortar').click(function(){
        if(timer != ''){
            clearInterval(timer)
        }
        $('#nuevo').show()
        $('#abortar,#iniciar,#dificultad,#juegos,#historial,#historial1').hide()

        html = "<img src='foto1.jpg' class='col-lg-6'></div>"; 
        $("#fot").html(html)
    })
    
    $('#historial').click(function(){
        $('#historial1').show()

    })

    

    $('#nuevo').click(function(){
        $('#abortar,#iniciar,#dificultad,#juegos,#historial').show()
        $('#nuevo').hide()
        html = "<img src='foto1.jpg' class='col-lg-6'></div>"; 
        $("#fot").html(html)
        $("#solu").html('Foto')
        $("#solu2").html('Mapa')  
        map.remove()
        map = L.map('map').setView([40.2838, -3.8215], 1);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        //window.history.go(-1)
        
    })

    window.addEventListener('popstate', function(event) {
            //llama a funcion con event.state

       // console.log(event.state.fecha)
        console.log('location ' + location.toString().split('?')[1])
        map.on('click', function(e) {
            var popup = L.popup()
            .setLatLng(e.latlng)
            .setContent('<p>Mi solución</p>')
            .openOn(map);
            comprobar(e.latlng)
        });
        dificultad = event.state.dificultad
        tipo = event.state.juego
        cogerJson(tipo)
        $('#abortar').show()
        $('#nuevo,#iniciar,#dificultad,#juegos,#historial,#historial1').hide()
        
    });

    var map = L.map('map').setView([40.2838, -3.8215], 1);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    function comprobar(usuario){
        user = L.marker([usuario.lat,usuario.lng]).addTo(map)
        .bindPopup('Mi solución')
        .openPopup();
        solucion = L.marker([coordenadas[aleatorio][0],coordenadas[aleatorio][1]]).addTo(map)
        .bindPopup('Localizacion exacta')
        .openPopup();
      
        map.off();
        clearInterval(timer)
        distancia = Math.round(usuario.distanceTo(solucion.getLatLng()))
        
        $('#nuevo').show()
        $('#abortar,#iniciar,#dificultad,#juegos,#historial').hide()
        html = "<p class = 'result'>La distancia entre los dos puntos es de: <br>" + distancia + " metros</p><p class = 'result'>Tu puntuación es de: <br><br>" + distancia*i + " puntos</p>";           
        $("#fot").html(html) 
        $("#solu").html('El lugar exacto de las fotos era: ' )
        $("#solu2").html(nombres[aleatorio]) 

        fecha = new Date()
        fecha = fecha.toString(fecha)
        fecha= fecha.split(' ')[2] + ' ' + fecha.split(' ')[1] + ' ' + fecha.split(' ')[3] 

        objeto={puntuacion:distancia*i,
              juego: tipo,
                dificultad:$("#dificultad option:selected").val(),
                fecha: fecha
        }
         
        if(tipo== 'Capital.json'){
            juegoVal = 'Capitales'
        }  

        estado++         

        $("#historial1").append('<button id =' + estado+  '>' + juegoVal + ': ' + objeto.puntuacion + ' puntos el ' + objeto.fecha +' Dificultad: ' + $("#dificultad option:selected").html() +'</button><br>')

        history.pushState(objeto,'','?'+ estado );

        $('#' + estado ).click(function(){
            final = (estado - $(this).attr("id"))* -1
          console.log(final + $(this).attr("id"))
            if(final != 0){
                    history.go(final);
            }else{
                $( "#iniciar" ).trigger( "click" );

            }
            
            

        })
    }

    function cogerJson(nombre){
        console.log(nombre)
        $.getJSON('juegos/' + nombre ,function(data){
            data.features.forEach(function(sitio){                
                nombres.push(sitio.properties.name);
                coordenadas.push(sitio.geometry.coordinates);
            });
            aux()
        }) 
        
    }

    function aux(){
        aleatorio = Math.round(Math.random()*5);
        i=0;
        fotos(nombres[aleatorio])
        timer = setInterval(function () {fotos(nombres[aleatorio])}, dificultad);        
    }
    


    function fotos(tag){
        if(i<10){
            i++
            $.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?&tags=" + tag + "&tagmode=any&format=json&jsoncallback=?",
                function(data){
                    html = "<img src=" + data.items[i].media.m + " class='col-lg-6'>";           
                    $("#fot").html(html)
                }  
            )
        }else{
            html = "<img src='fin.jpg' class='col-lg-6'>";           
            $("#fot").html(html)
        }
    }
    
});

