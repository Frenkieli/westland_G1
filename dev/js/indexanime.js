(function () {

    // console.log('動畫製作中');

    var controller = new ScrollMagic.Controller();
    //動畫
    // var animation = TweenMax.fromTo('#section_facility', 1, {
    //     x: 600,
    //     opacity: 0
    // }, {
    //         x: 0,
    //         opacity: 1
    //     });

    var animation = new TimelineMax();

    animation.add(TweenMax.fromTo('#section_facility', 0.5, {
        x: 600,
        opacity: 0
    }, {
        x: 0,
        opacity: 1
    }));
    animation.add(TweenMax.fromTo('#facility_rule', 0.5, {
        x: 600,
        opacity: 0
    }, {
        x: 0,
        opacity: 1
    }));


    var scene = new ScrollMagic.Scene({
        triggerElement: '#trigger_01',
        // reverse :false,
        // duration :'30%',
        // offset :' 100px',
        triggerHook: 0.7,
    }).setTween(animation).addTo(controller)

    // var animation2 = TweenMax.fromTo('#index_team', 1, {
    //     y: 600,
    //     opacity: 0
    // }, {
    //         y: 0,
    //         opacity: 1
    //     });

    var animation2 = new TimelineMax();

    animation2.add(TweenMax.fromTo('#index_team', 0.5, {
        y: 600,
        opacity: 0
    }, {
        y: 0,
        opacity: 1
    }));
    animation2.add(TweenMax.fromTo('.team_list_box1', 0.25, {
        scale: 0,
        opacity: 0
    }, {
        scale: 1,
        opacity: 1
    }));
    animation2.add(TweenMax.fromTo('.team_list_box2', 0.25, {
        scale: 0,
        opacity: 0
    }, {
        scale: 1,
        opacity: 1
    }));
    animation2.add(TweenMax.fromTo('.team_list_box3', 0.25, {
        scale: 0,
        opacity: 0
    }, {
        scale: 1,
        opacity: 1
    }));
    animation2.add(TweenMax.fromTo('.team_list_box4', 0.25, {
        scale: 0,
        opacity: 0
    }, {
        scale: 1,
        opacity: 1
    }));



    var scene2 = new ScrollMagic.Scene({
        triggerElement: '#trigger_02',
        // reverse :false,
        // duration :'30%',
        // offset :' 100px',
        triggerHook: 0.7,
    }).setTween(animation2).addTo(controller)

    // var animation3 = TweenMax.fromTo('#index_ticket_customize', 1, {
    //     x: 600,
    //     opacity: 0
    // }, {
    //         x: 0,
    //         opacity: 1
    //     });

    var animation3 = new TimelineMax();

    animation3.add(TweenMax.fromTo('#index_ticket_customize', 0.33, {
        x: 600,
        opacity: 0
    }, {
        x: 0,
        opacity: 1
    }));
    animation3.add(TweenMax.fromTo('#customize_mascots_boxs', 0.33, {
        x: 600,
        opacity: 0
    }, {
        x: 0,
        opacity: 1
    }));
    animation3.add(TweenMax.fromTo('#customize_items', 0.33, {
        x: 600,
        opacity: 0
    }, {
        x: 0,
        opacity: 1
    }));
    // 
    // animation3.add(TweenMax.fromTo('#customize_mascots1', 0.1, {
    //     scale: 0,
    //     opacity: 0
    // }, {
    //         scale: 1,
    //         opacity: 1
    //     }));
    // animation3.add(TweenMax.fromTo('#customize_mascots4', 0.1, {
    //     scale: 0,
    //     opacity: 0
    // }, {
    //         scale: 1,
    //         opacity: 1
    //     }));
    // animation3.add(TweenMax.fromTo('#customize_mascots3', 0.1, {
    //     scale: 0,
    //     opacity: 0
    // }, {
    //         scale: 1,
    //         opacity: 1
    //     }));
    // animation3.add(TweenMax.fromTo('#customize_mascots6', 0.1, {
    //     scale: 0,
    //     opacity: 0
    // }, {
    //         scale: 1,
    //         opacity: 1
    //     }));
    // animation3.add(TweenMax.fromTo('#customize_mascots2', 0.1, {
    //     scale: 0,
    //     opacity: 0
    // }, {
    //         scale: 1,
    //         opacity: 1
    //     }));
    // animation3.add(TweenMax.fromTo('#customize_mascots5', 0.1, {
    //     scale: 0,
    //     opacity: 0
    // }, {
    //         scale: 1,
    //         opacity: 1
    //     }));
    // animation3.add(TweenMax.fromTo('#customize_item6', 0.1, {
    //     scale: 0,
    //     opacity: 0
    // }, {
    //         scale: 1,
    //         opacity: 1
    //     }));
    // animation3.add(TweenMax.fromTo('#customize_item4', 0.1, {
    //     scale: 0,
    //     opacity: 0
    // }, {
    //         scale: 1,
    //         opacity: 1
    //     }));
    // animation3.add(TweenMax.fromTo('#customize_item2', 0.1, {
    //     scale: 0,
    //     opacity: 0
    // }, {
    //         scale: 1,
    //         opacity: 1
    //     }));
    // animation3.add(TweenMax.fromTo('#customize_item5', 0.1, {
    //     scale: 0,
    //     opacity: 0
    // }, {
    //         scale: 1,
    //         opacity: 1
    //     }));
    // animation3.add(TweenMax.fromTo('#customize_item3', 0.1, {
    //     scale: 0,
    //     opacity: 0
    // }, {
    //         scale: 1,
    //         opacity: 1
    //     }));
    // animation3.add(TweenMax.fromTo('#customize_item1', 0.1, {
    //     scale: 0,
    //     opacity: 0
    // }, {
    //         scale: 1,
    //         opacity: 1
    //     }));

    // 內部零件
    var scene3 = new ScrollMagic.Scene({
        triggerElement: '#trigger_03',
        // reverse :false,
        // duration: '60%',
        // offset :' 100px',
        triggerHook: 0.7,
    }).setTween(animation3).addTo(controller)

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
    }).setTween(animation4).addTo(controller)
})();



window.addEventListener('load', function () {
    let winnerPeoples = document.querySelectorAll('.Podium_winner img:first-child');
    document.querySelector('.Podium_welcome').classList.add('Podium_welcome-anime');
    for (let i = 0; i < winnerPeoples.length; i++) {
        winnerPeoples[i].className = 'winner4th';
        // console.log('開始');
    }
    setTimeout(() => {
        for (let i = 0; i < winnerPeoples.length; i++) {
            winnerPeoples[i].className = 'winnermove';
            // console.log('開始');
        }

    }, 1200);
}, false);
