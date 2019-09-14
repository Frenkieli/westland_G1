$(document).on('click', '#butsave', function(){
	var message_no = $('#message_no').val();
	var member_no = $('#member_no').val();
	var equ_no = $('#equ_no').val();
	var equ_message = $('#equ_message').val();
	var report_status = $('#report_status').val();
	var report_message = $('#report_message').val();
	$.ajax({
		url:"php/keyinMessage.php",
		method:'POST',
		data:{
			message_no: message_no,
			member_no: member_no,
			equ_no: equ_no,
			equ_message: equ_message,
			report_status: report_status,
			report_message: report_message		
		},
		success:function(){
			console.log("寫入成功");
			// 寫完立即增加到下方
			var messagesList = document.getElementById('messages');
			messagesList.innerHTML += '<div class="message_container"><img class="who" src="images/information/who.svg" alt="頭像"><div id="messagesBox"><div id="message" style="border-radius:10px;">' + equ_message + '</div></div></div>';
			window.alert('已送出訊息!');
		}
	})
})