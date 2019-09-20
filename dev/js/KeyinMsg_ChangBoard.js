let loginBoard= document.getElementById("butsave"); //設置按鈕事件


function init() {
    let loginIsTure =sessionStorage['member_no']; //設置暫存變數
    if (loginIsTure) {
        console.log(222222)
        console.log(loginIsTure)
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                getMember(xhr.responseText);
            }
            else {
                window.alert(xhr.status);
            }
        } 
        let url="php/getMemGetMsg_info.php";
            xhr.open('post', url, true);
            xhr.send(null);
    
        function getMember(jsonStr) {
            let display_MEM_MSG =JSON.parse(jsonStr);
            console.log(display_MEM_MSG);
            $(`.name_login`).html(`${display_MEM_MSG[loginIsTure].member_name}`);
            $(`.pic_login`).attr('src', `${display_MEM_MSG[loginIsTure].image_source}`);
            $(`.teamName_login`).html(`${display_MEM_MSG[loginIsTure].team_name}`);
            $(`.bounty_login`).html(`$${display_MEM_MSG[loginIsTure].bounty}`);
            $(`.mascot_login`).html(`<img class="mascot_image" src="../dest/${display_MEM_MSG[loginIsTure].mascot_image}" alt="客製化吉祥物">`);
            }
        }else{
            return;
        }
    }

loginBoard.addEventListener('click',function(){
    let loginIsTure =sessionStorage['member_no']; //設置暫存變數
    if (loginIsTure) {
        let message=$('#equ_message').val();  //設置對話框輸入文字為此變數
        if (message.replace(/[\s　]+/g, "") == "") {  //如果空白不准發送
            window.alert('輸入文字不得為空白!');
        }else{
            let message_no = $('#message_no').val();
            let member_no = $('#member_no').val();
            let equ_no = $('#equ_no').val();
            let equ_message = $('#equ_message').val();
            $.ajax({
                url:"php/keyinMessage.php",
                method:'POST',
                data:{
                    message_no: message_no,
                    member_no: member_no,
                    equ_no: equ_no,
                    equ_message: equ_message,		
                },
                error:function() {
                    window.alert("連線失敗!")
                },
                success:function(){
                    window.alert("感謝您留言，訊息已發送!!")
                    window.location.reload();
                }
            })
        }
    }else{
        alert('尚未登入會員，請您先登入會員！');
        $('#lightBox').css('display', 'block');
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
                type: 'post',
                url: "php/getLogin.php",
                data: { member_id: $("#mem_id").val(), member_psw: $("#mem_psw").val() }, 
                success: function (data2) { 
                    let userData = JSON.parse(data2);
                    $.each(userData[0], function (index, value) {
                        
                        if(index == 'member_id' || index == 'member_psw'){
                            return;
                        }else{
                            sessionStorage.setItem(index, value);
                        }
                    });
                    window.alert("感謝您，登入成功!!")
                    window.location.reload();
                    $('#lightBox').css('display', 'none');
                    console.log('sessionStorage: ' + sessionStorage.member_id)
                }, error: function (XMLHttpRequest, textStatus) {
                    console.log(XMLHttpRequest);
                    console.log(textStatus);
                    window.location.reload();
                }
            });
        });
        $('.login_cancel img').click(function () {
            $('#lightBox').css('display', 'none');
        });
    }
},false)

window.addEventListener('load',init,false);