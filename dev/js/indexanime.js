(function () {

    // console.log('動畫製作中');

    var controller = new ScrollMagic.Controller();


    //動畫
    var animation = TweenMax.fromTo('#section_facility', 1, {
        x: 600,
        opacity: 0
    }, {
            x: 0,
            opacity: 1
        });


    var scene = new ScrollMagic.Scene({
        triggerElement: '#trigger_01',
        // reverse :false,
        // duration :'30%',
        // offset :' 100px',
        triggerHook: 0.7,
    }).setTween(animation).addIndicators().addTo(controller)

    var animation2 = TweenMax.fromTo('#index_team', 1, {
        y: 600,
        opacity: 0
    }, {
            y: 0,
            opacity: 1
        });


    var scene2 = new ScrollMagic.Scene({
        triggerElement: '#trigger_02',
        // reverse :false,
        // duration :'30%',
        // offset :' 100px',
        triggerHook: 0.7,
    }).setTween(animation2).addIndicators().addTo(controller)

    var animation3 = TweenMax.fromTo('#index_ticket_customize', 1, {
        x: 600,
        opacity: 0
    }, {
            x: 0,
            opacity: 1
        });


    var scene3 = new ScrollMagic.Scene({
        triggerElement: '#trigger_03',
        // reverse :false,
        // duration :'30%',
        // offset :' 100px',
        triggerHook: 0.7,
    }).setTween(animation3).addIndicators().addTo(controller)

    var animation4 = TweenMax.fromTo('#section_store', 1, {
        rotationY: 90,
        opacity: 0
    }, {
            rotationY: 0,
            opacity: 1
        });


    var scene4 = new ScrollMagic.Scene({
        triggerElement: '#trigger_04',
        // reverse :false,
        // duration :'40%',
        // offset :' 100px',
        triggerHook: 0.7,
    }).setTween(animation4).addIndicators().addTo(controller)
})();