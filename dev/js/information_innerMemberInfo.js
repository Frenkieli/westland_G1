localStorage['member_useTicket']=null;
let member_useTicket=[];
window.addEventListener('load',function (){ 
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
                var i=1;
                var app5 = new Vue({
                    el: '#app-5',
                    data: {
                    message: 'Hello Vue.js!'
                    },
                    methods: {
                    
                    reverseMessage: function () {
                        this.message = this.message.split('').reverse().join('');
                        app4.todos.push({ text: 'New item'+i });
                        i++;
                    }
                    }
                });
        }else{
            alert('尚未登入會員，無法留言！立刻幫您跳轉！');
            window.location.href = 'ticket.html';
            return;
        }
    }
},false);
