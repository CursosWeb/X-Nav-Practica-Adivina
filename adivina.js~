jQuery(document).ready(function(){

        $('#dificultad,#juegos,#panel,.row').hide()

    $('#empieza').click(function(){
        $('.jumbotron').hide()
        $('#dificultad,#juegos,#panel,.row,#map,#fot').show()
    })
    
    $('#em').click(function(){
        console.log($("#gameDifficulty option:selected").val())
        
    })

    var map = L.map('map').setView([40.2838, -3.8215], 1);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    
    
});







