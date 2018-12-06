$(window).on("main:ready", function(event, data){

	console.log('content', data.content);

	var $element = $('.inner-part');
	if( !$element.length ) return;
	

	var lang = data.default_lang;
	var page = data.default_page;

	var template = Handlebars.compile( $('#template-main-content').html());


	var is_animated = false;

	console.log("template", template);


	$(window)
		.on('page-changed', function (event, content_id) {

			page = content_id;
			
			// changeContent(lang, content_id);
			_chengeContent();
		})		
		.on('language-changed', function(event, language){
			lang = language;
			// changeContent(language, page);
			_chengeContent();
		})
	;


	function _chengeContent(){

		if(is_animated) return;

		fadeOut( function(){
			changeContent(lang, page, function () {
				// is_animated = false;
			});
		});
	}

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
		is_animated = true;
		TweenMax.to(".inner-part__title", 0.5, {
			opacity: 0,
			ease: Circ.easeIn
		});
		TweenMax.to(".inner-part-column", 0.5, {
			y: -50,
			opacity: 0,
			ease: Circ.easeIn
		});
		TweenMax.to(".inner-part__image", 0.5, {
			x: 50,
			opacity: 0,
			ease: Circ.easeIn,
			onComplete: function(){
				is_animated = false;
				if( callback ) callback();
			}
		});
	}


	function changeContent( language, content_id, callback ) {
		is_animated = true;
		var obj_content = data.content[content_id];
		var html = template( { image: obj_content.image, title: obj_content.title[language], text:obj_content.text[language] } );
		$element.empty().html( html );
		
		TweenMax.from(".inner-part__title", 0.5, {
			opacity: 0,
			ease: Circ.easeOut
		});
		TweenMax.from(".inner-part-column", 0.5, {
			y: -50,
			opacity: 0,
			delay: 0.2,
			ease: Circ.easeOut
		});
		TweenMax.from(".inner-part__image", 0.5, {
			x: 50,
			opacity: 0,
			delay: 0.4,
			ease: Circ.easeOut,
			onComplete: function(){
				is_animated = false;
				if( callback ) callback();
			}
		});
	}

});