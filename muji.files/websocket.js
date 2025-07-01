//var socketUrl = '<%=UvConfig.WEBCHATUI_GW_URL%>';
var sock = null;
var stompClient = null;
var sessionId = null;

var cookie_user = "";
var cookie_sender ="";

var user_key = "";
//var unique_key = '${PROJECT.UNIQUE_KEY}';
var ip = "";    
var userSubscribe = null;

var headers = {	
  		 //login: 'mylogin',
  	     //passcode: 'mypasscode',		
   }

//상담 시작 버튼, 입력 메시지 프로젝트 별 분기
var start_btn_a;
var alert_enter_msg;
$(document).ready(function() { 
	//상담 시작 버튼, 입력 메시지 프로젝트 별 분기
		switch(sender_key){			
			case 'q0a80x8hqgjiairf7ck8yeto0o46zyttdk95g5pu': //HMM 운영계			
			case '5qtkb8ftynbgtofjmejiwr3e5x9mugneyqu3uayk': //HMM 개발계				
				start_btn_a = 'Start a consultation';		
				alert_enter_msg = 'Please enter a message.';		
				break;
			default :				
				start_btn_a = '상담 시작 하기';		
				alert_enter_msg = '메시지를 입력하세요.';		
		}
});


function connect(){ 
		
		// 접속ip 가져오기
		$.ajax({
				url : '/services/open/selectKey',
				type : 'POST',
/*				data : {
					sender_key : sender
				}, 	*/			
				success : function(data){
					
					//unique_key = data.unique_key;
											
					ip = SHA256(data.ip).substring(0,5);
					
					if(ip == null || ip == "" ){
		  	  			console.log("load");
		  	  			return false;
		  	  		}
					
					var button = '<div class="chat_bot_category"><a href="#" class="" id="상담" onclick="javascript:chattingStart(this);"  >' + start_btn_a + '</a></div>';
					
					//자동 시작이 N이라면.
					if (u_type == 'N' ){

						//ST메시지 
						$.chat('StringID', {//account_id
							target: "client",
							clientName: n,
							msg: '<p>' + autolink(STM) + '</p>'
								+ button,
							/*time: new Date().format("a/p hh:mm")*/
  	  						time: formatAMPM(new Date)
						}); 
						
					}else{

						chattingStart();
						
					}
														
				}					
			});	
}

function setCookie(user, sender){	
	window.parent.postMessage({user_key : user, sender_key : sender , fn : 'd'},'*');
}

function getCookie(){

        var cookies = document.cookie.split("; ");

        for (var i=0; i<cookies.length; i++) {
            if (cookies[i].split("=")[0] == "user")  {
            	cookie_user = cookies[i].split("=")[1];
               
            }else if (cookies[i].split("=")[0] == "sender"){
            	cookie_sender = cookies[i].split("=")[1]; 
               
            }
        }
}


function maintainWebsocket(key){
		
	if(sock == null){
		
    	sock = new SockJS(socketUrl + '/services/addChat'); 
    }
    if(stompClient == null){
     	stompClient = Stomp.over(sock);
           
    }
	
    stompClient.connect(headers, function(frame){

    	stompClient.subscribe('/subscribe/echo', onUserMessage);

    	if(sessionId == null){
               
    		if(sock._transport.transportName=="websocket"){
    			sessionId = key;
            	user_key = key;
            	
    		} else {
    			sessionId = key;
            	user_key = key;
    		}
    	}
    	
    	headers.user_key = user_key;
    	headers.sender_key = sender_key;
    	
    	setCookie(user_key , sender_key);
    	
    	if(userSubscribe != null ){
    		userSubscribe.unsubscribe();
    	}
    	
		userSubscribe = stompClient.subscribe('/user/'+sessionId+'/subscribe', onUserMessage, headers);	
		
    }); 
    
}

