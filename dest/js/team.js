
function $id(id) {
    return document.getElementById(id);
}
function join() {
    // console.log(1);
    $id("join").style.display='';
    $id("joined").style.display='none';
    $id("create").style.display='none';
    $id("team_join").classList.add('team_option_select');
    $id("team_joined").classList.remove('team_option_select');
    $id("team_create").classList.remove('team_option_select');
    for(let i=0 ; i<document.querySelectorAll('.team_list_box').length;i++){
        // console.log(i);
        document.querySelectorAll('.team_list_box')[i].addEventListener("click",joinInvitation,false);
    }
    $id("ok").innerText='加入團隊';
    // console.log($id("ok"));
    $id("no").innerText='我不要';
}
function joinInvitation(e){
    // console.log(e.target);
    // console.log(e.currentTarget)
    // console.log(this);
    // console.log($id("team_join_window"));
    $id("team_join_window").style.opacity=1;
    $id("team_join_window").style.display="";
    // var p = this;
    // var p_prime = p.cloneNode(true);
    // console.log(p_prime);
    // var t=document.querySelector(".join_button_container");
    // $id("team_join_window").firstChild.insertBefore(,t);
    $id("no").addEventListener("click",()=>{
        $id("team_join_window").style.display="none";
    },false);
    $id("ok").addEventListener("click",()=>{
        this.remove();
        $id("team_join_window").style.display="none";
        $id("joined").append(this);
    },false);
    // var addjoined=this;
    // console.log(this);
    
    // $id("ok").innerText='加入團隊';
    // $id("no").innerText='我不要';
    // console.log(this);
}

function joined() {
    $id("join").style.display='none';
    $id("create").style.display='none';
    $id("joined").style.display='';
    $id("team_join").classList.remove('team_option_select');
    $id("team_joined").classList.add('team_option_select');
    $id("team_create").classList.remove('team_option_select');
    for(let i=0 ; i<document.querySelectorAll('.team_list_box').length;i++){
        document.querySelectorAll('.team_list_box')[i].addEventListener("click",dropOut,false);
    }
    $id("ok").innerText='退出團隊';
    $id("no").innerText='我不想';
}
function dropOut(e){
    console.log(this);
    $id("team_join_window").style.opacity=1;
    $id("team_join_window").style.display="";
    $id("no").addEventListener("click",()=>{
        $id("team_join_window").style.display="none";
    },false);
    $id("ok").addEventListener("click",()=>{
        this.remove();
        $id("team_join_window").style.display="none";
    },false);
}

function create() {
    $id("join").style.display='none';
    $id("joined").style.display='none';
    $id("create").style.display='';
    $id("team_join").classList.remove('team_option_select');
    $id("team_joined").classList.remove('team_option_select');
    $id("team_create").classList.add('team_option_select');
}

window.addEventListener("load", function () {
    $id("team_join").addEventListener("click", join, false);
    $id("team_joined").addEventListener("click", joined, false);
    $id("team_create").addEventListener("click", create, false);
    join();
    // create();
    // $id("team_join_window").style.opacity=1;
    $id("team_join_window").style.display="none";
}, false);