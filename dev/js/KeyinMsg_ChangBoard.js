function init() {
    let loginIsTure =sessionStorage['member_no']; //設置暫存變數
    if (loginIsTure) {
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
        let url="php/newKeyinBoard.php";
            xhr.open('post', url, true);
            xhr.send(null);
    
        function getMember(jsonStr) {
            let display_MEM_MSG =JSON.parse(jsonStr);
            console.log(display_MEM_MSG);
            $(`.name_login`).html(`${display_MEM_MSG[loginIsTure -1].member_name}`);
            $(`.pic_login`).attr('src', `${display_MEM_MSG[loginIsTure -1].image_source}`);
            // $(`.teamName_login`).html(`${display_MEM_MSG[loginIsTure -1].team_name}`);
            $(`.bounty_login`).html(`$${display_MEM_MSG[loginIsTure -1].bounty}`);
            }
        }else{
            return;
        }
    }