//소켓 연결
function connectWebsocket(value){   
		
    if(sock == null){
        
    	sock = new SockJS(socketUrl + '/services/addChat'); 
    }
    if(stompClient == null){
    	
    	stompClient = Stomp.over(sock);  
    	
    }
    
    stompClient.connect(headers, function(frame){

    	stompClient.subscribe('/subscribe/echo', onUserMessage);

    	if(sessionId == null){
                
    		if(sock._transport.transportName=="websocket"){
            	sessionId = /\/([^\/]+)\/websocket/.exec(sock._transport.url)[1];
            	user_key = /\/([^\/]+)\/websocket/.exec(sock._transport.url)[1];     
            	
    		} else {
            	sessionId = unique_key + sock._transport.url.split('/').reverse()[0] + ip;
            	user_key = unique_key + sock._transport.url.split('/').reverse()[0] + ip;
    		}
    	}
    	
    	headers.user_key = user_key;
    	headers.sender_key = sender_key;
    	
    	setCookie(user_key , sender_key);
    	
    	if(userSubscribe != null ){
    		userSubscribe.unsubscribe();
    	}
    	
		userSubscribe = stompClient.subscribe('/user/'+sessionId+'/subscribe', onUserMessage, headers);
		if(value != null){
			
			sendServerMessage(value);
			
		}else{
			
			ajaxFileSend();
			
		}	
		
    }); 

    if(userSubscribe != null ){
		userSubscribe.unsubscribe();
	}
    
    if(sessionId != null){
           
	    if(value != null){
			
			sendServerMessage(value);
			
		}else{
			
			ajaxFileSend();
			
		}
    }

	sock.onclose = function(){
		console.log('종료');
		userSubscribe = null;
		sock = null;
		stompClient = null;
        setTimeout(connectWebsocket, 5000);				 			
    }; 
	
}
	
//웹소캣 서버로 메시지 전송
function sendServerMessage(msg) {	

	//기존 구독중인 채널은 해제
	if(userSubscribe == null){
		
		if( msg.replace(/(\s*)/g, "").length < 1 ){
			alert(alert_enter_msg);
			return;
		}		
		else if( msg == "!종료"){
			return;
		} 
		userSubscribe = stompClient.subscribe('/user/'+sessionId+'/subscribe', onUserMessage, headers);	
	}
	
	if( msg.replace(/(\s*)/g, "").length < 1 ){
		alert(alert_enter_msg);
		return;
	}  		
	
   var sendData = {
		"user_key": user_key,
		"sender_key": sender_key,
		"type":"text",
		"content":msg
   }
   //extra 값이 있을 때만 보내기
	if (extra != "" && extra != "undefined" && extra != null){
		sendData.extra = extra;
	}
   
   if ( sendData.content.replace(/(\s*)/g, "") == "!종료" ){	   	
	   
	   //console.log('종료');
	   
	   $.chat('StringID', {
			target: "me",
			msg: sendData.content,
			/*time: new Date().format("a/p hh:mm")*/
  	  		time: formatAMPM(new Date)
			});	   		   
	   stompClient.send("/app/expiredSession", {}, JSON.stringify(sendData)); 	   
   }else{  	   
    stompClient.send("/app/sendMsg", {}, JSON.stringify(sendData)); 
   }	   
}


function handleVisibilityChange(){
        
	if(userSubscribe != null ){
		
		//ios가 새로만든 세션
		var NsessionId = unique_key + sock._transport.url.split('/').reverse()[0];
		var nip = sessionId.substr(sessionId.length - 5);
		
		NsessionId = NsessionId+nip;
		
		//alert(NsessionId + ": " + sock.readyState);
		
		if (!document.hidden) {
			setTimeout(iframe_reload, 500);
		}
		
		//if (sock.readyState == '1'){
			/*
			var sendData = {
					"user_key": user_key,
					"sender_key": sender_key,
					"type":"text",
					"content":"!종료"	
			}
			
			stompClient.send("/app/expiredSession", {}, JSON.stringify(sendData));
			*/
			//setTimeout(iframe_reload, 0);
		//}else{

			//return;

		//}	
		
		//setTimeout(iframe_reload, 2000);		
		//setTimeout(iframe_reload, 1500);	
		
	}
}

function iframe_reload(){
	var dh_rel = window.location.href
	console.log(dh_rel);
	location.href = dh_rel;
	//console.log(dh);
	//location.href = dh;
	
}

function onUserMessage(message){	
	onPrivateMessage(message);
}

function roomUnsubscribe(){  		
	if( userSubscribe == null ){
		return false;
	} 		
	userSubscribe.unsubscribe();
	userSubscribe = null;
}
