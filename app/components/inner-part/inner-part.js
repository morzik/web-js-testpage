$(window).on("main:ready", function(event, data){

	console.log('content', data.content);

	var $element = $('.inner-part');
	if( !$element.length ) return;

	$(window).on('page-changed', function (event, content_id) {
		// console.log('поймали');
		var $title = $('.inner-part__title');
		var $text = $(".inner-part-column");
		var $image = $(".inner-part__image img");

		var obj_content = data.content[content_id];
		var obj_title = obj_content.title;
		var obj_text = obj_content.text;
		var obj_image = obj_content.image;

		$title.html(obj_title);
		$text.html(obj_text);
		$image.attr('src', obj_image);
	});

});