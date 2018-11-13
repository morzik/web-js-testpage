$(function(){

	$.getJSON( "assets/data.json", function(data) {
	    console.log( "success", data );
	}) .fail(function(e,error_message) {
    	console.log( "error", error_message );
  	});

});

$('window').trigger("event");