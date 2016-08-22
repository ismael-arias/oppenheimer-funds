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
$('.pp-slideshow').slick();
// Add Tracking to slideshow change events
$('.pp-slideshow').on('afterChange', function(event, slick, currentSlide){
	var slideShowTitle = slick.$slider.attr("tracking");
	if(typeof slideShowTitle !== "undefined" && $(this).is(':visible')){
		G.track(slideShowTitle, "Change to Slide "+(currentSlide + 1));
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

	$('section.content').each(function(index){		
		var tracking = $(this).attr("tracking");
		var elementID = "#" + $(this).attr("id");

		if(typeof tracking !== "undefined" && $(this).is(':visible')){
			deviceMetrics[""+sectionCount] = { "section" : tracking, "trigger" : elementID };
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