$(window).on("main:ready", function(event, data){

	console.log('content', data.content);

	var $element = $('.inner-part');
	if( !$element.length ) return;

	$(window)
		.on('page-changed', function (event, content_id) {
			var obj_content = data.content[content_id];
			$('.inner-part__title').html(obj_content.title);
			$(".inner-part-column").html(obj_content.text);
			$(".inner-part__image img").attr('src', obj_content.image);
		})
	;

});