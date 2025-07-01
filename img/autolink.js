function autolink(msg) {	
	//상담사가 CXpert에서 이모티콘을 보낼 때 TX 타입으로 <img> 태그를 만들어서 그대로 보내기 때문에 regURL replace 되지 않도록 예외처리.
	//하지 않을 시 <img src="https://..."의 src URL이 replace가 됨.
	if (!msg.includes("<img")) {
		var regURL = new RegExp("(http|https|ftp|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)","gi");
		var phoneRegex = /((\({0,1}(0|\+61){0,1}(\ |-){0,1}0{0,1}(2|4|3|7|8){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{5}))|((\({0,1}(0|\+61){0,1}(\ |-){0,1}0{0,1}(2|4|3|7|8){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{4}))|((\({0,1}(0|\+61){0,1}(\ |-){0,1}0{0,1}(2|4|3|7|8){0,1}\){0,1}(\ |-){0,1}[0-9]{3}(\ |-){0,1}[0-9]{3}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{4}))/g;
	
		var phone =  /((\d{2,3}-))?\d{3,4}-\d{4}/g;
		 
		/*var phoneRegex1 = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
		var a = msg.replace( phoneRegex1, "<a href='tel:$&';>$&</a>");
		console.log(a);*/
		
		//iframe을 통해 렌더링되었기 때문에 Safari가 HTML 내에서 수행하는 것과 동일한 방식으로 호출 링크를 처리하지 않는다
		//그래서 Safari에서 전화번호 랜딩할때에는 target='_parent' 필수
		
		msg = msg.replace(regURL,"<a href='$1://$2' target='_blank' style='color:blue'>$1://$2</a>").replace( phone, "<a href='tel:$&'; target='_parent' style='color:blue'>$&</a>");
	}
	return msg;

}