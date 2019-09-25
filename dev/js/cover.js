function cover() {
    let cover = document.getElementById('coverpage');

    cover.classList.add('displaynone');
    setTimeout(() => {
        cover.style.display='none';
    }, 300);
}
window.addEventListener('load', cover, false);