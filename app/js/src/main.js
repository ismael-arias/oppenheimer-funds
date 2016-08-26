// Begin Dependencies

var $ = require("jquery");
var _ = require("underscore");
require("slick-carousel");


// GSAP
var TweenMax = require("TweenMax");
var TimelineMax = require("TimelineMax");
// ScrollMagic
var ScrollMagic = require("ScrollMagic");
require("ScrollMagicAddIndicators"); // manually comment out this line for production builds
require("ScrollMagicGSAP");

// OTHERS
var JKSizeClassEventHandler = require("JKSizeClassEventHandler");
var SupportsContinuousScrollEvents = require("SupportsContinuousScrollEvents");

// Example of how to include your Libraries TestLib.js
var testlib = require("testlib");
console.log("From TestLib ->", testlib);

// End Dependencies
// Write Application Code Here (or in any other js/src/*.js file)

// Add Slick Carousels
// Library Source and Docs: http://kenwheeler.github.io/slick/
$('.pp-slideshow').not('.slick-initialized').slick();
$('.ff-slideshow').not('.slick-initialized').slick();
//

$('.facial-box').not('.slick-initialized').slick({
    // variableWidth: true,
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    responsive: [{
        breakpoint: 539,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: true
        }
    },
    {
        breakpoint: 853,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: false,
            dots: false
        }
    },
    {
        breakpoint: 1280,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: false,
            dots: false
        }
    }
  ]
});

function resizeWidthOnly(a,b) {
  var c = [window.innerWidth];
  return onresize = function() {
    var d = window.innerWidth,
        e = c.length;
    c.push(d);
    if(c[e]!==c[e-1]){
      clearTimeout(b);
      b = setTimeout(a, 250);
    }
  }, a;
}
/*fix slick slider snap back on resize*/
resizeWidthOnly(function() {
    var windowWidth = $(window).width();
    if (windowWidth >= 980) {
        $(".my-slider > .slick-list > .slick-track").css("transform", "translate3d(0px, 0px, 0px)");
    }
});

var element = $(".facial-box");

$(element).on('setPosition', function(event, slick, currentSlide, nextSlide) {
  var slidesShown = $(element).slick('slickGetOption', 'slidesToShow');
  var numberOfSlides = $(element).find('.slick-slide').length;

  if (slidesShown === numberOfSlides) {
    $(element).find('.slick-track').css('transform', 'translate3d(0px, 0px, 0px)');
  }
});


// Add Tracking to slideshow change events
$('.pp-slideshow').on('afterChange', function(event, slick, currentSlide) {
    var slideShowTitle = slick.$slider.attr("tracking");
    if (typeof slideShowTitle !== "undefined" && $(this).is(':visible')) {
        G.track(slideShowTitle, "Change to Slide " + (currentSlide + 1));
    }
});


//############################
// INIT SCROLLMAGIC CONTROLLER
//############################
// Library Source and Docs: http://scrollmagic.io/  ||  http://scrollmagic.io/docs/index.html
// You can reuse the this controller for you others ScrollMagic scenes
var smController = new ScrollMagic.Controller();
CSSPlugin.useSVGTransformAttr = false;

// Using ScrollMagic to track scroll depth, and trigger GA events on scroll entry into each section
function initScrollTracking() {
    var deviceMetrics = {};
    var sectionCount = 1;

    $('section.content').each(function(index) {
        var tracking = $(this).attr("tracking");
        var elementID = "#" + $(this).attr("id");

        if (typeof tracking !== "undefined" && $(this).is(':visible')) {
            deviceMetrics["" + sectionCount] = {
                "section": tracking,
                "trigger": elementID
            };
            sectionCount++;
        }
    });
    trackScroll(deviceMetrics, getCombinedFurnitureHeight(), smController);
}

function trackScroll(metrics, scrollOffset, controller) {
    $.each(metrics, function(k, v) {
        (function(key, obj) {
            new ScrollMagic.Scene({
                    triggerElement: obj.trigger,
                    offset: -scrollOffset
                })
                .on("enter", function(e) {
                    G.track("Scrolled", key + " " + obj.section);
                    e.target.destroy();
                })
                // .addIndicators({"name": obj.section})
                .addTo(controller);
        })(k, v);
    });
}
initScrollTracking();


