jQuery(document).ready(function(){
        $('.row').hide()
        $('#dificultad').hide()
        $('#juegos').hide()
        $('#panel').hide()
    $('#empieza').click(function(){
        $('.jumbotron').hide()
        $('.row').show()
        $('#dificultad').show()
        $('#juegos').show()
        $('#panel').show()
    })
    
    $('#em').click(function(){
        console.log($("#gameDifficulty option:selected").val())
        
    })


    
});







