
!(function ($, window, document) {
  "use strict";

  // Main function to initialize scrollUp
  $.fn.scrollUp = function (options) {
    if (!$.data(document.body, "scrollUp")) {
      $.data(document.body, "scrollUp", true);
      $.fn.scrollUp.init(options);
    }
  };

  // Initialize the plugin
  $.fn.scrollUp.init = function (settings) {
    const config = $.fn.scrollUp.settings = $.extend({}, $.fn.scrollUp.defaults, settings);
    const $scrollElem = $("#" + config.scrollName);
    let isVisible = false;
    let scrollTarget = determineScrollTarget(config);

    setupScrollElem($scrollElem, config);
    setupActiveOverlay(config);
    handleScroll($scrollElem, config, isVisible);
    handleClick($scrollElem, config, scrollTarget);
  };

  // Setup the scroll element
  function setupScrollElem($scrollElem, config) {
    if (config.scrollTitle) {
      $scrollElem.attr("title", config.scrollTitle);
    }
    if (!config.scrollImg && !config.scrollTrigger) {
      $scrollElem.html(config.scrollText);
    }
    $scrollElem.css({ display: "none", position: "fixed", zIndex: config.zIndex });
  }

  // Setup the active overlay
  function setupActiveOverlay(config) {
    if (config.activeOverlay) {
      $("<div/>", { id: config.scrollName + "-active" })
        .css({
          position: "absolute",
          top: config.scrollDistance + "px",
          width: "100%",
          borderTop: "1px dotted" + config.activeOverlay,
          zIndex: config.zIndex,
        })
        .appendTo("body");
    }
  }

  // Handle the scroll event
  function handleScroll($scrollElem, config, isVisible) {
    const showMethod = getAnimationMethod(config.animation, "show");
    const hideMethod = getAnimationMethod(config.animation, "hide");
    const animationSpeed = config.animationSpeed;

    $(window).scroll(function () {
      const scrollPos = $(window).scrollTop();
      const threshold = config.scrollFrom === "top" ? config.scrollDistance : $(document).height() - $(window).height() - config.scrollDistance;

      if (scrollPos > threshold) {
        if (!isVisible) {
          $scrollElem[showMethod](animationSpeed);
          isVisible = true;
        }
      } else if (isVisible) {
        $scrollElem[hideMethod](animationSpeed);
        isVisible = false;
      }
    });
  }

  // Handle the click event
  function handleClick($scrollElem, config, scrollTarget) {
    $scrollElem.click(function (event) {
      event.preventDefault();
      $("html, body").animate({ scrollTop: scrollTarget }, config.scrollSpeed, config.easingType);
    });
  }

  // Determine the scroll target position
  function determineScrollTarget(config) {
    if (typeof config.scrollTarget === "number") {
      return config.scrollTarget;
    }
    if (typeof config.scrollTarget === "string") {
      return Math.floor($(config.scrollTarget).offset().top);
    }
    return 0;
  }

  // Get the appropriate animation method
  function getAnimationMethod(animation, action) {
    switch (animation) {
      case "fade":
        return action === "show" ? "fadeIn" : "fadeOut";
      case "slide":
        return action === "show" ? "slideDown" : "slideUp";
      default:
        return action;
    }
  }

  // Default settings
  $.fn.scrollUp.defaults = {
    scrollName: "scrollUp",
    scrollDistance: 300,
    scrollFrom: "top",
    scrollSpeed: 300,
    easingType: "linear",
    animation: "fade",
    animationSpeed: 200,
    scrollTrigger: false,
    scrollTarget: false,
    scrollText: "Scroll to top",
    scrollTitle: false,
    scrollImg: false,
    activeOverlay: false,
    zIndex: 2147483647,
  };

  // Destroy the plugin
  $.fn.scrollUp.destroy = function (event) {
    $.removeData(document.body, "scrollUp");
    $("#" + $.fn.scrollUp.settings.scrollName).remove();
    $("#" + $.fn.scrollUp.settings.scrollName + "-active").remove();
    if ($.fn.jquery.split(".")[1] >= 7) {
      $(window).off("scroll", event);
    } else {
      $(window).unbind("scroll", event);
    }
  };

  // Assign scrollUp to global jQuery object
  $.scrollUp = $.fn.scrollUp;
})(jQuery, window, document);

// Initialize the scrollUp plugin when the document is ready
$(document).ready(function () {
  $.scrollUp({
    scrollName: "scrollUp",
    scrollDistance: 300,
    scrollFrom: "top",
    scrollSpeed: 300,
    easingType: "linear",
    animation: "fade",
    animationSpeed: 200,
    scrollText: "UP",
    scrollTitle: "Back to top",
    scrollImg: false,
    activeOverlay: false,
    zIndex: 999,
  });
});