// USE JKSizeClassEventHandler
// Docs: https://github.com/nytpi/JKSizeClassEventHandler
window.scEventHandler = new JKSizeClassEventHandler();
window.scEventHandler.on("sizeClassChange", function() {
    if (this.sizeClass() === "mobile-portrait" || this.sizeClass() === "tablet-portrait") {
        // Initialize something for mobile portrait and tablet portrait only
        console.log("In mobile-portrait or tablet-portrait ");
    }
    if (this.sizeClass() === "tablet-landscape" || this.sizeClass() === "desktop") {
        // Destroy, de-initialize, or otherwise "restore" that mobile and tablet-only
        // thing to the way it should be for tablet landscape and desktop.
        console.log("In tablet-landscape or desktop");
    }
});


//############################
// Theorem Code
//############################
var tl = new TimelineLite();

// Controller
var controller = new ScrollMagic.Controller();


// Set current width
var currentWidth = window.innerWidth || document.documentElement.clientWidth;

var bottomOff = null;
// for small phone: like iphone 5 etc...
if (currentWidth <= 324) {
    bottomOff = 140;
} else if (currentWidth >= 325) {
    bottomOff = 203;
}


// set somes animations for contents
TweenMax.set($('.text-container1, .text-container2, .text11'), {opacity: 0, transform:'translate3d(0,50px,0)'});
TweenMax.set($('.text3, .text5'), {opacity: 0, transform:'translate3d(-50px,0px,0)'});
TweenMax.set($('.text4, .text13'), {opacity: 0, transform:'translate3d(50px,0px,0)'});
TweenMax.set($('#touchIcon'), {opacity: 0, transform:'translate3d(-50px,0px,0)'});
TweenMax.set($('.text6, .text7'), {opacity: 0, transform:'translate3d(0px,0px,0)'});
TweenMax.set($('.text8, .text9, .text12'), {opacity: 0, transform:'translate3d(0px,50px,0)'});
TweenMax.set($('.text10'), {opacity: 0, transform:'translate3d(0px,-50px,0)'});

TweenMax.set($('#man_explorer_move'), {y:70});

// parallax effect for the titles
TweenMax.set($('.touch_parallax, .facial_parallax, .iris_parallax, .heart_parallax'), {transform:'translate3d(0px,-80px,0)'});

var text1Ani = new TimelineLite();
  text1Ani.to($('.text-container1'), 0.9, {opacity: 1, transform:'translate3d(0,0,0)'});

  var scene_text1 = new ScrollMagic.Scene({
        triggerElement: ".text-container1",
        triggerHook: 'onEnter', offset: bottomOff
    })
    .setTween(text1Ani)
    .addTo(controller);
// text 2
var text2Ani = new TimelineLite();
  text2Ani.to($('.text-container2'), 0.9, {opacity: 1, transform:'translate3d(0,0,0)'});

  var scene_text2 = new ScrollMagic.Scene({
        triggerElement: ".text-container2",
        triggerHook: 'onEnter', offset: bottomOff
    })
    .setTween(text2Ani)
    .addTo(controller);
// text 3
var text3Ani = new TimelineLite();
  text3Ani.to($('.text3'), 0.9, {opacity: 1, transform:'translate3d(0,0,0)'});

  var scene_text3 = new ScrollMagic.Scene({
          triggerElement: ".text3",
          triggerHook: 'onEnter', offset: bottomOff
      })
      .setTween(text3Ani)
      .addTo(controller);
// text 4
var text4Ani = new TimelineLite();
  text3Ani.to($('.text4'), 0.9, {opacity: 1, transform:'translate3d(0,0,0)'});

  var scene_text4 = new ScrollMagic.Scene({
          triggerElement: ".text4",
          triggerHook: 'onEnter', offset: bottomOff
      })
      .setTween(text4Ani)
      .addTo(controller);
