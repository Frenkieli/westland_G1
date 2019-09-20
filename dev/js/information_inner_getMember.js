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
        for (let i = 0; i <=display_member.length; i++) {
            $(`.name_memberNo_${i+1}`).html(`${display_member[i].member_name}`);
            $(`.pic_memberNo_${i+1}`).attr('src', `${display_member[i].image_source}`);
            $(`.team_memberNo_${i+1}`).html(`${display_member[i].team_name}`);
            $(`.bounty_memberNo_${i+1}`).html(`$${display_member[i].bounty}`);
            $(`.mascot_memberNo_${i+1}`).html(`<img class="mascot_image" src="../dest/${display_member[i].mascot_image}" alt="客製化吉祥物">`);
            console.log(`.name_memberNo_${i+1}`);
            console.log(`.pic_memberNo_${i+1}`);
            console.log(`.team_memberNo_${i+1}`);
            console.log(`.bounty_memberNo_${i}`);
            console.log(`.mascot_memberNo_${i}`);
        }
        // for (let i =display_member.length-1; i>=0; i--) {
        //     $(`.name_memberNo_${i+1}`).html(`${display_member[i].member_name}`);
        //     $(`.pic_memberNo_${i+1}`).attr('src', `${display_member[i].image_source}`);
        //     $(`.team_memberNo_${i+1}`).html(`${display_member[i].team_name}`);
        //     $(`.bounty_memberNo_${i+1}`).html(`$${display_member[i].bounty}`);
        //     $(`.mascot_memberNo_${i+1}`).html(`<img class="mascot_image" src="../dest/${display_member[i].mascot_image}" alt="客製化吉祥物">`);
        //     console.log(`.name_memberNo_${i+1}`);
        //     console.log(`.pic_memberNo_${i+1}`);
        //     console.log(`.team_memberNo_${i+1}`);
        //     console.log(`.bounty_memberNo_${i}`);
        //     console.log(`.mascot_memberNo_${i}`);
        // }
    }
    // console.log(newArr)
    // let arr = [];
    // display_member.forEach((obj, i) => {
    //     arr[i] = obj['message_no'];
    // });
    // let newArr = [...new Set(arr)];
}
,false);