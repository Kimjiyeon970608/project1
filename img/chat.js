/**
 * 2020-11-30 양정
 */
(function($) {

  		$(document)
  				.on(
  						"appinit",
  						function() {
  							$(".chats")
  									.each(
  											function() {
  												var $chats = $(this);
  												var maxTab = $chats
  														.attr("data-max-tab") * 1;											

  												$chats
  														.on(
  																"click",
  																".chats-msg-view-action-form button",
  																function() {
  																	
  																	var $button = $(this);
  																	var $form = $button
  																			.closest(".chats-msg-view-action-form");

  																	var $textarea = $form
  																			.find("input.form-control");	

  																	var value = $textarea
  																			.val();

  																	$textarea
  																			.trigger("focus");

  																	if (!value)
  																		return;
  																	
  																	if (!userSubscribe){
  																		
  																		if(sock !=null ){
  																			
  																			if(value == "!종료"){
  	  																			
  	  																			$.chat('StringID', {
  	  																 	  			target: "me",
  	  																 	  			msg: value,
  	  																 	  			/*time: new Date().format("a/p hh:mm")*/
  	  																 	  			time: formatAMPM(new Date)
  	  																 	  			});  			 		
  	  																			
  	  																			$textarea
  	  		  																	.val('');
  	  																			
  	  																			return;
  	  	  																		
  	  																		}
	
  																			setCookie(user_key , sender_key);
  																			sendServerMessage(value); 																
  	  																		$textarea
  																			.val('');
  	  																		
  																		}else if(value == "!종료"){
  																			
  																			$.chat('StringID', {
  																 	  			target: "me",
  																 	  			msg: value,
  																 	  			/*time: new Date().format("a/p hh:mm")*/
  	  																 	  		time: formatAMPM(new Date)
  																 	  			});  			 		
  																			
  																			$textarea
  		  																	.val('');
  																			
  																			return;
  	  																		
  																		}else{
  																			
  																			if ( value == '' || value == null || value == undefined || value == "" || value.replace(/(\s*)/g, "").length < 1){
  																				alert('메시지를 입력하세요.');
  																				$textarea
			  																	.val('');
  																				
  																				return
  																				
  																			}else{
															
		  																		connectWebsocket(value);
			  																	$textarea
			  																	.val('');
  																			}
	  																	
  																		}
	  																	
  																	}else{		
  																		
  																		setCookie(user_key , sender_key);
  																		sendServerMessage(value); 																
  																		$textarea
																		.val('');
  																	}
  																});
  												
  												 $chats
  														.on(
  																"keyup",
  																".Form",
  																function(event) {
  																	if (event.keyCode == 13) {

  																		var $button = $(this);
  																		var $chats = $(this);
  																		var $form = $button
  																				.closest(".chats-msg-view-action-form");
  																		var $textarea = $form
  																				.find("input.form-control");

  																		if (!this.value)
  																			return;
																		
  																		if (!userSubscribe){
  																			
  																			if(sock !=null ){
  																				
  																				if(value == "!종료"){
  		  																			
  		  																			$.chat('StringID', {
  		  																 	  			target: "me",
  		  																 	  			msg: value,
  		  																 	  			/*time: new Date().format("a/p hh:mm")*/
  	  																 	  				time: formatAMPM(new Date)
  		  																 	  			});  			 		
  		  																			
  		  																			$textarea
  		  		  																	.val('');
  		  																			
  		  																			return;
  		  	  																		
  		  																		}
  																				
  																				setCookie(user_key , sender_key);
  	  																			sendServerMessage(value); 																
  	  	  																		$textarea
  	  																			.val('');
  	  	  																		
  																			}else if(value == "!종료"){
  																				
  																				$.chat('StringID', {
  	  																 	  			target: "me",
  	  																 	  			msg: value,
  	  																 	  			/*time: new Date().format("a/p hh:mm")*/
  	  																 	  			time: formatAMPM(new Date)
  	  																 	  			});  
  	  																			
  	  																			$textarea
  	  		  																	.val('');
  	  																			return;
  	  	  																		
  	  																		}else{
  	  																			
	  	  																		if ( value == '' || value == null || value == undefined || value == "" || value.replace(/(\s*)/g, "").length < 1){
	  	  																			alert('메시지를 입력하세요.');
		  	  																		$textarea
				  																	.val('');
	  																				
	  																				return
	  																				
	  																			}else{
  																			
	  	  																			connectWebsocket(value);
	  		  																		$textarea
	  		  																		.val('');
	  																			}
  		  																	
  	  																		}
  		  																	
  	  																	}else{		
  	  																		
  	  																		setCookie(user_key , sender_key);
  	  																		sendServerMessage(value);
  	  																		$textarea
  																			.val('');
  	  																	}

  																	}
  																});
  												 
  											});
  						});

  		$.chat = function(clientId, params) {
  			
  			if (clientId == null) {
  				alert("clientId가 없습니다.");
  				return;
  			}

  			var $chats = $(".chats");

  			if ($chats.size() <= 0) {
  				alert("오류가 발생 했습니다. [chats를 찾을 수 없습니다.]");
  				return;
  			}

  			var $panel = $chats.find("li[data-id='" + clientId + "']"); 			

  			if ($panel.size() <= 0) {
  				alert("현재 채팅중인 고객이 아닙니다.");
  				return;
  			}

  			if (!params || typeof params != "object") {
  				alert("오류가 발생 했습니다. [params는 object여야 합니다.]");
  				return;
  			}

  			var $content = $panel.find(".chat_bot_main");  	

  			if ($content.size() !== 1) {
  				alert("오류가 발생 했습니다. [chats-msg-view-content를 찾을 수 없거나 잘못 설정 되었습니다.]");
  				return;
  			}

  			var $contentInner = $content.find(".chat_bot_main_window"); 	

  			if ($contentInner.size() !== 1) {
  				alert("오류가 발생 했습니다. [chats-msg-view-content-inner를 찾을 수 없거나 잘못 설정 되었습니다.]");
  				return;
  			}

  			var $msgLeft = $content.find("#chat_bot_customer_service");
  			
  			if ($msgLeft.size() <= 0) {
  				alert("오류가 발생 했습니다. [템플렛 마크업을 찾을 수 없습니다.]");
  				return;
  			}

  			var $msgRight = $content.find("#chat_bot_customer");

  			if ($msgRight.size() <= 0) {
  				alert("오류가 발생 했습니다. [템플렛 마크업을 찾을 수 없습니다.]");
  				return;
  			}

  			var $html;

  			switch (params.target) {
  			case "me":

  				$("#chat_bot_customer").first().show();
  				
  				$html = $msgRight.clone();  	
  				
  				$("#chat_bot_customer").first().hide();

  				break;
  			case "client":
  				
  				$("#chat_bot_customer_service").first().show();
  				
  				$html = $msgLeft.clone(); 
  				
  				$("#chat_bot_customer_service").first().hide();

  				if (!params.clientName) {
  					alert("오류가 발생 했습니다. [params.clientName이 설정 되어있어야 합니다.]");
  					return;
  				}

  				$html.find(".chats-msg-view-user-name").html(params.clientName);
		
  				break;
  				
  			default:
  				alert("오류가 발생 했습니다. [params.target은 me 또는 client여야 합니다.");
  				return;
  			}

  			if (!params.msg) {
  				return;
  			}

  			$html.find(".chat_bot_text_box").html( params.msg.replace(/\n/g, "<br />") );
  			

  			if (!params.time) {
  				alert("오류가 발생 했습니다. [시간이 설정 되어있어야 합니다.]");
  				return;
  			}

  			$html.find(".dateTime").html(params.time);

  			$html.removeClass("chats-msg-templete");

  			var $lastChatPart = $contentInner.find(">div:last");
  			
  			var $scroll = $contentInner.find(".scroll2");
  			
  			if ($lastChatPart.size() < 1) {
  				$lastChatPart = $("<div>");
  				$contentInner.append($lastChatPart);
  			}
  			
  			$lastChatPart.append($html).each(function() {
 			
  				setTimeout(function(){
  					
  					$contentInner.stop().animate( { scrollTop : $scroll[0].scrollHeight});
  					
  				}, 200);
 
  			});
  		}
  	})(jQuery);