// touch ID fade animation "not svg animation"
var touchAniFade = new TimelineLite();
    touchAniFade.to($('#touchIcon'), 0.9, {opacity: 1, transform:'translate3d(0,0,0)'});

    var scene_touchFade = new ScrollMagic.Scene({
          triggerElement: "#touchIcon",
          triggerHook: 'onEnter', offset: bottomOff
      })
      .setTween(touchAniFade)
      .addTo(controller);

// text 5
var text5Ani = new TimelineLite();
  text5Ani.to($('.text5'), 0.9, {opacity: 1, transform:'translate3d(0,0,0)'});

  var scene_text5 = new ScrollMagic.Scene({
          triggerElement: ".text5",
          triggerHook: 'onEnter', offset: bottomOff
      })
      .setTween(text5Ani)
      .addTo(controller);

// text 6
var text6Ani = new TimelineLite();
  text6Ani.to($('.text6'), 0.9, {opacity: 1, transform:'translate3d(0,0,0)'});

  var scene_text6 = new ScrollMagic.Scene({
          triggerElement: ".text6",
          triggerHook: 'onEnter', offset: bottomOff
      })
      .setTween(text6Ani)
      .addTo(controller);

// text 7
var text7Ani = new TimelineLite();
  text7Ani.to($('.text7'), 0.9, {opacity: 1, transform:'translate3d(0,0,0)'});

  var scene_text7 = new ScrollMagic.Scene({
          triggerElement: ".text7",
          triggerHook: 'onEnter', offset: bottomOff
      })
      .setTween(text7Ani)
      .addTo(controller);

// text 8
var text8Ani = new TimelineLite();
  text8Ani.to($('.text8'), 0.9, {opacity: 1, transform:'translate3d(0,0,0)'});

  var scene_text8 = new ScrollMagic.Scene({
          triggerElement: ".text8",
          triggerHook: 'onEnter', offset: bottomOff
      })
      .setTween(text8Ani)
      .addTo(controller);

// text 9
var text9Ani = new TimelineLite();
  text9Ani.to($('.text9'), 0.9, {opacity: 1, transform:'translate3d(0,0,0)'});

  var scene_text9 = new ScrollMagic.Scene({
          triggerElement: ".text9",
          triggerHook: 'onEnter', offset: bottomOff
      })
      .setTween(text9Ani)
      .addTo(controller);

// text 10
var text10Ani = new TimelineLite();
  text10Ani.to($('.text10'), 0.9, {opacity: 1, transform:'translate3d(0,0,0)'});

  var scene_text10 = new ScrollMagic.Scene({
          triggerElement: ".text10",
          triggerHook: 'onEnter', offset: bottomOff
      })
      .setTween(text10Ani)
      .addTo(controller);

// text 11
var text11Ani = new TimelineLite();
  text11Ani.to($('.text11'), 0.9, {opacity: 1, transform:'translate3d(0,0,0)'});

  var scene_text11 = new ScrollMagic.Scene({
          triggerElement: ".text11",
          triggerHook: 'onEnter', offset: bottomOff
      })
      .setTween(text11Ani)
      .addTo(controller);

// text 12
var text12Ani = new TimelineLite();
  text12Ani.to($('.text12'), 0.9, {opacity: 1, transform:'translate3d(0,0,0)'});

  var scene_text12 = new ScrollMagic.Scene({
          triggerElement: ".text12",
          triggerHook: 'onEnter', offset: bottomOff
      })
      .setTween(text12Ani)
      .addTo(controller);

// text 13
var text13Ani = new TimelineLite();
  text13Ani.to($('.text13'), 0.9, {opacity: 1, transform:'translate3d(0,0,0)'});

  var scene_text13 = new ScrollMagic.Scene({
          triggerElement: ".text13",
          triggerHook: 'onEnter', offset: bottomOff
      })
      .setTween(text13Ani)
      .addTo(controller);


