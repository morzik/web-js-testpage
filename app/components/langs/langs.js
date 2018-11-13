$(window).on("main:ready", function(event, data){


	var $element = $('.langs');
	if( !$element.length ) return;

	var $list = $('.langs__items', $element );

	console.log('language', data.language);


	for (var i = 0; i < data.language.length; i++){
		var item = data.language[i];
		console.log(i, item.title);
		$list.append($('<li class="langs__item">'+ item.title +'</li>'));
	};

	// при клике на элемент открыть список

	// $element.on('click', function(event){
	// 	event.preventDefault();
	// 	$(this).toggleClass('langs_active');
	// 	console.log(this);
	// })
	// при клике на один из пунктов списка взять его заголовок и передать <p>, при этом скрыть список

});