$(window).on("main:ready", function(event, data){
	
	var def_lang = data.default_lang;

	console.log("def_lang =", def_lang);

	var $element = $('.menu-inner');
	if( !$element.length ) return;

	var $list = $('.menu-inner__list', $element );
	// var $item = $('.manu-inner__item', $element );

	console.log('menu', data.menu);
	
	var $DOM_menu_items = [];

	// найти меню в объекте
	// перебрать все элементы этого массива
	for (var i = data.menu.length - 1 ; i>=0; i--){

		var item = data.menu[i];
		console.log( i, item );

		// каждому элементу создать DOM-элемент списка меню на основе данных
		if (item.type == 'line') {
			$list.prepend( $('<li class="menu-inner__item menu-inner__item-line">'));	
		} else {
			var $menu_item =  $( '<li class="menu-inner__item"><a data-content-id="'+ item.content_id +'" href="'+ item.href +'"></a></li>' )
				.data( 'translate', item.title )
				.prependTo($list)
			;
			$DOM_menu_items.unshift( $menu_item );
		}
	}

	// console.log('список', $DOM_menu_items);


	//проверить есить ли отклик на элементе меню
	//взять название и передать в название новой страницы

	$list.on('click', function(event) {
		event.preventDefault();
		var $menu_item = $(event.target);
		var content_id = $menu_item.data('content-id');
		// console.log('!!!', event.target, content_id );
		if( content_id ) $(window).trigger('change-page', content_id);

	});

	$(window)
		.on('page-changed', function (event, content_id) {
			// console.log('menu cought: page chanded', content_id );
			
			$(':not([data-content-id="'+ content_id +'"])').removeClass('menu-inner__item_active');
			$('[data-content-id="'+ content_id +'"]').addClass('menu-inner__item_active');

		})
		.on('language-changed', function(event, language){
			language = language || def_lang;
			$DOM_menu_items.forEach(function($e,i){
				// console.log(i, '>>', $e.data('translate') );
				if (!$e.data( 'translate' )[language] == '') {
					$('a', $e ).html( $e.data( 'translate' )[language] );
				} else {
					$('a', $e ).html( $e.data( 'translate' )[def_lang] );
				}
			});

		})
	;

});