// Parallax for tittles
// touch parallax
var touch_paralaxAni = new TimelineLite();
  touch_paralaxAni.to($('.touch_parallax'), 0.5, {transform:'translate3d(0,50px,0)'});

  var scene_touch_parallax = new ScrollMagic.Scene({
          triggerElement: ".touch_parallax",
          triggerHook: 'onEnter', triggerOffset: 500, duration: 600
      })
      .setTween(touch_paralaxAni)
      .addTo(controller);

// facial parallax
var facial_paralaxAni = new TimelineLite();
  facial_paralaxAni.to($('.facial_parallax'), 0.5, {transform:'translate3d(0,50px,0)'});

  var scene_facial_parallax = new ScrollMagic.Scene({
          triggerElement: ".facial_parallax",
          triggerHook: 'onEnter', triggerOffset: 300, duration: 600
      })
      .setTween(facial_paralaxAni)
      .addTo(controller);

// iris parallax
var iris_paralaxAni = new TimelineLite();
  iris_paralaxAni.to($('.iris_parallax'), 0.5, {transform:'translate3d(0,50px,0)'});

  var scene_iris_parallax = new ScrollMagic.Scene({
          triggerElement: ".iris_parallax",
          triggerHook: 'onEnter', triggerOffset: 300, duration: 600
      })
      .setTween(iris_paralaxAni)
      .addTo(controller);

// iris parallax
var heart_paralaxAni = new TimelineLite();
  heart_paralaxAni.to($('.heart_parallax'), 0.5, {transform:'translate3d(0,50px,0)'});

  var scene_heart_parallax = new ScrollMagic.Scene({
          triggerElement: ".heart_parallax",
          triggerHook: 'onEnter', triggerOffset: 300, duration: 600
      })
      .setTween(heart_paralaxAni)
      .addTo(controller);

//Set start positions for some elements
TweenMax.set($('#line_1, #line_2, #line_3, #line_4, #line_5'), {
    opacity: 0,
    transform: 'translate3d(-70px,0,0)'
});


TweenMax.set($('#left_x5F_hand, #right_x5F_hand'), {
    transform: 'translate3d(0px,20px,0)'
});
TweenMax.set($('#Scanner_x5F_line'), {
    transform: 'translate3d(-116px,0,0)'
});

TweenMax.set($('#curve_bottom_f2'), {
    y: -1
});

// Mouse over Faces

var face1 = new TimelineLite();

$("#face1_wrapper").mouseenter(function() {
    face1.to($('#Horizontal_f1'), 0.3, {
            opacity: 1
        })
        .to($('#Vertical_f1'), 0.3, {
            opacity: 1
        }, '-=0.18');
});
$("#face1_wrapper").mouseleave(function() {
    face1.to($('#Horizontal_f1'), 0.3, {
            opacity: 0
        })
        .to($('#Vertical_f1'), 0.3, {
            opacity: 0
        }, '-=0.18');
});

var face2 = new TimelineLite();

$("#face2_wrapper").mouseenter(function() {
    face2.to($('#eyebrow_left_f2, #eyebrow_right_f2, #center_dot_f2'), 0.3, {
            y: -4,
            ease: Back.easeOut
        })
        .to($('#curve_lines_f2, #Smile_x5F_Face'), 0.3, {
            opacity: 1
        }, '-=0.18')
        .to($('#Straight_x5F_Lines'), 0.3, {
            opacity: 0
        }, '-=0.3');
});
$("#face2_wrapper").mouseleave(function() {
    face2.to($('#eyebrow_left_f2, #eyebrow_right_f2, #center_dot_f2'), 0.3, {
            y: 0,
            ease: Back.easeOut
        })
        .to($('#curve_lines_f2, #Smile_x5F_Face'), 0.3, {
            opacity: 0
        }, '-=0.18')
        .to($('#Straight_x5F_Lines'), 0.3, {
            opacity: 1
        }, '-=0.3');
});

var face3 = new TimelineLite();

