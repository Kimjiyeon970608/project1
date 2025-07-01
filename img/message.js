/**
 * message 수신, 발신, 기본 동작 
 */
 
 //상담사 명, 상담 시작 버튼, 종료 메시지 전역 변수 초기화
 var client_name;
 var start_btn;
 var end_msg;
 
$(document).ready(function() { 
		
		//상담사 명, 상담 시작 버튼, 종료 메시지 프로젝트 별 분기
		switch(sender_key){
			//수정 시 message.js | ChatbotContent.jsp | WebChatStartController.java 수정
			case 'q0a80x8hqgjiairf7ck8yeto0o46zyttdk95g5pu': //HMM 운영계			
			case '5qtkb8ftynbgtofjmejiwr3e5x9mugneyqu3uayk': //HMM 개발계
				client_name = 'Consultant';
				start_btn = 'Start a consultation';
				end_msg = "Consultation has closed." + '<br>' + "If you have any further questions,"+ '<br>' + " please press the " + "'Start Chat' button.";
				break;
			default :
				client_name = '상담사';
				start_btn = '상담 시작 하기';
				end_msg = "챗봇 상담이 종료되었습니다." + '<br>' + "추가 문의가 있으실 경우," + " '챗봇 시작' " + "버튼을 눌러주세요.";
		}
	
	
		if( state == "OPEN" ){
	  		previousMessageList(maintain, sender_key);
		  	today_date();
		  	slogan();
		  	theme();		
		  	stem();
		  	genericsSet();
		  	ckk();
	  	}else{	
		  	today_date();
		  	connect();  
		  	slogan();
		  	theme();
		  	stem();
		  	genericsSet();
		  	ckk();
	  	}
});

function today_date(){
	
	//프로젝트 별 날짜 표시 형식 변경.	
	var date = new Date();//JS의 Date()는 브라우져의 시간대가 사용된다.
	var year = date.getFullYear();
	//var month = new String(date.getMonth()+1);
	var day = new String(date.getDate());
	var today;
	
	switch(sender_key){			
			case 'q0a80x8hqgjiairf7ck8yeto0o46zyttdk95g5pu': //HMM 운영계	
			case '5qtkb8ftynbgtofjmejiwr3e5x9mugneyqu3uayk': //HMM 개발계
				//Date Format이 달라 월과 일을 혼돈할 수 있기에 월은 영문 약자로 표시. 
				var month_eng_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 
					'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
					today = day + '/' + month_eng_arr[date.getMonth()] + '/' + year ;					
				break;
			default :				
			  	var month = new String(date.getMonth()+1);
			  	if (month.length == 1){
			  		month = "0" + month;
			  	}
			  	if (day.length == 1){
			  		day = "0" + day;
			  	}
			  	
				today = year + "년 " + month + "월 " + day + "일";
		}
		  	
  	$("#today_date").text(today);
	
	
	
	/*	원본		
	var date = new Date();
  	var year = date.getFullYear();
  	var month = new String(date.getMonth()+1);
  	var day = new String(date.getDate());
  	
  	if (month.length == 1){
  		month = "0" + month;
  	}
  	if (day.length == 1){
  		day = "0" + day;
  	}
  	var today = year + "년 " + month + "월 " + day + "일";	  	
  	$("#today_date").text(today);*/
}

function genericsSet(){
	
	var li = '';
	var ul_list = $("#generics");
	
	$.each(generics, function(key, value){
		
		var str_generics = "";
		
		if (generics.length == '3'){
			str_generics = "col3";
		}else if (generics.length == '2'){
			str_generics = "col2";
		}

		if(value.type == "FR"){
			li = '<li class="subBorderColor ' + str_generics + ' "><a href="javascript:goStart();" class="ellipsis">' + value.label + '</a></li>';
				
		}else if(value.type == "BF"){
			li = '<li class="subBorderColor ' + str_generics + ' "><a href="javascript:goBefore();" class="ellipsis">' + value.label + '</a></li>';
				
		}else if(value.type == "CD"){
			
			li = "<li class='subBorderColor " + str_generics + "'><a href='javascript:goEnd(\"" + value.label + "\"); ' class='ellipsis'>" + value.label + "</a></li>";
				
		}else if(value.type == "BK"){
			li = "<li class='subBorderColor " + str_generics + "'><a href= ' javascript:chattingStart2(\"" + value.label + "\"); ' class='ellipsis' > " + value.label + "</a></li>";

		}else if(value.type == "LI"){
			li = "<li class='subBorderColor " + str_generics + "'><a href= ' javascript:goFAQ(\"" + value.action + "\"); '  class='ellipsis'> " + value.label + "</a></li>";
				
		}else if(value.type == "CP"){
			li = "<li class='subBorderColor " + str_generics + "'><a href= ' javascript:goTel(\"" + value.action + "\"); '  class='ellipsis'> " + value.label + "</a></li>";
		}

		ul_list.append(li);
		
	});
	
}

function goFAQ(url){
	window.open(url);
}


function goTel(t){
	
	var tel = "tel:"+t.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-");

 	top.location.href = tel;		
}

