$(function(){

	$.getJSON( "assets/data.json", function(data) {
	  // console.log( "success", data );
		$(window).trigger("main:ready", data);
	}).fail(function(e,error_message) {
    	console.log( "error", error_message );
  	});

	$(window).on('change-page', function(event, content_id){
		$('title').text(content_id);
    $(window).trigger("page-changed", content_id );
	});

});


