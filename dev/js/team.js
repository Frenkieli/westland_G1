let wanted_name='';
let wanted_playerphoto='';
let wanted_teamname='';
let wanted_bounty='';
let wanted_mascot='';
let info_teamname='';
let info_teamslogan='';
let info_teamcount='';

function $id(id) {
    return document.getElementById(id);
}
function join() {
    // console.log(1);
    $id("joined").style.display = 'none';
    $id("create").style.display = 'none';
    $id("join").style.display = '';
    $id("team_join").classList.add('team_option_select');
    $id("team_joined").classList.remove('team_option_select');
    $id("team_create").classList.remove('team_option_select');
    var select = document.querySelectorAll('#join .team_list_box')

    select.forEach((ele, index) => {
        ele.classList.add('click_join');
        ele.style.cursor="pointer";
        ele.removeEventListener('click',dropOut,false);
    });
    var click_joins=document.querySelectorAll('.click_join');
    click_joins.forEach((ele,index)=>{
        ele.addEventListener('click', joinInvitation, false);
        // console.log('!');    
    });
    // for(i in select){
    //     select[i].addEventListener('click',joinInvitation,false);
    // }
    let aa = [...document.querySelectorAll('#join .team_list_box')];
    console.log(aa); 
    // for(let i=0 ; i<document.querySelectorAll('.team_list_box').length;i++){
    //     document.querySelectorAll('.team_list_box')[i].addEventListener("click",joinInvitation,false);
    // }
    $id("ok").innerText = '加入團隊';
    $id("no").innerText = '我不要';
}

function joinInvitation(e){
    // wanted_name=this.firstChild.firstChild.innerText;
    // console.log(this.firstChild);
    // console.log(wanted_name);
    // wanted_playerphoto='';
    // wanted_teamname='';
    // wanted_bounty='';
    // wanted_mascot='';
    // info_teamname='';
    // info_teamslogan='';
    // info_teamcount='';
    console.log(this);
    // console.log(e.targe);

    // let c=this.clone(true);

    // document.querySelector('.team_join_container').append(this);
    $id("team_join_window").style.opacity = 1;
    $id("team_join_window").style.clipPath = "polygon(0 0% , 100% 00% , 100% 100%,0 100%)";
    $id("no").addEventListener("click", () => {
        $id("team_join_window").style.clipPath = "polygon(0 50% , 100% 50% , 100% 50%,0 50%)";
        $id("team_join_window").style.opacity = 0;
    }, false);
    $id("ok").addEventListener("click", () => {
        // this.remove();
        $id("joined").append(this);
        // console.log(e.currentTarget);
        console.log(this);
        $id("team_join_window").style.clipPath = "polygon(0 50% , 100% 50% , 100% 50%,0 50%)";
        $id("team_join_window").style.opacity = 0;
        this.classList.remove('click_join');
    }, false);
}

function joined() {
    $id("join").style.display = 'none';
    $id("create").style.display = 'none';
    $id("joined").style.display = '';
    $id("team_joined").classList.add('team_option_select');
    $id("team_join").classList.remove('team_option_select');
    $id("team_create").classList.remove('team_option_select');
    let select=document.querySelectorAll('#joined .team_list_box');
    select.forEach((ele,index)=>{
        ele.classList.add('click_joined');
        ele.style.cursor="pointer";
        ele.removeEventListener('click',joinInvitation,false);
    });
    let click_joined=document.querySelectorAll('.click_joined');
    click_joined.forEach((ele,index)=>{
        ele.addEventListener('click',dropOut,false);
    });
    $id("ok").innerText = '退出團隊';
    $id("no").innerText = '我不想';
}

function dropOut() {
    wanted_name='';
    wanted_playerphoto='';
    wanted_teamname='';
    wanted_bounty='';
    wanted_mascot='';
    info_teamname='';
    info_teamslogan='';
    info_teamcount='';
    $id("team_join_window").style.opacity = 1;
    $id("team_join_window").style.clipPath = "polygon(0 0% , 100% 00% , 100% 100%,0 100%)";
    $id("no").addEventListener("click", () => {
        $id("team_join_window").style.clipPath = "polygon(0 50% , 100% 50% , 100% 50%,0 50%)";
        $id("team_join_window").style.opacity = 0;
    }, false);
    $id("ok").addEventListener("click", () => {
        this.remove();
        $id("join").append(this);
        $id("team_join_window").style.clipPath = "polygon(0 50% , 100% 50% , 100% 50%,0 50%)";
        $id("team_join_window").style.opacity = 0;
        this.classList.remove('click_joined');
    }, false);
}

function create() {
    $id("join").style.display = 'none';
    $id("joined").style.display = 'none';
    $id("create").style.display = '';
    $id("team_join").classList.remove('team_option_select');
    $id("team_joined").classList.remove('team_option_select');
    $id("team_create").classList.add('team_option_select');
}

window.addEventListener("load", () => {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 100,
        nav: true,
        // dots: true,
        dotsEach: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
    $id("team_join").addEventListener("click", join, false);
    $id("team_joined").addEventListener("click", joined, false);
    $id("team_create").addEventListener("click", create, false);
    join();
    // create();
    // $id("team_join_window").style.opacity=1;
    // $id("team_join_window").style.display="none";
}, false);