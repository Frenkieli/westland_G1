localStorage['member_useTicket']=null;
let member_useTicket=[];
$(document).on('click', '#butsave', function(){
	var ticketKeep =sessionStorage['member_no'];
    console.log(ticketKeep);
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            toCheckMember(xhr.responseText);
        }
        else {
            alert(xhr.status);
        }
    } 
    let url="php/getMemberToInfoPage.php";
    xhr.open('post', url, true);
    let ticket_info = `mem_no:${ticketKeep}`;
	xhr.send(ticket_info);
	
		function toCheckMember(jsonStr) {
			let displayMessage =JSON.parse(jsonStr);
			console.log(displayMessage);
		if (ticketKeep) {
			var message_no = $('#message_no').val();
			var member_no = $('#member_no').val();
			var equ_no = $('#equ_no').val();
			var equ_message = $('#equ_message').val();
			// var report_status = $('#report_status').val();
			// var report_message = $('#report_message').val();
			$.ajax({
				url:"php/keyinMessage.php",
				method:'POST',
				data:{
					message_no: message_no,
					member_no: member_no,
					equ_no: equ_no,
					equ_message: equ_message,
					// report_status: report_status,
					// report_message: report_message		
				},
				success:function(){
					console.log("寫入成功");
					// 寫完立即增加到下方
					var messagesList = document.getElementById('messagesTop');
					messagesList.innerHTML += '<div class="message_container"><img class="who" src="images/information/who.svg" alt="頭像"><div id="message_box"><div id="message" style="border-radius:10px;">' + equ_message + '</div></div></div>';
					window.alert('已送出訊息!');
				}
			})
		}else{
			alert('尚未登入會員，請您先登入會員！');
			$('#lightBox').css('display', 'block');
			if (condition) {
				$("#mem_id").change(function () {
					if ($("#mem_id").val().search(nnn)) {
						console.log('不可');
					} else {
						console.log('可');
					}
				});
				$("#mem_psw").change(function () {
					if ($("#mem_psw").val().search(nnn)) {
						console.log('不可');
					} else {
						console.log('可');
					}
				});
				$("#mem_id").val();
				$("#mem_psw").val();
				$("#login_button").click(function () {
					$.ajax({
						type: 'post',               //post/get 傳送方式
						url: "php/getLogin.php",    //url位置
						data: { member_id: $("#mem_id").val(), member_psw: $("#mem_psw").val() }, //輸入的資料
						success: function (data2) { //成功之後要執行的函數------> data2:從後端撈起的資料
							console.log(data2) 
							let userData = JSON.parse(data2);
							console.log(userData)
							$.each(userData[0], function (index, value) {
								
								if(index == 'member_id' || index == 'member_psw'){
									return;
								}else{
									sessionStorage.setItem(index, value); // 將資料存在sessionStorage
								}
								console.log(value)
							});
							$('#lightBox').css('display', 'none'); //成功之後...>燈箱關掉
							console.log('sessionStorage: ' + sessionStorage.member_id)
						}, error: function (XMLHttpRequest, textStatus) { //錯誤的話要執行的函數
							console.log(XMLHttpRequest);  //XMLHttpRequest.responseText    XMLHttpRequest.status   XMLHttpRequest.readyState
							console.log(textStatus);
						}
					});
				});
			} else {
				$('.login_cancel img').click(function () {
					$('#lightBox').css('display', 'none');
				});
			}
		}
	}
})