function chattingStart2(e){

	var value = $(e).text();
	
	if(userSubscribe != null){
		$(e).addClass('mainBorderColor activeBackColor activeFontColor');	
		
		var sendBtn = {
				"user_key": user_key,
				"sender_key": sender_key,
				//"time": 1522387086667,
				//"serial_number": 1689884130894833200,
				"type":"text",
				"content":value
		}
		//extra 값이 있을 때만 보내기
		if (extra != "" && extra != "undefined" && extra != null){
			sendBtn.extra = extra;
		}
		
		stompClient.send("/app/sendMsg", {}, JSON.stringify(sendBtn)); 
		
	}else{
		$(e).addClass('mainBorderColor activeBackColor activeFontColor');		
		connectWebsocket(e);
	}
	
}

function slogan(){
	if ( s_type == "TX" ){		
		$(".chat_bot_notice").addClass('contentVisible');
		$(".chat_bot_notice").text(s_msg);
	}else if ( s_type == "LI" ){
		$(".chat_bot_notice").addClass('contentVisible');
		$("#li").html( s_msg );
		$("#li").attr( "href" , s_url );
	}
}

function previousMessageList(user_key , sender_key){	
	
	if(user_key != null){
	
		$.post(
				"/services/getChatMsgList",
				{
					"USER_KEY" : user_key,
					"SENDER_KEY" : sender_key
				},
				jsAfterGetChatMsgList
		); 
	}
}




