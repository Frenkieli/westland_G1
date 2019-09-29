window.addEventListener('load',function (){ 
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            // console.log(xhr.responseText);
            getMember(xhr.responseText);
        }
        else {
            alert(xhr.status);
        }
    } 
    let url="php/getMemGetMsg_info.php";
        xhr.open('post', url, true);
        xhr.send(null);

    function getMember(jsonStr) {
        let display_MEM_MSG =JSON.parse(jsonStr);
        // console.log(display_MEM_MSG);
        for (let i = display_MEM_MSG.length -1; i >= 0; i--) {
            var display_MSG = document.getElementById('messages');
            display_MSG.innerHTML += `
            <div class="message_container equ_no${display_MEM_MSG[i].equ_no}" id="messageNo_${display_MEM_MSG[i].message_no}">
                <div class="who">
                    <div id="who_name" class="name name_memberNo_${display_MEM_MSG[i].member_no}">
                        ${display_MEM_MSG[i].member_name}
                    </div>
                    <img id="who_pic" class="pic pic_memberNo_${display_MEM_MSG[i].member_no}" src="${display_MEM_MSG[i].image_source}">
                    <div class="frame">
                        <div id="who_teamName" class="teamName team_memberNo_${display_MEM_MSG[i].member_no}">
                        ${display_MEM_MSG[i].team_name}
                        </div>
                    </div>
                        <div id="who_bounty" class="bounty bounty_memberNo_${display_MEM_MSG[i].member_no}">
                        $${display_MEM_MSG[i].bounty}
                        </div>
                </div>
                <div class="message_box" id="message_box">
                    <div id="message" style="border-radius:10px;">
                        ${display_MEM_MSG[i].equ_message}
                    </div><input type="button" class="btn-report" value="檢舉" id="report" name="${display_MEM_MSG[i].message_no}">
                </div>
                <div class="mascot mascot_memberNo_${display_MEM_MSG[i].member_no}">
                    <img class="mascot_image" src="${display_MEM_MSG[i].mascot_image}" alt="客製化吉祥物">
                </div>`;
        };
    }
},false)