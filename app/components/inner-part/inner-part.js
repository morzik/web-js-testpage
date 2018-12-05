$(window).on("main:ready", function(event, data){

	console.log('content', data.content);

	var $element = $('.inner-part');
	if( !$element.length ) return;
	

	var lang = data.default_lang;
	var page = data.default_page;



	var template = Handlebars.compile( $('#template-main-content').html());

	console.log("template", template);


	$(window)
		.on('page-changed', function (event, content_id) {

			page = content_id;
			// changeContent(lang, content_id);
			// fadeOut(changeContent);
			fadeOut( function(){
				changeContent(lang, content_id);
			});
		})		
		.on('language-changed', function(event, language){
			lang = language;
			fadeOut( function(){
				changeContent(language, page)
			} );
			// changeContent(language, page);
		})
	;

	/*
	function changeContent( content_id ){
		var obj_content = data.content[content_id];
		// console.log("obj_content: ", obj_content );
		var html = template( obj_content );
		// console.log("html: ", $('#template-main-content').html(), html );
		$element.empty().html( html );
	}
	*/
	function fadeOut( callback ) {
		$element.fadeOut( function (){
			if ( callback ) callback();
		});
	}


	function changeContent( language, content_id ) {

		// $element.fadeOut();
		var obj_content = data.content[content_id];
		// console.log("obj_content: ", obj_content );
		var html = template( ( { image: obj_content.image, title: obj_content.title[language], text:obj_content.text[language] } ) );
		// var html = template(obj_content);
		// console.log("html: ", $('#template-main-content').html(), html );
		$element.empty().html( html );
		$element.fadeIn();
	}
});