$("#face3_wrapper").mouseenter(function() {
    face3.to($('#Scanner_f3'), 0.5, {
            y: 50,
            opacity: 0
        })
        .to($('.face_f3'), 0.3, {
            opacity: 0
        }, '-=0.35')
        .to($('#Black_x5F_dots'), 0.3, {
            opacity: 1
        }, '-=0.2')
        .to($('#Blue_x5F_Dots'), 0.3, {
            opacity: 1
        }, '-=0.15')
        .to($('#Blue_x5F_Dots'), 0.15, {
            opacity: 1
        })
        .to($('#Blue_x5F_Dots'), 0.15, {
            opacity: 0
        })
        .to($('#Blue_x5F_Dots'), 0.15, {
            opacity: 1
        })
        .to($('#Blue_x5F_Dots'), 0.15, {
            opacity: 0
        })
        .to($('#Blue_x5F_Dots'), 0.15, {
            opacity: 1
        })
        .to($('#Blue_x5F_Dots'), 0.15, {
            opacity: 0
        })
        .to($('#Blue_x5F_Dots'), 0.15, {
            opacity: 1
        });
});
$("#face3_wrapper").mouseleave(function() {
    face3.to($('#Scanner_f3'), 0.5, {
            y: 0,
            opacity: 1
        })
        .to($('#Blue_x5F_Dots'), 0.3, {
            opacity: 0
        }, '-=0.2')
        .to($('#Black_x5F_dots'), 0.3, {
            opacity: 0
        }, '-=0.15')
        .to($('.face_f3'), 0.3, {
            opacity: 1
        }, '-=0.33');
});

var face4 = new TimelineLite();

$("#face4_wrapper").mouseenter(function() {
    face4.to($('#open_f4'), 0.5, {
        opacity: 0
    });
});
$("#face4_wrapper").mouseleave(function() {
    face4.to($('#open_f4'), 0.5, {
        opacity: 1
    });
});


// Start with Scroll Magic




// Eye Animations
var eyeAnimation = new TimelineLite();

//Scanner_eye
TweenMax.set($('#Scanner_eye'), {transform: 'translate(-280px,0)'});

    var eyeDistance = 450;

    eyeAnimation.to('#toBeMasked', 1.1, {x:eyeDistance, ease: Power0.easeNone});
    eyeAnimation.to('#Eye2', 1.1, {x:-eyeDistance, ease: Power0.easeNone}, '-=1.1');
    eyeAnimation.to('#Scanner_eye', 1.08, {x:292, ease: Power0.easeNone}, '-=1.07');

// eyeAnimation.to('#Eye_x5F_1', 1.1, {
//     WebkitClipPath: "inset(0% 0% 0% 99%)",
//     ease: Power0.easeNone
// });
// eyeAnimation.to('#Scanner_x5F_line', 1.04, {
//     transform: "translate3d(124px,0,0)",
//     ease: Power0.easeNone
// }, '-=1.06');

//    var scene_eye = new ScrollMagic.Scene({
//        triggerElement: "#eyeMask", triggerHook: 'onEnter', offset: 340})
//        .setTween(eyeAnimation)
//        .addTo(controller);

// var scene_eye = new ScrollMagic.Scene({
//     triggerElement: "#eyeMask", triggerHook: 'onEnter', triggerOffset: 600, duration: 400})
//     .setTween(eyeAnimation)
//     .addTo(controller);
var scene_eye = new ScrollMagic.Scene({
        triggerElement: "#eyeMask",
        triggerOffset: 600,
        duration: 300
    })
    .setTween(eyeAnimation)
    .addTo(controller);

// Hunter Animations
var hunterAnimation = new TimelineLite();

var hunterSignals = ['#Signal_x5F_1_start', '#Signal_x5F_2', '#Signal_x5F_3'];

hunterAnimation.to($(hunterSignals[0]), 0.3, {
        opacity: 1
    })
    .to($(hunterSignals[1]), 0.3, {
        opacity: 1
    })
    .to($(hunterSignals[2]), 0.3, {
        opacity: 1
    })
    .to($('#Arm_x5F_2'), 0.3, {
        transform: "rotate(10deg) translate(9px, -5px)",
        ease: Power0.easeNone
    });
