$(window).on("main:ready", function(event, data){
	var def_lang = data.default_lang;
	$(window).on('language-changed', function(event, language){
		language = language || def_lang;
		$('[data-trnslt]').each(function(){
			var id = $(this).data('trnslt');
			var value = id.split('.').reduce(getValue, data);
			if (value) {
				$(this).html(value[language]||value[def_lang]);
			}
		});

		$('[data-trnslt-attr]').each(function(){
			//значение data-аттрибута 
 			var id = $(this).data('trnsltAttr');
 			var item = id.split(',');
 			for (var i=0; i<item.length; i++){
				var arr = item[i].split('.');
				var value = arr.reduce(getValue, data);
				if (value) {
					$(this).attr(arr[arr.length - 1], value[language]||value[def_lang]);
				}
 			} 
		});
	});

	function getValue(data, key){
		return data && data[key]
	}
});
