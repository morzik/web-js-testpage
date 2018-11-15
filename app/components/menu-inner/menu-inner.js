$(window).on("main:ready", function(event, data){
	
	//осносвной компонент
	var $element = $('.menu-inner');
	if( !$element.length ) return;

	//ддефолтное значение язака
	var def_lang = data.default_lang;

	//осносвной список меню
	var $list = $('.menu-inner__list', $element );
	

	// //текст в кнопке скачивания списка усуг
	// var $download_button_text = $('.menu-inner__download-button-text');
	// $download_button_text.data('translate', data.footer.button.title);

	// //текст в футере
	// var $footer_text = $('.menu-inner__footer');
	// $footer_text.data('translate', data.footer.text);

	
	//список DOM-элемента меню
	var $DOM_menu_items = [];

	// найти меню(массив элементов в data) в объекте и перебрать все элементы этого массива
	for (var i = data.menu.length - 1 ; i>=0; i--){

		var item = data.menu[i];
		// console.log( i, item );

		// каждому элементу создать DOM-элемент списка меню на основе данных
		if (item.type == 'line') {
			$list.prepend( $('<li class="menu-inner__item menu-inner__item-line">'));	
		} else {
			//создаем jquery элементы списока DOM-элемента меню
			var $menu_item =  $( '<li class="menu-inner__item"><a data-content-id="'+ item.content_id +'" href="'+ item.href +'"></a></li>' )
				.data( 'translate', item.title )
				.prependTo($list)
			;
			//забиваем список DOM-элемента меню
			$DOM_menu_items.unshift( $menu_item );
		}
	}

	$list.on('click', function(event) {
		//отмена клика на ссылках
		event.preventDefault();
		
		//проверить есить ли отклик на элементе меню
		//взять название и передать в название новой страницы
		var $menu_item = $(event.target);
		var content_id = $menu_item.data('content-id');
		if( content_id ) $(window).trigger('change-page', content_id);
	});

	$(window)
		.on('page-changed', function (event, content_id) {
			//удаляем всем элементам списка активный класс
			$(':not([data-content-id="'+ content_id +'"])').removeClass('menu-inner__item_active');
			//добавляем только нужному элементу списка активный класс
			$('[data-content-id="'+ content_id +'"]').addClass('menu-inner__item_active');

		})
		.on('language-changed', function(event, language){
			language = language || def_lang;

			//проходим по массиву DOM-элемента и по ключу назначаем нужный текст
			$DOM_menu_items.forEach(function($e,i){
				var translate = $e.data( 'translate' );
				$('a', $e ).html( translate[language] || translate[def_lang]);
			});

			// $download_button_text.html(data.footer.button.title[language]||data.footer.button.title[def_lang]);
			// $footer_text.html(data.footer.text[language]||data.footer.text[def_lang]);
		})
	;

});