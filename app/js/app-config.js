require.config({
    paths: {
        TweenLite: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenLite.min',
        TimelineLite: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TimelineLite.min',
        TweenMax: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min',
        TimelineMax: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TimelineMax.min',
        EasePack: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/easing/EasePack.min',
        BezierPlugin: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/plugins/BezierPlugin.min',
        ScrollMagic: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min',
        ScrollMagicAddIndicators: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/debug.addIndicators.min',
        ScrollMagicGSAP: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.min',
        'Snap.svg': 'https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.4.1/snap.svg-min',
        'slick-carousel': 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.8/slick.min',
        JKSizeClassEventHandler: PaidPost.assets + 'bower_components/JKSizeClassEventHandler/js/JKSizeClassEventHandler.min',
        SupportsContinuousScrollEvents: PaidPost.assets + 'bower_components/SupportsContinuousScrollEvents/js/SupportsContinuousScrollEvents.min',

        'testlib' : PaidPost.assets + 'js/lib/TestLib'
    },
    packages: [

    ],
    shim: {

    }
});

//############################################
// Convenience Mobile and Tablet check methods
//############################################

// IS MOBILE LAYOUT?
function isMobile(){
    return (window.matchMedia("(max-width: 767px)").matches) ? true : false;
}
//IS TABLET LAYOUT?
function isTablet(orientation){
    if(orientation === null || typeof orientation === 'undefined'){
        return (window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1024px)").matches) ? true : false;
    }else if(orientation === "portrait"){
        return (window.matchMedia("(min-width: 768px)").matches && !window.matchMedia("(min-width: 1024px)").matches) ? true : false;
    }else if(orientation === "landscape"){
        return (window.matchMedia("(min-width: 1024px)").matches && !window.matchMedia("(min-width: 1080px)").matches) ? true : false;
    }
}
// Get the height of the top Furniture. usefull for offsets
function getCombinedFurnitureHeight(offset) {
    offset = offset || 0;
    var mastHeadDetail = document.querySelector("#masthead").getBoundingClientRect();
    var topBarContainerDetail = document.querySelector("#paid-top-bar-container").getBoundingClientRect();
    return mastHeadDetail.height + topBarContainerDetail.height + offset;
}


//############################################
// Initialize Google Analytics type tracking
//############################################
var G = G || {};
G.projectDetails = 'OppenheimerFunds - From Man to Machine - ',
G.currDevice = isMobile() ? 'Mobile' : isTablet() ? 'Tablet' : 'Desktop';
G.track = function(action, opt_label, opt_value, opt_noninteraction) {
    if(typeof window.ga !== "undefined") {
        console.log('ga.track :: send, track,', G.projectDetails + G.currDevice, action, opt_label);
        window.ga('send','event', G.projectDetails + G.currDevice, action, opt_label, opt_value);
    }
};
window.G = G;
