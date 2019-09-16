$(document).on('click', '#report', function(){
    let coverBlock=document.querySelector('.section_rides_DetailedIntroduction');
    coverBlock.innerHTML += '<div class="coverBlock"><div class="reportMessage"><h3>檢舉內容</h3><textarea id="equ_message" placeholder="請輸入留言..." required></textarea><input type="button" name="btn-close" class="btn-close" id="btn-close"><div id="btn-close" class="fork left"></div><div id="btn-close" class="fork right"></div></div></div>';
})
$(document).on('click', '#btn-close', function(){
    let closeWidow=document.querySelector('.coverBlock');
    closeWidow.remove();
})