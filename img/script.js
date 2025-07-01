jQuery(function() {
	var timeoutId = null;

	$(document).ajaxStart(function() {
		if (timeoutId != null)
			clearTimeout(timeoutId);

		timeoutId = setTimeout(function() {
			$("body>.loading-panel").addClass("active");
		}, 1000);
	});
	$(document).ajaxComplete(function() {
		if (timeoutId != null)
			clearTimeout(timeoutId);

		$("body>.loading-panel").removeClass("active");
	});
	
	$(window).on("load", function(){
		var i = 1;
		var id = setInterval(function(){
			if(i > 3){
				clearInterval(id);
				$("input[type=text]:first, textarea:first").filter(':not(.kb-panel *)').not('.hasDatepicker').first().focus();
				return;
			}
			$(window).focus();
			i++;
		}, 200);
	});

	$(document).on("modalBoxClose", function(){
		var i = 1;
		var id = setInterval(function(){
			if(i > 3){
				clearInterval(id);
				return;
			}
			$("input[type=text]:first, textarea:first").filter(':not(.kb-panel *)').not('.hasDatepicker').first().focus();
			i++;
		}, 200);
	});

});