function jsAfterGetChatMsgList(response, status){
	if (status == "success") {	
	
		var msgList = response.msgList;	
		
		if ( msgList == null || msgList == '' ){
			connect();
		}
			
		if(msgList != null){
			
			var obj = null;
			
			for(var i=0; i < msgList.length; i++){	
				
				obj = msgList[i];
				
				if(obj.origin == 'C'){
					
					if(obj.message_type == 'TX'){
	
						if ( obj.message == '*' ){
							obj.message = obj.message.replace("*", '이전으로');
						}else if ( obj.message == '#' ){
							obj.message = obj.message.replace(/#/gi, '처음으로');
						}
						
						$.chat('StringID', {//account_id
							target: "me",						
							msg: autolink(obj.message),
							time: obj.date
							});
					}else if (obj.message_type == 'IM'){
						var imgUrl = obj.img_url;

						$.chat('StringID', {//account_id
							target: "me",		
							msg : '<a href="#" alt="크게보기" onclick="window.open(\''+ imgUrl +'\', \'_blank\', \'width=512, height=384, resizable=yes\'); return false;"><img src="'+ imgUrl +'" alt="Image" /></a>',
							time: obj.date
						});
					}else if ( obj.message_type == 'FI' ){
						var fileUrl = obj.img_url;
						
						$.chat( 'StringID', {//account_id
		  					target: "me",
		  					msg : '<a href=' + '"' + fileUrl + '" target="_blank">'+ obj.link_name + '</a>',
		  					time: obj.date
		  				});
					}else if ( obj.message_type == 'VD' ){
						
						var videoUrl = obj.img_url;

						$.chat( 'StringID', {//account_id
		  	  	    		target: "me",
		  	  	    		msg : '<a href=' + '"' + videoUrl + ' " target="_blank">동영상 파일</a> ',
		  	  	    		time: obj.date
		  	  	    	});
					}
					
				}else if(obj.origin == 'G' || obj.origin == 'B'){
					
					//ckk();
					
					if(obj.message_type == 'TX'){
						$.chat('StringID', {//account_id
							target: "client",
							clientName: n,
							msg: '<p>' + autolink(obj.message) + '</p>',
							time: obj.date
							});
					}else if ( obj.message_type == 'LI' ){
						var buttons = '';
						var linkNm = obj.link_name.split(',');
						var linkUrl = obj.link_url.split(', ');
						//링크 버튼 타입 체크.	
						var linkType = obj.link_type.split(', ');

						for( var j in linkNm){
							if(obj.link_url != ''){
								//링크 버튼 타입 체크.								
								if(linkType[j] == "AL"){//App Link 버튼 생성.				
									//모바일 환경에서 브라우저에 따라 target을 따로 잡아야 하는 경우가 있기에 사파리 예외처리
									//CriOS는 Chrome iOS의 약자, 아이폰으로 크롬 접속 시 노출.
									if (navigator.userAgent.indexOf("Safari") != -1 && 
										navigator.userAgent.indexOf("Chrome") == -1 && 
										navigator.userAgent.indexOf("CriOS") == -1) {
										buttons = buttons + '<div class="chat_bot_category"><a href="'+ linkUrl[j] + '" target="_parent">' + linkNm[j].replace("||" , ",") + '</a></div>';
									}else{ // 나머지 브라우저										
										buttons = buttons + '<div class="chat_bot_category"><a href="'+ linkUrl[j] + '" target="_self">' + linkNm[j].replace("||" , ",") + '</a></div>';	
									}									
								}else{
									buttons = buttons + '<div class="chat_bot_category"><a href="#"  onClick="window.open(' + "'" + linkUrl[j] + "'" + ')">' +  linkNm[j].replace("||" , ",") + '</a></div>';
								}								
							}else{
								buttons = buttons + '<div class="chat_bot_category"><a href="#" class="" id="' + j + '" onclick="javascript:sendValue(this); "  >' + linkNm[j].replace("||" , ",") + '</a></div>';	
							}
						}
						
						if(obj.img_url == "" || obj.img_url == null){
							
							$.chat('StringID',{ 
								target : "client",
								clientName : n,
								msg : '<p>' + autolink(obj.message) + '</p>'
									+ buttons,
								/*time: new Date().format("a/p hh:mm")*/
								time: formatAMPM(new Date)			
							});
						}else{
						
							$.chat('StringID',{
								target : "client",
								clientName : n,
								msg : '<p>' + autolink(obj.message) + '</p>'
									+  '<a href="#" alt="크게보기" onclick="window.open(\''+ obj.img_url +'\', \'_blank\', \'width=512, height=384, resizable=yes\'); return false;"><img src="'+ obj.img_url +'" alt="Image" /></a>'
									+ buttons,
								time: obj.date			
							});	
						}
						
					}else if ( obj.message_type == 'IM'){
						var imgUrl = obj.img_url;
						
						$.chat('StringID', {//account_id
							target: "client",
							clientName: n,
							msg : '<a href="#" alt="크게보기" onclick="window.open(\''+ imgUrl +'\', \'_blank\', \'width=512, height=384, resizable=yes\'); return false;"><img src="'+ imgUrl +'" alt="Image" /></a>',
							time: obj.date
						});						
					}
								
				}else{
					
					//ckk();
					
					if(obj.message_type == 'TX'){
	
						$.chat('StringID', {//account_id
							target: "client",
							clientName: client_name,
							msg: '<p>' + autolink(obj.message) + '</p>',
							time: obj.date
							});
						
					}else if ( obj.message_type == 'LI' ){
						var buttons = '';
						var linkNm = obj.link_name.split(',');

						for( var j in linkNm){
							
							if(obj.link_url != ''){
								buttons = buttons + '<div class="chat_bot_category"><a href="#"  onClick="window.open(' + "'" + obj.link_url+ "'" + ')">' +  linkNm[j].replace("||" , ",") + '</a></div>';
							}else{						
								buttons = buttons + '<div class="chat_bot_category"><a href="#" class="" id="' + j + '" onclick="javascript:sendValue(this); "  >' + linkNm[j].replace("||" , ",") + '</a></div>';	
							}	
						}
						
						if(obj.img_url == "" || obj.img_url == null){
							
							$.chat('StringID',{
								target : "client",
								clientName : client_name,
								msg : '<p>' + autolink(obj.message) + '</p>'
									+ buttons,
								/*time: new Date().format("a/p hh:mm")*/
								time: formatAMPM(new Date)							
							});
						}else{
						
							$.chat('StringID',{
								target : "client",
								clientName : client_name,
								msg : '<p>' + autolink(obj.message) + '</p>'
									+ '<a href="#" alt="크게보기" onclick="window.open(\''+ obj.img_url +'\', \'_blank\', \'width=512, height=384, resizable=yes\'); return false;"><img src="'+ obj.img_url +'" alt="Image" /></a>'
									+ buttons,
								time: obj.date			
							});	
						}
						
					}else if ( obj.message_type == 'IM'){
						var imgUrl = obj.img_url;

						$.chat('StringID', {//account_id
							target: "client",
							clientName: client_name,
							msg : '<a href="#" alt="크게보기" onclick="window.open(\''+ imgUrl +'\', \'_blank\', \'width=512, height=384, resizable=yes\'); return false;"><img src="'+ imgUrl +'" alt="Image" /></a>',
							time: obj.date
						});						
					}	
				}				
			}
			
			maintainWebsocket(obj.user_key);
			
		}		
	}
}

	function onPrivateMessage(message){	
		var obj = JSON.parse(message.body);
		 
		obj.user_key = 'StringID';				 
		
		if( obj.origin == 'A' ){
			
				ck();
			
				if(obj.message_type == 'TX'){				
					$.chat(obj.user_key, {//account_id
						target: "client",
						clientName: client_name,
						msg: autolink(obj.message),
						/*time: new Date().format("a/p hh:mm")*/
						time: formatAMPM(new Date)		
						});
					
				}else if(obj.message_type == 'LI'){
					var image_url = '';
					var links = obj.links;			
					var auto_answer = '';
					var buttons = '';
					var file_url = '';
					var file_name = '';
					var message = obj.message;
					var filter = "win16|win32|win64|mac|macintel";

					if(obj.file_url != null){
						var file_url = obj.file_url;
						var file_name = obj.file_name;
					}
					if(obj.auto_answer != null){
						var auto_answer = obj.auto_answer; 
					}
					if(obj.image_url != null){
						var image_url = obj.image_url;
					}
					if(obj.message == null){
						message = '';
					}
					//링크 배열에 있는 객체마다
					$.each(links, function(key, value){
						if(value.type == "BK"){						
							buttons = buttons + '<div class="chat_bot_category"><a href="#" class="" id="' + key + '" onclick="javascript:sendValue(this);"  >' + value.name + '</a></div>';	
							
						}else{
							//브라우저가 돌아가고 있는 운영체제를 가져온다.								
							if(navigator.platform){
								//filter로 지정한 운영체제, 즉 PC 환경이라면.
								if( filter.indexOf(navigator.platform.toLowerCase()) > 0 ){
									//링크 버튼 타입 체크.
									if(value.type == "AL"){//App Link 버튼 생성.
										//모바일 환경에서 브라우저에 따라 target을 따로 잡아야 하는 경우가 있기에 사파리 예외처리
										//CriOS는 Chrome iOS의 약자, 아이폰으로 크롬 접속 시 노출.
										if (navigator.userAgent.indexOf("Safari") != -1 && 
											navigator.userAgent.indexOf("Chrome") == -1 && 
											navigator.userAgent.indexOf("CriOS") == -1) {											
											buttons = buttons + '<div class="chat_bot_category"><a href="'+ value.scheme_android+ '" class="" id="linkBtn"  target="_parent">' + value.name + '</a></div>';
										}else{ // 나머지 브라우저											
											buttons = buttons + '<div class="chat_bot_category"><a href="'+ value.scheme_android+ '" class="" id="linkBtn"  target="_self">' + value.name + '</a></div>';	
										}
									}else{
										/*buttons = buttons + '<ul class="chat_bot_category chat_bot_cf chat_bot_inList"><li><a href="#" id="linkBtn" onClick="window.open(' + "'" + value.url_mobile url_pc  + "'" + ')">' + value.name + '</a></li><ul>';*/
										buttons = buttons + '<div class="chat_bot_category"><a href="#" id="linkBtn" onClick="window.open(' + "'" + value.url_pc + "'" + ')">' + value.name + '</a></div>';
									}
								}else{ 
									//모바일 환경일 때 APP LINK 타입으로 들어왔다면.
									if(value.type == "AL"){		
										//모바일 환경에서 브라우저에 따라 target을 따로 잡아야 하는 경우가 있기에 사파리 예외처리
										//CriOS는 Chrome iOS의 약자, 아이폰으로 크롬 접속 시 노출.
										if (navigator.userAgent.indexOf("Safari") != -1 && 
											navigator.userAgent.indexOf("Chrome") == -1 && 
											navigator.userAgent.indexOf("CriOS") == -1) {											
											buttons = buttons + '<div class="chat_bot_category"><a href="'+ value.scheme_android+ '" class="" id="linkBtn"  target="_parent">' + value.name + '</a></div>';
										}else{ // 나머지 브라우저											
											buttons = buttons + '<div class="chat_bot_category"><a href="'+ value.scheme_android+ '" class="" id="linkBtn"  target="_self">' + value.name + '</a></div>';	
										}
									}else{
										/*buttons = buttons + '<ul class="chat_bot_category chat_bot_cf chat_bot_inList"><li><a href="#" id="linkBtn" onClick="window.open(' + "'" + value.url_mobile + "'" + ')">' + value.name + '</a></li><ul>';*/
											
										/*buttons = buttons + '<div class="chat_bot_category"><a href="#" id="linkBtn" onClick="window.open(' + "'" + value.url_mobile + "'" + ')">' + value.name + '</a></div>';*/
										buttons = buttons + '<div class="chat_bot_category"><a href="#" id="linkBtn" onClick="window.open(' + "'" + value.url_mobile + "'" + ')">' + value.name + '</a></div>';	
									}
								}
							}
						}																
					});
					
					//IE
					if(image_url == "" || image_url == null){
						
						$.chat(obj.user_key,{
							target : "client",
							clientName : client_name,
							msg : '<p>' + autolink(message) + '</p>'
								+ '<a href=' + '"' + file_url + '" target="_blank">'+ file_name + '</a>'
								+ buttons,
							/*time: new Date().format("a/p hh:mm")*/
							time: formatAMPM(new Date)							
						});
					}//if
					else{					
						$.chat(obj.user_key,{
							target : "client",
							clientName : client_name,
							msg : '<p>' + autolink(message) + '</p>'
							 	+ '<a href="#" alt="크게보기" onclick="window.open(\''+ image_url +'\', \'_blank\', \'width=512, height=384, resizable=yes\'); return false;"><img src="'+ image_url +'" alt="Image" /></a>'
								+ '<a href=' + '"' + file_url + '" target="_blank">'+ file_name + '</a>'
								+ auto_answer 
								+ buttons,
							/*time: new Date().format("a/p hh:mm")*/
							time: formatAMPM(new Date)							
						});
					}										
				}else if(obj.message_type == 'IM'){
					var image_url = obj.image_url;
					$.chat(obj.user_key, {
						target : "client",
						clientName : client_name,
						msg : '<a href="#" alt="크게보기" onclick="window.open(\''+ image_url +'\', \'_blank\', \'width=512, height=384, resizable=yes\'); return false;"><img src="'+ image_url +'" alt="Image" /></a>',
						/*time: new Date().format("a/p hh:mm")*/
						time: formatAMPM(new Date)		
					});								
				}else if(obj.MSG_TYPE == 'MSG_EMO'){
					var imgUrl = obj.LINK_URL;
					$.chat(obj.USER_KEY, {//account_id
						target: "client",
						clientName: client_name,			
						msg : '<img src="'+ imgUrl +'" alt="" />',
						/*time: new Date().format("a/p hh:mm")*/
						time: formatAMPM(new Date)		
						});
					  					
				}else if(obj.message_type == 'VD'){
					var url = fileUploadUrl + obj.file_url;
					$.chat(obj.user_key, {//account_id
						target: "client",
						clientName: client_name,			
						msg : '<a href="'+ url +'" alt="" target="_blank">동영상파일</a>',
						/*time: new Date().format("a/p hh:mm")*/
						time: formatAMPM(new Date)		
						});
					
				}else if(obj.message_type == 'AU'){
					var url = fileUploadUrl + obj.file_url;
					$.chat(obj.user_key, {//account_id
						target: "client",
						clientName: client_name,			
						msg : '<a href="'+ url +'" alt="" target="_blank">음성파일</a>',
						/*time: new Date().format("a/p hh:mm")*/
						time: formatAMPM(new Date)		
						});		
					
				}else if(obj.MSG_TYPE == 'MSG_LI'){
					var url = obj.LINK_URL;						
					$.chat(obj.user_key, {//account_id
						target: "client",
						clientName: client_name,
						msg : '<a href="'+ url +'" alt="" target="_blank">링크</a>',
						/*time: new Date().format("a/p hh:mm")*/
						time: formatAMPM(new Date)		
					});
				
				}else{
					
	 				if(obj.result == 'success'){
	 					endMsg();
	 					roomUnsubscribe();
	 					
	 				}else if(obj.result == 'fail'){
	 					$.chat(obj.user_key,{
							target: "client",
							clientName: client_name,
							msg: "서버 상태가 원활하지 않습니다.",
							/*time: new Date().format("a/p hh:mm")*/
							time: formatAMPM(new Date)		
						});
	 				}else if(obj.result == 'end'){
	 					roomUnsubscribe();
	 				} 	  	 				
				}//else
		}
		//서버에서 온 메시지라면.
		else if ( obj.origin == 'G' || obj.origin == 'B' ){
			
			ck();
			
			if(obj.message_type == 'TX'){				
				$.chat(obj.user_key, {//account_id
					target: "client",
					clientName: n,
					msg: autolink(obj.message),
					/*time: new Date().format("a/p hh:mm")*/
					time: formatAMPM(new Date)		
					});
					
			}else if(obj.message_type == 'LI'){ // 메시지 타입이 Link 라면.
				
				//console.log(obj.links);
				
				var image_url = '';
				var links = obj.links;			
				var auto_answer = '';
				var buttons = '';
				var file_url = '';
				var file_name = '';
				var message = obj.message;
				var filter = "win16|win32|win64|mac|macintel"; // PC 운영체제

				if(obj.file_url != null){
					var file_url = obj.file_url;
					var file_name = obj.file_name;
				}

				if(obj.auto_answer != null){
					var auto_answer = obj.auto_answer; 
				}

				if(obj.image_url != null){
					var image_url = obj.image_url;
				}

				if(obj.message == null){
					message = '';
				}
				//링크 배열에 있는 객체마다
				$.each(links, function(key, value){
					if(value.type == "BK"){						
						        buttons = buttons + '<div class="chat_bot_category"><a href="#" class="" id="' + key + '" onclick="javascript:sendValue(this);"  >' + value.name + '</a></div>';	
					}else{
						//브라우저가 돌아가고 있는 운영체제를 가져온다.
						if(navigator.platform){
							//filter로 지정한 운영체제, 즉 PC 환경이라면.
							if( filter.indexOf(navigator.platform.toLowerCase()) > 0 ){
								//링크 버튼 타입 체크
								if(value.type == "AL"){//App Link 버튼 생성.
									//모바일 환경에서 브라우저에 따라 target을 따로 잡아야 하는 경우가 있기에 사파리 예외처리
									if (navigator.userAgent.indexOf("Safari") != -1 && 
										navigator.userAgent.indexOf("Chrome") == -1 && 
										navigator.userAgent.indexOf("CriOS") == -1) {										
										buttons = buttons + '<div class="chat_bot_category"><a href="'+ value.scheme_android+ '" class="" id="linkBtn"  target="_parent">' + value.name + '</a></div>';
									}else{ // 나머지 브라우저										
										buttons = buttons + '<div class="chat_bot_category"><a href="'+ value.scheme_android+ '" class="" id="linkBtn"  target="_self">' + value.name + '</a></div>';	
									}
								}else{
									/*buttons = buttons + '<ul class="chat_bot_category chat_bot_cf chat_bot_inList"><li><a href="#" id="linkBtn" onClick="window.open(' + "'" + value.url_mobile url_pc  + "'" + ')">' + value.name + '</a></li><ul>';*/
									buttons = buttons + '<div class="chat_bot_category"><a href="#" id="linkBtn" onClick="window.open(' + "'" + value.url_pc + "'" + ')">' + value.name + '</a></div>';
								}
							}else{ 
								//모바일 환경일 때 APP LINK 타입으로 들어왔다면.
								if(value.type == "AL"){
									//모바일 환경에서 브라우저에 따라 target을 따로 잡아야 하는 경우가 있기에 사파리 예외처리
									if (navigator.userAgent.indexOf("Safari") != -1 && 
										navigator.userAgent.indexOf("Chrome") == -1 && 
										navigator.userAgent.indexOf("CriOS") == -1) {										
										buttons = buttons + '<div class="chat_bot_category"><a href="'+ value.scheme_android+ '" class="" id="linkBtn"  target="_parent">' + value.name + '</a></div>';
									}else{ // 나머지 브라우저										
										buttons = buttons + '<div class="chat_bot_category"><a href="'+ value.scheme_android+ '" class="" id="linkBtn"  target="_self">' + value.name + '</a></div>';	
									}
								}else{
									buttons = buttons + '<div class="chat_bot_category"><a href="#" class="" id="linkBtn" onClick="window.open(' + "'" + value.url_mobile + "'" + ')">' + value.name + '</a></div>';	
								}
							}
						}
					}																
				});	
				
				//IE
				if(image_url == "" || image_url == null){
					
					$.chat(obj.user_key,{
						target : "client",
						clientName : n,
						msg : '<p>' + autolink(message) + '</p>'
							+ '<a href=' + '"' + file_url + '" target="_blank">'+ file_name + '</a>'
							+ auto_answer 
							+ buttons,
						/*time: new Date().format("a/p hh:mm")*/
						time: formatAMPM(new Date)							
					});
				}//if
				else{
					//서버에서 온 이미지가 포함되어 있을 때.
					$.chat(obj.user_key,{
						target : "client",
						clientName : n,
						//AS-IS : 텍스트 - 이미지 - 버튼 | TO-BE : 이미지-텍스트-버튼 
						msg : '<a href="#" alt="크게보기" onclick="window.open(\''+ image_url +'\', \'_blank\', \'width=512, height=384, resizable=yes\'); return false;">'
							+ '<img src="'+ image_url +'" alt="Image" style="padding-bottom: 10px"/>' //welcome 메시지 이미지 송출 시 텍스트와  
							+ '</a>'
						 	+ '<p>' + autolink(message) + '</p>'
							+ '<a href=' + '"' + file_url + '" target="_blank">'+ file_name + '</a>'
							+ auto_answer 
							+ buttons,
						/*time: new Date().format("a/p hh:mm")*/
						time: formatAMPM(new Date)							
					});
				}					
				
			}else if(obj.message_type == 'IM'){
				var image_url = obj.image_url;
				$.chat(obj.user_key, {
					target : "client",
					clientName : n,
					msg : '<a href="#" alt="크게보기" onclick="window.open(\''+ image_url +'\', \'_blank\', \'width=512, height=384, resizable=yes\'); return false;"><img src="'+ image_url +'" alt="Image" /></a>',
					/*time: new Date().format("a/p hh:mm")*/
					time: formatAMPM(new Date)		
				});							
			}else if(obj.MSG_TYPE == 'MSG_EMO'){
				var imgUrl = obj.LINK_URL;
				$.chat(obj.USER_KEY, {//account_id
					target: "client",
					clientName: n,			
					msg : '<img src="'+ imgUrl +'" alt="" />',
					/*time: new Date().format("a/p hh:mm")*/
					time: formatAMPM(new Date)
					});
				  					
			}else if(obj.message_type == 'VD'){
				var url = fileUploadUrl + obj.file_url;
				$.chat(obj.user_key, {//account_id
					target: "client",
					clientName: n,			
					msg : '<a href="'+ url +'" alt="" target="_blank">동영상파일</a>',
					/*time: new Date().format("a/p hh:mm")*/
					time: formatAMPM(new Date)
					});
				
			}else if(obj.message_type == 'AU'){
				var url = fileUploadUrl + obj.file_url;
				$.chat(obj.user_key, {//account_id
					target: "client",
					clientName: n,			
					msg : '<a href="'+ url +'" alt="" target="_blank">음성파일</a>',
					/*time: new Date().format("a/p hh:mm")*/
					time: formatAMPM(new Date)
					});		
				
			}else if(obj.MSG_TYPE == 'MSG_LI'){
				var url = obj.LINK_URL;						
				$.chat(obj.user_key, {//account_id
					target: "client",
					clientName: n,
					msg : '<a href="'+ url +'" alt="" target="_blank">링크</a>',
					/*time: new Date().format("a/p hh:mm")*/
					time: formatAMPM(new Date)
				});
				
			}else{
				
 				if(obj.result == 'success'){
 					endMsg();
 					roomUnsubscribe();
 					
 				}else if(obj.result == 'fail'){
 					$.chat(obj.user_key,{
						target: "client",
						clientName: n,
						msg: "서버 상태가 원활하지 않습니다.",
						/*time: new Date().format("a/p hh:mm")*/
						time: formatAMPM(new Date)
					});
 				}else if(obj.result == 'end'){
 					roomUnsubscribe();
 				} 	  	 				
			}//else					
		}		
		else{
			if(obj.message_type == 'TX'){
				$.chat(obj.user_key, {//account_id
						target: "me",				
						msg: autolink(obj.message),
						/*time: new Date().format("a/p hh:mm")*/
						time: formatAMPM(new Date)
				});  			
			}else if(obj.message_type == 'VD'){
				var url = fileUploadUrl + obj.file_url;
				$.chat(obj.user_key, {//account_id
					target: "me",			
					msg : '<a href="'+ url +'" alt="" target="_blank">동영상파일</a>',
					/*time: new Date().format("a/p hh:mm")*/
					time: formatAMPM(new Date)
				});
			}//else if
		}//else
	}
	
function goBefore(){
	if(userSubscribe == null ){
		return;
	}else{
		var sendData = {
				"user_key": user_key,
	  			"sender_key": sender_key,
	  			//"time": 1522387086667,
	  			//"serial_number": 1689884130894833200,
	  			"type":"text",
	  			"content":"*"	
		}
		//extra 값이 있을 때만 보내기
		if (extra != "" && extra != "undefined" && extra != null){
			sendData.extra = extra;
		}
		stompClient.send("/app/goStart", {}, JSON.stringify(sendData)); 
		
		$.chat('StringID', {
  			target: "me",
  			msg: "이전으로",
  			/*time: new Date().format("a/p hh:mm")*/
			time: formatAMPM(new Date)
		});  
	}
}

function goStart(){		
	if(userSubscribe == null ){
		return;
	}else{
		var sendData = {
				"user_key": user_key,
	  			"sender_key": sender_key,
	  			//"time": 1522387086667,
	  			//"serial_number": 1689884130894833200,
	  			"type":"text",
	  			"content":"#"	
		}
		//extra 값이 있을 때만 보내기
		if (extra != "" && extra != "undefined" && extra != null){
			sendData.extra = extra;
		}
		stompClient.send("/app/goStart", {}, JSON.stringify(sendData)); 

		$.chat('StringID', {
  			target: "me",
  			msg: "처음으로",
  			/*time: new Date().format("a/p hh:mm")*/
			time: formatAMPM(new Date)
		});  			
	} 		
}


function goEnd(end){
	
	//console.log(end);
	
	if(userSubscribe == null ){
		return;
	}else{

		var sendData = {
				"user_key": user_key,
	  			"sender_key": sender_key,
	  			//"time": 1522387086667,
	  			//"serial_number": 1689884130894833200,
	  			"type":"text",
	  			"content":"!종료"	
		}
		stompClient.send("/app/expiredSession", {}, JSON.stringify(sendData)); 

		$.chat('StringID', {
  			target: "me",
  			msg: end,
  			/*time: new Date().format("a/p hh:mm")*/
			time: formatAMPM(new Date)
		}); 	
	}
}

function sendValue(e){ 		

	if(userSubscribe == null){
		return;
	} 			
	var value = $(e).text();

	$(e).addClass('mainBorderColor activeBackColor activeFontColor');		
	var sendBtn = {
			"user_key": user_key,
			"sender_key": sender_key,
			//"time": 1522387086667,
			//"serial_number": 1689884130894833200,
			"type":"text",
			"content":value
	}
	//extra 값이 있을 때만 보내기
		if (extra != "" && extra != "undefined" && extra != null){
			sendBtn.extra = extra;
	}
		
	stompClient.send("/app/sendMsg", {}, JSON.stringify(sendBtn));
}


function chattingStart(e){
	
	if(u_type == 'N'){
		
		var value = $(e).text();
		
	}else{
		
		var value = start_btn;
		
	}
		
	if(userSubscribe != null){
	$(e).addClass('mainBorderColor activeBackColor activeFontColor');	
			
		var sendBtn = {
				"user_key": user_key,
				"sender_key": sender_key,
				//"time": 1522387086667,
				//"serial_number": 1689884130894833200,
				"type":"text",
				"content":value
		}
		//extra 값이 있을 때만 보내기
		if (extra != "" && extra != "undefined" && extra != null){
			sendBtn.extra = extra;
		}

		stompClient.send("/app/sendMsg", {}, JSON.stringify(sendBtn)); 
			
	}else{
		$(e).addClass('mainBorderColor activeBackColor activeFontColor');		
		connectWebsocket(value);
	}
	
	
}

function endMsg(){
	$.chat('StringID', {//account_id
		target: "client",
		clientName: n,
		msg: end_msg,
		/*time: new Date().format("a/p hh:mm")*/
		time: formatAMPM(new Date)
		}); 		  		
}

	function ajaxFileSend(){
		
		if(!sock){
			connectWebsocket();		
		}
		else{
		
			if(!userSubscribe){
				userSubscribe = stompClient.subscribe('/user/'+sessionId+'/subscribe', onUserMessage, headers);	
				setCookie(user_key , sender_key);
			}
			
				var file = $("#fileSend")[0].files[0]; 	
				
				if(file != null || file != undefined){	
					
			  		var fileCheck = document.getElementById("fileSend").value;  	  		
			  		var check = fileCheck.slice(fileCheck.lastIndexOf(".") + 1).toLowerCase();	  		

			  		if ( check=='jpg' || check=='jpeg' || check=='gif' || check=='bmp' || check=='png' ){ 	
				  		var formData = new FormData();  	
				  		formData.append('user_key' , user_key);
				  		formData.append('sender_key' , sender_key);
				  		formData.append('file' , file);			  		
				  		$.ajax({
				  			url : '/services/file/upload',
				  	  	    data: formData,
				  	  	    processData: false,
				  	  	    contentType: false,
				  	  	    type: 'POST',
				  	  		success: function(data){
				  	    		jsonData = JSON.parse(data);		  	    		
				  	    		var src = jsonData.src; 
				  				var imgUrl = src;		  	 	    	
				  	 	    	$.chat( 'StringID', {//account_id
				  					target: "me",
				  					msg : '<a href="#" alt="크게보기" onclick="window.open(\''+ imgUrl +'\', \'_blank\', \'width=512, height=384, resizable=yes\'); return false;"><img src="'+ imgUrl +'" alt="Image" /></a>',
				  					/*time: new Date().format("a/p hh:mm")*/
									time: formatAMPM(new Date)
				  				});		  	 	    	
				  	 	    	var sendData = {
				  	 	    			"user_key":user_key,
				  						"sender_key":sender_key,
				  						//"time":1522387086667,
				  						//"serial_number": 1689884130894833200,
				  						"type":"photo",
				  						"content":{"url":imgUrl , "name":jsonData.FILE_NM}
				  	 	    	}//sendData
				  	 	    	stompClient.send("/app/sendImg", {}, JSON.stringify(sendData));		 	    	
				  	  		}//success
				  		});			  		
				  		$("#fileSend").val('');	

			  		}else if ( check=='pdf' ){
			  			var formData = new FormData();  	
				  		formData.append('user_key' , user_key);
				  		formData.append('sender_key' , sender_key);
				  		formData.append('file' , file);	
				  		$.ajax({
				  			url : '/services/file/upload',
				  	  	    data: formData,
				  	  	    processData: false,
				  	  	    contentType: false,
				  	  	    type: 'POST',
				  	  		success: function(data){
				  	    		jsonData = JSON.parse(data);
				  				var fileUrl = jsonData.src; 
				  	 	    	$.chat( 'StringID', {
				  					target: "me",
				  					msg : '<a href=' + '"' + fileUrl + '" target="_blank">'+ jsonData.FILE_NM + '</a>',
				  					/*time: new Date().format("a/p hh:mm")*/
									time: formatAMPM(new Date)
				  				});		  	 	    	
				  	 	    	var sendData = {
				  	 	    			"user_key":user_key,
				  						"sender_key":sender_key,
				  						//"time":1522387086667,
				  						//"serial_number": 1689884130894833200,
				  						"type":"file",
				  						"content":{"url":fileUrl , "name":jsonData.FILE_NM}
				  	 	    	}
				  	 	    	stompClient.send("/app/sendImg", {}, JSON.stringify(sendData));		 	    	
				  	  		}
				  		});			  		
				  		$("#fileSend").val('');	

			  		}else if ( check == 'mp4' || check == 'avi' || check == 'mov' || check == 'wmv' ){
			  			var formData = new FormData();  	
				  		formData.append('user_key' , user_key);
				  		formData.append('sender_key' , sender_key);
				  		formData.append('file' , file);
				  		
				  		$.ajax({
				  			url : '/services/file/upload',
				  			data: formData,
				  	  	    processData: false,
				  	  	    contentType: false,
				  	  	    type: 'POST',
				  	  	    success : function(data){
				  	  	    	jsonData = JSON.parse(data);
				  	  	    	var videoUrl = jsonData.src;
				  	  	    	$.chat( 'StringID', {
				  	  	    		target: "me",
				  	  	    		msg : '<a href=' + '"' + videoUrl + ' " target="_blank">동영상 파일</a> ',
				  	  	    		/*time: new Date().format("a/p hh:mm")*/
									time: formatAMPM(new Date)
				  	  	    	});
				  	  	    	var sendData = {
				  	  	    		"user_key":user_key,
			  						"sender_key":sender_key,
			  						//"time":1522387086667,
			  						//"serial_number": 1689884130894833200,
			  						"type":"video",
			  						"content":{"url":videoUrl, "name":jsonData.FILE_NM}
				  	  	    	}
				  	  	    	stompClient.send("/app/sendImg", {}, JSON.stringify(sendData));		 	 
				  	  	    }
				  		});
				  		$("#fileSend").val('');	
			  		
			  		}else{
			  			alert('첨부할 수 없는 확장자 입니다.');
			  			$("#fileSend").val('');	 
			  		}
			}
		}
	}
		
		
		