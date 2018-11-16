$(window).on("main:ready", function(event, data){


	var $element = $('.langs');
	if( !$element.length ) return;

	var $list = $('.langs__items', $element );

	var def_lang = data.default_lang;

	console.log('language', data.language);


	for (var i = 0; i < data.language.length; i++){
		var item = data.language[i];
		console.log(i, item.title);
		$list.append($('<li class="langs__item">'+ item.title +'</li>'));
	};

	// при клике на элемент открыть список
	$element.on('click', function(event){
	    $(this).toggleClass('langs_active');
	});


	// при клике на один из пунктов списка взять его заголовок и передать <p>, при этом скрыть список
	$(".langs__item").on('click', function() {
		var language = $(this).html();
	    $(".langs p").html(language);
	    if( language ) $(window).trigger('change-language', language);
	}); 

	
});