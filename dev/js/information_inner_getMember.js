window.addEventListener('load',function (){ 
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            getMember(xhr.responseText);
        }
        else {
            alert(xhr.status);
        }
    } 
    let url="php/getMember_info.php";
        xhr.open('post', url, true);
        xhr.send(null);

    function getMember(jsonStr) {
        let display_member =JSON.parse(jsonStr);
        console.log(display_member);
        for (let i = 0; i < display_member.length; i++) {
            $(`.name_memberNo_${i}`).html(`${display_member[i].member_name}`);
            $(`.pic_memberNo_${i}`).attr('src', `${display_member[i].image_source}`);
            $(`.team_memberNo_${i}`).html(`${display_member[i].team_name}`);
            $(`.bounty_memberNo_${i}`).html(`$${display_member[i].bounty}`);
            $(`.mascot_memberNo_${i}`).html(`<img class="mascot_image" src="../dest/${display_member[i].mascot_image}" alt="客製化吉祥物">`);
        }
    }
}
,false);