hunterAnimation.to($('#hand_hunter'), 0.3, {
    transform: "translate3d(11px,0,0)",
    ease: Power0.easeNone
}, '-=0.3');
hunterAnimation.to($('#arrow_hunter'), 0.3, {
    transform: "translate3d(11px,0,0)",
    ease: Power0.easeNone
}, '-=0.3');


var scene_hunter = new ScrollMagic.Scene({
        triggerElement: "#hunter",
        triggerHook: 'onEnter',
        offset: 80
    })
    .setTween(hunterAnimation)
    .addTo(controller);

// Explorer Man Animations
var explorerAnimation = new TimelineLite();

explorerAnimation.to($('#man_explorer_move'), 0.8, {
    //transform: "translate3d(0,0,0)",
    y:0,
    ease: Power2.easeOut
});


var scene_explorer = new ScrollMagic.Scene({
        triggerElement: "#explorer_man",
        triggerHook: 'onEnter',
        offset: bottomOff
    })
    .setTween(explorerAnimation)
    .addTo(controller);

// Ship Sonar Animations
var shipAnimation = new TimelineLite();

shipAnimation.to($('#Right_1, #Left_1'), 0.18, {
        strokeDashoffset: 0,
        ease: Power0.easeNone
    })
    .to($('#Right_2, #Left_2'), 0.18, {
        strokeDashoffset: 0,
        ease: Power0.easeNone
    })
    .to($('#Right_3, #Left_3'), 0.18, {
        strokeDashoffset: 0,
        ease: Power0.easeNone
    })
    .to($('#Right_4, #Left_4'), 0.18, {
        strokeDashoffset: 0,
        ease: Power0.easeNone
    });


var scene_explorer = new ScrollMagic.Scene({
        triggerElement: "#ship_sonar",
        triggerHook: 'onEnter',
        offset: bottomOff
    })
    .setTween(shipAnimation)
    .addTo(controller);

// Touch ID Animations
var touchIdAnimation = new TimelineLite();

touchIdAnimation.to($('#blue_x5F_lines'), 0.15, {
        opacity: 0
    })
    .to($('#blue_x5F_lines'), 0.15, {
        opacity: 1
    })
    .to($('#blue_x5F_lines'), 0.15, {
        opacity: 0
    })
    .to($('#blue_x5F_lines'), 0.15, {
        opacity: 1
    })
    .to($('#blue_x5F_lines'), 0.15, {
        opacity: 0
    })
    .to($('#blue_x5F_lines'), 0.15, {
        opacity: 1
    });

var scene_touchId = new ScrollMagic.Scene({
        triggerElement: "#touchIcon",
        triggerHook: 'onEnter',
        offset: bottomOff
    })
    .setTween(touchIdAnimation)
    .addTo(controller);

// Iris Animations
var irisAnimation = new TimelineLite();

irisAnimation.to($('#blue_corner'), 0.20, {
        opacity: 0
    })
    .to($('#blue_corner'), 0.20, {
        opacity: 1
    })
    .to($('#white_corner'), 0.20, {
        opacity: 0
    })
    .to($('#blue_corner'), 0.20, {
        opacity: 0
    })
    .to($('#white_corner'), 0.20, {
        opacity: 1
    })
    .to($('#blue_corner'), 0.20, {
        opacity: 1
    })
    .to($('#white_corner'), 0.20, {
        opacity: 0
    })
    .to($('#white_corner'), 0.20, {
        opacity: 1
    });

var scene_touchId = new ScrollMagic.Scene({
        triggerElement: "#irisIcon",
        triggerHook: 'onEnter',
        offset: bottomOff
    })
    .setTween(irisAnimation)
    .addTo(controller);

// Facial Animations
var facialAnimation = new TimelineLite();

facialAnimation.staggerTo($('#line_1,#line_2,#line_3,#line_4,#line_5'), 0.20, {
    opacity: 1,
    transform: 'translate3d(0,0,0)'
}, 0.20);

var scene_touchId = new ScrollMagic.Scene({
        triggerElement: "#facial_recognition",
        triggerHook: 'onEnter',
        offset: bottomOff
    })
    .setTween(facialAnimation)
    .addTo(controller);

