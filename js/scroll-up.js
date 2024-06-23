/*-------------------------------------------------------------
  scrollup jquery 
---------------------------------------------------------------*/

!(function (l, o, e) {
  "use strict";
  (l.fn.scrollUp = function (o) {
    l.data(e.body, "scrollUp") ||
      (l.data(e.body, "scrollUp", !0), l.fn.scrollUp.init(o));
  }),
    (l.fn.scrollUp.init = function (r) {
      var s,
        t,
        c,
        i,
        n,
        a,
        d,
        p = (l.fn.scrollUp.settings = l.extend({}, l.fn.scrollUp.defaults, r)),
        f = !1;
      // Use existing element with ID scrollUp
      d = l("#" + p.scrollName);
      // Set title and HTML content if provided
      p.scrollTitle && d.attr("title", p.scrollTitle);
      p.scrollImg || p.scrollTrigger || d.html(p.scrollText);

      d.css({ display: "none", position: "fixed", zIndex: p.zIndex });

      // Active overlay (optional)
      p.activeOverlay &&
        l("<div/>", { id: p.scrollName + "-active" })
          .css({
            position: "absolute",
            top: p.scrollDistance + "px",
            width: "100%",
            borderTop: "1px dotted" + p.activeOverlay,
            zIndex: p.zIndex,
          })
          .appendTo("body");

      // Animation type
      switch (p.animation) {
        case "fade":
          (s = "fadeIn"), (t = "fadeOut"), (c = p.animationSpeed);
          break;
        case "slide":
          (s = "slideDown"), (t = "slideUp"), (c = p.animationSpeed);
          break;
        default:
          (s = "show"), (t = "hide"), (c = 0);
      }

      i =
        "top" === p.scrollFrom
          ? p.scrollDistance
          : l(e).height() - l(o).height() - p.scrollDistance;

      n = l(o).scroll(function () {
        l(o).scrollTop() > i
          ? f || (d[s](c), (f = !0))
          : f && (d[t](c), (f = !1));
      });

      p.scrollTarget
        ? "number" == typeof p.scrollTarget
          ? (a = p.scrollTarget)
          : "string" == typeof p.scrollTarget &&
            (a = Math.floor(l(p.scrollTarget).offset().top))
        : (a = 0);

      d.click(function (o) {
        o.preventDefault();
        l("html, body").animate(
          { scrollTop: a },
          p.scrollSpeed,
          p.easingType
        );
      });
    }),
    (l.fn.scrollUp.defaults = {
      scrollName: "scrollUp", // Use the existing ID
      scrollDistance: 300,
      scrollFrom: "top",
      scrollSpeed: 300,
      easingType: "linear",
      animation: "fade",
      animationSpeed: 200,
      scrollTrigger: !1,
      scrollTarget: !1,
      scrollText: "Scroll to top",
      scrollTitle: !1,
      scrollImg: !1,
      activeOverlay: !1,
      zIndex: 2147483647,
    }),
    (l.fn.scrollUp.destroy = function (r) {
      l.removeData(e.body, "scrollUp"),
        l("#" + l.fn.scrollUp.settings.scrollName).remove(),
        l("#" + l.fn.scrollUp.settings.scrollName + "-active").remove(),
        l.fn.jquery.split(".")[1] >= 7
          ? l(o).off("scroll", r)
          : l(o).unbind("scroll", r);
    }),
    (l.scrollUp = l.fn.scrollUp);
})(jQuery, window, document);

$(document).ready(function () {
  $.scrollUp({
    scrollName: "scrollUp", // Element ID
    scrollDistance: 300, // Distance from top/bottom before showing element (px)
    scrollFrom: "top", // 'top' or 'bottom'
    // scrollSpeed: 4000, // Speed back to top (ms)
    easingType: "linear", // Scroll to top easing (see http://easings.net/)
    animation: "fade", // Fade, slide, none
    animationSpeed: 200, // Animation in speed (ms)
    scrollText: "UP", // Text for element, can contain HTML
    scrollTitle: "Back to top", // Set a custom <a> title if required.
    scrollImg: false, // Set true to use image
    activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
    zIndex: 999 // Z-Index for the overlay
  });
});