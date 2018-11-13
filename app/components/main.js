$(function(){

	$.getJSON( "assets/data.json", function(data) {
	    console.log( "success", data );
		$(window).trigger("main:ready", data);

	}) .fail(function(e,error_message) {
    	console.log( "error", error_message );
  	});

});


