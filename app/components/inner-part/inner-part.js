$(window).on("main:ready", function(event, data){

	console.log('content', data.content);

	var $element = $('.inner-part');
	if( !$element.length ) return;

	var template = Handlebars.compile( $('#template-main-content').html());

	$(window)
		.on('page-changed', function (event, content_id) {
			changeContent( content_id );
		})
	;

	//
	function changeContent( content_id ){
		var obj_content = data.content[content_id];
		// console.log("obj_content: ", obj_content );

		var html = template( obj_content );
		// console.log("html: ", $('#template-main-content').html(), html );
		$element.empty().html( html );
	}

	
	// console.log("template: ", template );
});