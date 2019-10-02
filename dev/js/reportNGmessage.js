$(document).on('click', '#report', function(e){
    let message_num=$(this).attr('name');
    let coverBlock=document.querySelector('.section_rides_DetailedIntroduction');
    coverBlock.innerHTML += `<div class="coverBlock">
    <form class="reportMessage" method="POST"><h3>檢舉內容</h3><textarea id="report_message" placeholder="請輸入留言..." required></textarea><input type="button" name="btn-close" class="btn-close" id="btn-close"><div id="btn-close" class="fork left"></div><div id="btn-close" class="fork right"></div><input type="button" class="toReport" value="舉報" id="${message_num}"></form></div>`;
})
$(document).on('click', '#btn-close', function(){
    let closeWidow=document.querySelector('.coverBlock');
    closeWidow.remove();
})
$(document).on('click', '.toReport',function(){
    let message_no = $(this).attr('id');
    console.log(`您舉報了第${message_no}號留言`);
	// var equ_no = $('#equ_no').val();
	// var equ_message = $('#equ_message').val();
	// var report_status = $('#report_status').val();
    let report_message = $('#report_message').val();
    $.ajax({
		url:"php/ngmess.php",
		method:'POST',
		data:{
			message_no: message_no,
			// member_no: member_no,
			// equ_no: equ_no,
			// equ_message: equ_message,
			// report_status: report_status,
			report_message: report_message		
		},
		success:function(){
			$('.coverBlock').css('display', 'none');
			$(`#messageNo_${message_no}`).remove();
			console.log(`#messageNo_${message_no}`)
			console.log("回報成功");
			// 寫完立即增加到下方

		}
	})
	alertify.alert("回報成功!");
	$(document).on('click', '.ajs-button', function(){
		window.location.reload();
	})
})