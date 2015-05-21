i=0
jQuery(document).ready(function(){
    

        $('#dificultad,#juegos,#panel,.row').hide()

    $('#empieza').click(function(){
        $('.jumbotron,#abortar,#iniciar,#abortar').hide()
        $('#panel,.row,#map,#fot').show()
    })
    
    $('#em').click(function(){
        console.log($("#gameDifficulty option:selected").val())
        
    })

    $('#iniciar').click(function(){
        map.on('click', function(e) {
            var popup = L.popup()
            .setLatLng(e.latlng)
            //.setContent('<p>'+e.latlng+ '</p>')
            .setContent('<p>Mi solución</p>')
            .openOn(map);
        });
        dificultad = $("#dificultad option:selected").val()
        $('#abortar').show()
        $('#nuevo,#iniciar,#dificultad,#juegos').hide()
        fotos('oporto')
        timer = setInterval(function () {fotos('oporto')}, dificultad);     
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


    


    function fotos(tag){
        i++
        $.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?&tags="+tag+"&tagmode=any&format=json&jsoncallback=?",
            function(data){
                html = "<img src="+data.items[i].media.m+" class='col-lg-6'>";           
                html += "</div>";     
                $("#fot").html(html)
            }  
        )
    }
/*
console.log(tag);
	$.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?tags="
		+tag+"&tagmode=any&format=json&jsoncallback=?",function(data){

		resetCarousel();

		for(i in data.items){
			
			html = "<div class='item'>";
            html += "<img src="+data.items[i].media.m+" >";
            html += "<div class='container'>";
            html += "<div class='carousel-caption'>";
            html += "</div></div></div></div>";     
            $('.carousel-inner').append(html);
            if(i == 10){
            	break;
            }
		}
	});

    */
    
});







