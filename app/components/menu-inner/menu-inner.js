$(window).on("main:ready", function(event, data){
	
	var $element = $('.menu-inner');
	if( !$element.length ) return;

	var $list = $('.menu-inner__list', $element );
	// var $item = $('.manu-inner__item', $element );

	console.log('menu', data.menu);

	// найти меню в объекте
	// перебрать все элементы этого массива

	for (var i = data.menu.length - 1 ; i>=0; i--){
		var item = data.menu[i];
		// console.log(i, item);

		// каждому элементу создать DOM-элемент списка меню на основе данных
		if (item.type == 'line') {
			$list.prepend( $('<li class="menu-inner__item menu-inner__item-line">'));	
		} else {
			$list.prepend($('<li class="menu-inner__item"><a data-content-id="'+ item.content_id +'" href="'+ item.href +'">'+ item.title +'</a></li>'));
		}
	}

	//проверить есить ли отклик на элементе меню
	//взять название и передать в название новой страницы

	$list.on('click', function(event) {
		event.preventDefault();
		var $menu_item = $(event.target);
		var content_id = $menu_item.data('content-id');
		// console.log('!!!', event.target, content_id );
		if( content_id ) $(window).trigger('change-page', content_id);

	});

	$(window).on('page-changed', function (event, content_id) {
		// console.log('menu cought: page chanded', content_id );
		$(':not([data-content-id="'+ content_id +'"])').removeClass('menu-inner__item_active');
		$('[data-content-id="'+ content_id +'"]').addClass('menu-inner__item_active');
	});


});