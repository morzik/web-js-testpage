$(window).on("main:ready", function(event, data){

	console.log('content', data.content);

	var $element = $('.inner-part');
	if( !$element.length ) return;
	
	var lang = data.default_lang;
	var page = data.default_page;

	var template = Handlebars.compile( $('#template-main-content').html());


	// флаг для анимации
	var is_animated = false;

	console.log("template", template);


	$(window)
		.on('page-changed', function (event, content_id) {
			// для сохранения текущей страницы
			page = content_id;
			//смена контента относительно текущей странницы
			_chengeContent();
		})		
		.on('language-changed', function(event, language){
			// для сохранения текущего языка
			lang = language;
			//смена контента относительно текущего языка
			_chengeContent();
		})
	;


	// смена контента и переключение флага для защиты от закликивания
	function _chengeContent(){

		if(is_animated) return;

		fadeOut( function(){
			changeContent(lang, page, function () {
			});
		});
	}

	// разбор контента и скрытие, вызов коллбека
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

	// замена контента относительно текущего языка и страницы 
	function changeContent( language, content_id, callback ) {
		is_animated = true;
		// выборка по нужной странице
		var obj_content = data.content[content_id];
		// выборка с учетеом теущего языка
		var html = template( { image: obj_content.image, title: obj_content.title[language], text:obj_content.text[language] } );
		// сборос текущих данных и замена на новый контент
		$element.empty().html( html );
		
		// анимация появления заголовок -> текст -> картинка
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