// Touch Sensitivity
var touchSenAnimation = new TimelineLite();

touchSenAnimation.to($('#hand_elem_1'), 0.20, {
        scale:0.95, transformOrigin:"50% 50%",
        ease: Power0.easeNone
    })
    .to($('#hand_elem_1'), 0.40, {
        scale:1.05, transformOrigin:"50% 50%",
        ease: Power0.easeNone
    })
    .to($('#hand_elem_1'), 0.20, {
        scale:0.95, transformOrigin:"50% 50%",
        ease: Power0.easeNone
    })
    .to($('#hand_elem_1'), 0.30, {
        scale:1, transformOrigin:"50% 50%",
        ease: Power0.easeNone
    });
touchSenAnimation.to($('#hand_elem_2'), 0.40, {
    scale:1.1, transformOrigin:"50% 50%",
    ease: Power0.easeNone
}, '-=0.9');
touchSenAnimation.to($('#hand_elem_2'), 0.20, {
    scale:0.90, transformOrigin:"50% 50%",
    ease: Power0.easeNone
}, '-=0.4');
touchSenAnimation.to($('#hand_elem_2'), 0.10, {
    scale:1, transformOrigin:"50% 50%",
    ease: Power0.easeNone
}, '-=0.2');

var scene_touchId = new ScrollMagic.Scene({
        triggerElement: "#touch_sensitivity",
        triggerHook: 'onEnter',
        offset: bottomOff
    })
    .setTween(touchSenAnimation)
    .addTo(controller);

// Heart animation
var heartAnimation = new TimelineLite();

TweenMax.set($('#heart_elem_1, #heart_elem_2'), {
    transformOrign: '50% 50%'
});

heartAnimation.to($('#heart_elem_1'), 0.18, {
        scale:1.10,transformOrigin:"50% 50%",
        ease: Power0.easeNone
    })
    .to($('#heart_elem_1'), 0.18, {
        scale:0.95,transformOrigin:"50% 50%",
        ease: Power0.easeNone
    })
    .to($('#heart_elem_1'), 0.18, {
        scale:1.10,transformOrigin:"50% 50%",
        ease: Power0.easeNone
    })
    .to($('#heart_elem_1'), 0.18, {
        scale:1,transformOrigin:"50% 50%",
        ease: Power0.easeNone
    })
    .to($('#heart_elem_2'), 0.18, {
        scale:1.10,transformOrigin:"50% 50%",
        ease: Power0.easeNone
    })
    .to($('#heart_elem_2'), 0.18, {
        scale:0.95,transformOrigin:"50% 50%",
        ease: Power0.easeNone
    })
    .to($('#heart_elem_2'), 0.18, {
        scale:1.10,transformOrigin:"50% 50%",
        ease: Power0.easeNone
    })
    .to($('#heart_elem_2'), 0.18, {
        scale:1,transformOrigin:"50% 50%",
        ease: Power0.easeNone
    });

var scene_heart = new ScrollMagic.Scene({
        triggerElement: "#heart_container",
        triggerHook: 'onEnter',
        offset: bottomOff
    })
    .setTween(heartAnimation)
    //.setTween('#heart_elem_1', {'opacity': 0})
    .addTo(controller);

// hands animation
var handsAnimation = new TimelineLite();

handsAnimation.to($('#left_x5F_hand'), 0.35, {
    transform: 'translate3d(270px,0px,0)',
    ease: Power1.easeIn
});
handsAnimation.to($('#right_x5F_hand'), 0.35, {
    transform: 'translate3d(-270px,0px,0)',
    ease: Power1.easeIn
}, '-=0.3');
handsAnimation.to($('#shine_x5F_hand'), 0.3, {
    opacity: 1
});

var scene_heart = new ScrollMagic.Scene({
        triggerElement: "#hands_human",
        triggerHook: 'onEnter',
        offset: bottomOff
    })
    .setTween(handsAnimation)
    //.setTween('#heart_elem_1', {'opacity': 0})
    .addTo(controller);
