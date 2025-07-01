
function chatBotHeight() {
	  
  var chatBotMain = document.querySelector(".chat_bot_main");	
  //var chatBotMain = document.querySelector("#dropZoneUpStringID");	
  
  var chatBotContent = $("#TCK.chat_bot .chat_bot_content");
  var chatBotHeader = $(".chat_bot .chat_bot_header");
  var chatBotChattingTab = $(".chat_bot .chat_bot_chatting_tab");
  // 반응형 대화창
   
  chatBotMain.style.height = window.innerHeight - chatBotHeader.innerHeight() - chatBotChattingTab.outerHeight() + "px";
  
  chatBotMain.style.top = chatBotHeader.innerHeight() + "px";
  
  //alert(window.innerHeight + "      *      " + chatBotHeader.innerHeight() + "      *      " + chatBotChattingTab.outerHeight());
  
  //alert(screen.height);
  
 /*if(chatBotMain.style.height == ''){
	 
	  var time = document.querySelector("#today_date");
	  
	  //chatBotMain.style.height = screen.height + "px";
	  //chatBotMain.style.top = chatBotHeader.innerHeight() + "px";
	  
	  //alert(chatBotMain.style.height);

	  //location.reload();
	  	    
  }*/
  
}


//PC,MOB공통이벤트
function chatBotAni() {
  $("#TCK.chat_bot .start_icon").click(function () {
    $("#TCK.chat_bot .start_icon p").show(); // 클릭시 start icon 에서 title 가시화
  });
  $(".chat_bot_time .chat_bot_oper").click(function () {
    $(this).siblings(".chat_bot_oper_layer ").toggle(); // 상담시간 토글버튼
    if ($(this).find("span").text() == "운영시간 보기") {
      $(this).find("span").text("운영시간 닫기");
    } else if ($(this).find("span").text() == "운영시간 닫기") {
      $(this).find("span").text("운영시간 보기");
    }
  });
  $(" .chat_bot_util .chat_botSet").click(function () {
    $(".chat_bot_setting").addClass("contentVisible"); //설정창 가시화
  });
  $(".chat_bot_setting .chat_bot_close").click(function () {
    $(".chat_bot_setting").removeClass("contentVisible"); // 설정창 비가시화
  });

  $(".chat_bot_setting form > span").click(function () {
    //  제일처음 수정텍스트 출력  클릭 후 ->저장텍스트 출력
    if ($(this).text() == "수정") {
      $(this).text("저장");
    } else if ($(this).text() == "저장") {
      $(this).text("수정");
    }
  });
  //메세지 수신알람 on / off
  $(".messages_alarm li button").click(function () {
    if (!$(this).hasClass("activeBackColor")) {
      $(this).addClass("activeBackColor");
    } else {
      $(this).removeClass("activeBackColor");
    }
  });
}
// resize시에 height 조정
function resizing() {
  $(window).resize(function () {
    chatBotHeight();
  });
}
// init
function chatBotInit() {
  chatBotHeight();
  chatBotAni();
  resizing();  
}

// ie 10/11버전 확인
var ua = window.navigator.userAgent;
if (ua.indexOf("MSIE ") > 0 || ua.indexOf("Trident/") > 0) {
  chatBotMain.style.marginTop = -1 + "px";
}
