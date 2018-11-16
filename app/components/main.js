$(function(){

	$.getJSON( "assets/data.json", function(data) {
	  // console.log( "success", data );
		$(window)
      .trigger("main:ready", data)
      .trigger('language-changed', data.default_lang)
      .trigger("page-changed", data.default_page )
    ;
    
	}).fail(function(e,error_message) {
    	console.log( "error", error_message );
  	});

  $(window)
    .on('change-page', function(event, content_id){
      $('title').text(content_id);
      $(window).trigger("page-changed", content_id );
    })
    .on('change-language', function(event, language){
      $(window).trigger("language-changed", language );
    })
  ;

});


