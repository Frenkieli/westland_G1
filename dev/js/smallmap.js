let demo_container = document.getElementsByClassName('demo_container')[0];
let demo_toparrow = document.getElementsByClassName('demo_toparrow')[0];
let demo_bottom = document.getElementsByClassName('demo_bottom')[0];
let demo_leftarrow = document.getElementsByClassName('demo_leftarrow')[0];
let demo_rightarrow = document.getElementsByClassName('demo_rightarrow')[0];

let containerX = -33.3333;
let containerY = -33.3333;

demo_rightarrow.addEventListener('click', moveRight, false);
demo_leftarrow.addEventListener('click', moveLeft, false);
demo_toparrow.addEventListener('click', moveTop, false);
demo_bottom.addEventListener('click', moveBottom, false);

document.addEventListener('keydown', keyMove, false);

let smallMap = document.querySelector(".map_container");

function keyMove(e) {
    console.log();
};

function moveTop(e) {
    let removeChild =document.getElementsByClassName('point')[0];
    removeChild.remove();
    if (containerY <= -10) {
        containerY += 33.3333;
        demo_container.style.transform = `translate(${containerX}%,${containerY}%)`;
        if (containerY >= -10) {
            demo_toparrow.style.display = 'none';
        }
        demo_bottom.style.display = '';
    }
    let gateToWaterSlide_point =document.createElement('img');//增加入口到滑水道事件
    gateToWaterSlide_point.src="images/gameplay/point.svg";
    gateToWaterSlide_point.className='gateToWaterSlide_point point';
    smallMap.appendChild(gateToWaterSlide_point);
};
function moveRight(e) {
    let removeChild =document.getElementsByClassName('point')[0];
    removeChild.remove();
    // console.log(containerX);
    if (containerX >= -50) {
        containerX -= 33.3333;
        demo_container.style.transform = `translate(${containerX}%,${containerY}%)`;
        if (containerX <= -50) {
            demo_rightarrow.style.display = 'none';
        }
        demo_leftarrow.style.display = '';
    }
    let gateTorollerCoaster_point =document.createElement('img');//增加入口到雲霄飛車事件
    gateTorollerCoaster_point.src="images/gameplay/point.svg";
    gateTorollerCoaster_point.className='gateTorollerCoaster_point point';
    smallMap.appendChild(gateTorollerCoaster_point);
};
function moveLeft(e) {
    let removeChild =document.getElementsByClassName('point')[0];
    removeChild.remove();
    if (containerX <= -10) {
        containerX += 33.3333;
        demo_container.style.transform = `translate(${containerX}%,${containerY}%)`;
        if (containerX >= -10) {
            demo_leftarrow.style.display = 'none';
        }
        demo_rightarrow.style.display = '';
    }
    let gateToPirateShip_point =document.createElement('img');//增加入口到海盜船事件
    gateToPirateShip_point.src="images/gameplay/point.svg";
    gateToPirateShip_point.className='gateToPirateShip_point point';
    smallMap.appendChild(gateToPirateShip_point);
};

function moveBottom(e) {
    let removeChild =document.getElementsByClassName('point')[0];
    removeChild.remove();
    if (containerY >= -50) {
        containerY -= 33.3333;
        demo_container.style.transform = `translate(${containerX}%,${containerY}%)`;
        if (containerY <= -50) {
            demo_bottom.style.display = 'none';
        }
        demo_toparrow.style.display = '';
    }
    let gateToFerrisWheel_point =document.createElement('img');//增加入口到摩天輪事件
    gateToFerrisWheel_point.src="images/gameplay/point.svg";
    gateToFerrisWheel_point.className='gateToFerrisWheel_point point';
    smallMap.appendChild(gateToFerrisWheel_point);
};