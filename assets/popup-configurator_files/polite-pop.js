/*!*******************************************************
 * Copyright (C) 2022 David Miranda <david@storylog.com>
 * 
 * Polite Pop cannot be copied and/or distributed without
 * purchasing a license first.
 *
 * To purchase a license, go to https://politepop.com/
 *
 * v1.2.4-beta
 *******************************************************!*/
 (() => {
  // src/html/modal.js
  function html({ modalHtml, modalSubscribeButtonText }) {
    return `<div class="polite-pop polite-pop__modal" id="polite-modal" aria-hidden="true">
  <div class="polite-pop__modal-overlay" tabindex="-1" data-micromodal-close>
    <div class="polite-pop__modal-container" role="dialog" aria-modal="true">
      <div class="polite-pop__modal-hedgie">
        <img src="https://cdn.politepop.com/v1.2.4-beta/images/hedgie/hug.png">
      </div>
      <div class="polite-pop__modal-content">
        <button class="polite-pop__modal-close" aria-label="Close modal" data-micromodal-close></button>
        <div class="polite-pop__modal-text">
          ${modalHtml}
        </div>
        <form class="polite-pop__modal-form">
          <div class="polite-pop__modal-inputs">
            <div class="polite-pop__modal-input-container polite-pop__modal-input-container--name">
              <input id="polite-pop--first-name" class="polite-pop__modal-input" type="text" placeholder="First name" spellcheck="false" required>
              <label for="polite-pop--first-name" class="polite-pop__modal-input-label">First name</label>
            </div>
            <div class="polite-pop__modal-input-container polite-pop__modal-input-container--email">
              <input id="polite-pop--email" class="polite-pop__modal-input" type="email" placeholder="Email" required>
              <label for="polite-pop--email" class="polite-pop__modal-input-label">Email</label>
            </div>
          </div>
          <div class="polite-pop__modal-button-container">
            <button class="polite-pop__modal-button">${modalSubscribeButtonText}</button>
          </div>
        </form>
      </div>
      <div class="polite-pop__modal-empty-space"></div>
    </div>
  </div>
</div>`;
  }

  // src/html/exit-intent-pop.js
  function html2({ exitIntentPopHtml, exitIntentPopYesText, exitIntentPopNoText }) {
    return `<div class="polite-pop polite-pop__pop polite-pop__pop--exit-intent polite-pop__pop--right">
  <div class="polite-pop__pop-hedgie-row">
    <img
      class="polite-pop__pop-hedgie polite-pop__pop-hedgie--plz-wait"
      src="https://cdn.politepop.com/v1.2.4-beta/images/hedgie/plz-wait-left-handed.png"
    />
    <img
      class="polite-pop__pop-hedgie polite-pop__pop-hedgie--got-bored"
      src="https://cdn.politepop.com/v1.2.4-beta/images/hedgie/got-bored-left-handed.png"
    />
  </div>
  <div class="polite-pop__pop-bubble">
    <div class="polite-pop__pop-bubble-text">${exitIntentPopHtml}</div>
    <div class="polite-pop__pop-bubble-buttons">
      <button
        class="polite-pop__pop-bubble-button polite-pop__pop-bubble-button--sure"
      >${exitIntentPopYesText}</button>
      <button
        class="polite-pop__pop-bubble-button polite-pop__pop-bubble-button--nope"
      >${exitIntentPopNoText}</button>
    </div>
  </div>
</div>`;
  }

  // src/html/main-pop.js
  function html3({ politePopHtml, politePopYesText, politePopNoText }) {
    return `<div class="polite-pop polite-pop__pop polite-pop__pop--main">
  <div class="polite-pop__pop-hedgie-row">
    <img
      class="polite-pop__pop-hedgie polite-pop__pop-hedgie--i-be-rolling"
      src="https://cdn.politepop.com/v1.2.4-beta/images/hedgie/i-be-rolling.png"
    />
    <img
      class="polite-pop__pop-hedgie polite-pop__pop-hedgie--hey-whats-that"
      src="https://cdn.politepop.com/v1.2.4-beta/images/hedgie/hey-whats-that.png"
    />
    <img
      class="polite-pop__pop-hedgie polite-pop__pop-hedgie--hi-there-waving-up"
      src="https://cdn.politepop.com/v1.2.4-beta/images/hedgie/hi-there-waving-up.png"
    />
    <img
      class="polite-pop__pop-hedgie polite-pop__pop-hedgie--hi-there-waving-down"
      src="https://cdn.politepop.com/v1.2.4-beta/images/hedgie/hi-there-waving-down.png"
    />
  </div>
  <div class="polite-pop__pop-bubble">
    <div class="polite-pop__pop-bubble-text">${politePopHtml}</div>
    <div class="polite-pop__pop-bubble-buttons">
      <button
        class="polite-pop__pop-bubble-button polite-pop__pop-bubble-button--sure"
      >${politePopYesText}</button>
      <button
        class="polite-pop__pop-bubble-button polite-pop__pop-bubble-button--nope"
      >${politePopNoText}</button>
    </div>
  </div>
</div>`;
  }

  // src/global-variables.js
  var globalVariables = {
    scrollRequirementMet: false,
    timingRequirementMet: false,
    exitIntentScrollRequirementMet: false,
    exitIntentTimingRequirementMet: false,
    wasMainPopPopped: false,
    wasExitIntentPopPopped: false,
    scrollDistanceInPixelsRequirementMet: false
  };
  var global_variables_default = globalVariables;

  // src/utils/dom-ready.js
  function domReady(callback) {
    if (document.readyState !== "loading") {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", callback);
    }
  }

  // src/utils/is-below-min-screen-width.js
  function isBelowMinScreenWidth({ minScreenWidthInPixelsRequired }) {
    return !window.matchMedia(`(min-width: ${minScreenWidthInPixelsRequired}px)`).matches;
  }

  // node_modules/crostini/dist/crostini.module.js
  var n = false;
  function i(i3, o3) {
    if (!n) {
      n = true;
      var r2 = '<div class="crostini crostini--show"><div class="crostini__desc"><div class="crostini__desc-inner">' + i3 + '</div></div><div class="crostini__close-icon"></div></div>', e2 = document.createElement("div");
      e2.innerHTML = r2;
      var s2 = e2.firstChild;
      if (o3 && (o3.type === "error" && s2.classList.add("crostini--error"), o3.slideInFromTop && s2.classList.add("crostini--top"), o3.backgroundColor && (s2.style.backgroundColor = o3.backgroundColor), o3.textColor && (s2.style.color = o3.textColor), o3.customCss)) {
        var c = s2.getAttribute("style") || "";
        s2.setAttribute("style", c + o3.customCss);
      }
      s2.addEventListener("animationend", t), document.body.appendChild(s2);
    }
  }
  function o() {
    var i3 = document.querySelector(".crostini");
    i3 && (i3.parentElement.removeChild(i3), i3.removeEventListener("animationend", t)), n = false;
  }
  function t(n3) {
    n3.animationName !== "crostiniFadeout" && n3.animationName !== "crostiniFadeoutBottom" || o();
  }
  document.querySelector(".crostini-styles") || document.body.insertAdjacentHTML("beforeend", `
<style class="crostini-styles">
.crostini, .crostini * {
  box-sizing: border-box;
}

.crostini {
  position: fixed;
  z-index: 1;
  left: 0;
  right:0;
  bottom: 30px;
  visibility: hidden;
  display: flex;
  height: 50px;
  margin: auto;
  max-width: 50px;
  background-color: #222;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
  line-height: 1;
}

.crostini--top {
  top: 30px;
  bottom: auto;
}

.crostini.crostini--show.crostini--top {
  visibility: visible;
  animation: crostiniFadeinTop 0.5s, crostiniExpand 0.5s 0.5s, crostiniStay 5s 1s, crostiniShrink 0.5s 6s, crostiniFadeoutBottom 0.5s 6.5s;
}

.crostini .crostini__close-icon {
  position: relative;
  width: 50px;
  height: 100%;
  margin-left: auto;
  cursor: pointer;
  border-left: 1px solid rgba(255,255,255,.18);
  animation: crostiniSimpleFadein 1s, crostiniSimpleFadeout 1.5s 5.5s;
}

.crostini .crostini__close-icon:hover {
  background-color: rgba(255,255,255,.15);
}

.crostini .crostini__close-icon:before {
  position: absolute;
  content: '';
  top: 50%;
  left: 50%;
  width: 26px;
  height: 2px;
  margin: -1px 0 0 -13px;
  transform: rotate(-45deg);
  background-color: rgba(255,255,255,.85);
}

.crostini .crostini__close-icon:after {
  position: absolute;
  content: '';
  top: 50%;
  left: 50%;
  width: 26px;
  height: 2px;
  margin: -1px 0 0 -13px;
  transform: rotate(45deg);
  background-color: rgba(255,255,255,.85);
}

.crostini .crostini__close-icon:hover:before, .crostini .crostini__close-icon:hover:after {
  background-color: #fff;
}

.crostini .crostini__desc {
  display: flex;
  align-items: center;
  max-width: calc(100% - 50px);
  overflow: hidden;
  white-space: nowrap;
  padding: 0px 16px;
  animation: crostiniSimpleFadein 1s;
}

.crostini .crostini__desc-inner {
  position: relative;
  top: -1px;
}

.crostini.crostini--show {
  visibility: visible;
  animation: crostiniFadein 0.5s, crostiniExpand 0.5s 0.5s, crostiniStay 5s 1s, crostiniShrink 0.5s 6s, crostiniFadeout 0.5s 6.5s;
}

/* ERROR STYLES */

.crostini.crostini--error {
  background-color: #c41f33;
}

.crostini.crostini--error .crostini__close-icon:hover:before, .crostini.crostini--error .crostini__close-icon:hover:after {
  opacity: 1;
}

@keyframes crostiniSimpleFadein {
  0% {opacity: 0;}
  90% {opacity: 0;}
  100% {opacity: 1;}
}

@keyframes crostiniSimpleFadeout {
  0% {opacity: 1;}
  70% {opacity: 0;}
  100% {opacity: 0;}
}

@keyframes crostiniFadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@keyframes crostiniFadeinTop {
  from {top: 0; opacity: 0;}
  to {top: 30px; opacity: 1;}
}

@keyframes crostiniExpand {
  from {min-width: 50px}
  to {min-width: 360px}
}

@keyframes crostiniStay {
  from {min-width: 360px}
  to {min-width: 360px}
}

@keyframes crostiniShrink {
  from {min-width: 360px;} 
  to {min-width: 50px;}
}

@keyframes crostiniFadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 60px; opacity: 0;}
}

@keyframes crostiniFadeoutBottom {
  from {top: 30px; opacity: 1;}
  to {top: 60px; opacity: 0;}
}
</style>
`), document.body.addEventListener("click", function(n3) {
    n3.target.closest(".crostini__close-icon") && o();
  });

  // src/utils/toast-notification.js
  function toastNotification(msg, options) {
    let defaultOptions2 = {
      slideInFromTop: true,
      backgroundColor: "#4f46e5",
      textColor: "#fff",
      customCss: "border: 3px solid #fff; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif;"
    };
    i(msg, Object.assign(defaultOptions2, options));
  }

  // src/utils/reset.js
  function reset() {
    localStorage.removeItem("POLITE_POP_LAST_SEEN_DATE");
    window.location.reload();
  }

  // src/utils/show-hide.js
  function showMainPop({ onPopped }) {
    let mainPopElem = document.querySelector(".polite-pop__pop--main");
    global_variables_default.wasMainPopPopped = true;
    mainPopElem.classList.add("animate");
    onPopped();
    localStorage.setItem("POLITE_POP_LAST_SEEN_DATE", Date.now());
  }
  function hideMainPop() {
    let mainPopElem = document.querySelector(".polite-pop__pop--main");
    mainPopElem.classList.remove("animate");
  }
  function showExitIntentPop({ onPopped }) {
    let exitIntentPopElem = document.querySelector(".polite-pop__pop--exit-intent.polite-pop__pop--right");
    global_variables_default.wasExitIntentPopPopped = true;
    exitIntentPopElem.classList.add("animate");
    onPopped();
    localStorage.setItem("POLITE_POP_LAST_SEEN_DATE", Date.now());
  }
  function hideExitIntentPop() {
    let exitIntentPopElem = document.querySelector(".polite-pop__pop--exit-intent.polite-pop__pop--right");
    exitIntentPopElem.classList.remove("animate");
  }

  // src/utils/update-loop.js
  var timingPercentageProgress = 0;
  function updateTimingProgress({
    totalActiveSecondsOnPage = 0,
    politePopTimeInSecondsRequired,
    exitIntentPopTimeInSecondsRequired,
    onTimingProgress,
    onExitIntentRequirementsMet,
    onPopped
  }) {
    timingPercentageProgress = Math.min(1, totalActiveSecondsOnPage / politePopTimeInSecondsRequired) * 100;
    let secondsProgress = Math.round(Math.max(0, politePopTimeInSecondsRequired - totalActiveSecondsOnPage));
    onTimingProgress({ percentageNum: timingPercentageProgress, text: secondsProgress });
    if (timingPercentageProgress === 100) {
      global_variables_default.timingRequirementMet = true;
    }
    if (totalActiveSecondsOnPage >= exitIntentPopTimeInSecondsRequired) {
      global_variables_default.exitIntentTimingRequirementMet = true;
    }
    popMainPopIfRequirementsMet({ onPopped, onExitIntentRequirementsMet });
  }
  function updateScrollPercentage({
    scrollPercentageRelativeToRequirement = 0,
    currentScrollPercentageRounded = 0,
    politePopScrollPercentageRequired,
    exitIntentPopScrollPercentageRequired,
    minScrollDistanceInPixelsRequired,
    onScrollProgress,
    onExitIntentRequirementsMet,
    onScrollDistanceInPixelsRequirementMet,
    onPopped
  }) {
    onScrollProgress({ percentageNum: scrollPercentageRelativeToRequirement, text: currentScrollPercentageRounded });
    let isScrollDistanceInPixelsRequirementMet = window.scrollY >= minScrollDistanceInPixelsRequired;
    if (isScrollDistanceInPixelsRequirementMet && !global_variables_default.scrollDistanceInPixelsRequirementMet) {
      global_variables_default.scrollDistanceInPixelsRequirementMet = true;
      onScrollDistanceInPixelsRequirementMet();
    }
    let isMainScrollRequirementMet = currentScrollPercentageRounded >= politePopScrollPercentageRequired;
    if (isMainScrollRequirementMet && global_variables_default.scrollDistanceInPixelsRequirementMet) {
      global_variables_default.scrollRequirementMet = true;
    } else if (!global_variables_default.timingRequirementMet) {
      global_variables_default.scrollRequirementMet = false;
    }
    let isExitIntentScrollRequirementMet = currentScrollPercentageRounded >= exitIntentPopScrollPercentageRequired;
    if (isExitIntentScrollRequirementMet && global_variables_default.scrollDistanceInPixelsRequirementMet) {
      global_variables_default.exitIntentScrollRequirementMet = true;
    } else if (!global_variables_default.exitIntentTimingRequirementMet) {
      global_variables_default.exitIntentScrollRequirementMet = false;
    }
    popMainPopIfRequirementsMet({ onPopped, onExitIntentRequirementsMet });
  }
  function popMainPopIfRequirementsMet({ onPopped, onExitIntentRequirementsMet }) {
    if (global_variables_default.wasMainPopPopped || global_variables_default.wasExitIntentPopPopped) {
      return;
    }
    if (global_variables_default.scrollRequirementMet && global_variables_default.timingRequirementMet) {
      showMainPop({ onPopped });
    } else if (global_variables_default.exitIntentTimingRequirementMet && global_variables_default.exitIntentScrollRequirementMet) {
      onExitIntentRequirementsMet();
    }
  }

  // src/utils/throttle.js
  function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options)
      options = {};
    var later = function() {
      previous = options.leading === false ? 0 : Date.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout)
        context = args = null;
    };
    return function() {
      var now = Date.now();
      if (!previous && options.leading === false)
        previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout)
          context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }

  // src/core/watch-timing.js
  function init({
    politePopTimeInSecondsRequired,
    exitIntentPopTimeInSecondsRequired,
    onTimingProgress,
    onExitIntentRequirementsMet,
    onPopped
  }) {
    let isPageActive = true;
    let lastPageActiveTime = new Date().getTime();
    let totalActiveSecondsOnPage = 0;
    let updateTimingIntervalTimer = setInterval(function() {
      if (isPageActive) {
        if (lastPageActiveTime) {
          let secondsSincePageLastActive = (new Date().getTime() - lastPageActiveTime) / 1e3;
          totalActiveSecondsOnPage += secondsSincePageLastActive;
          updateTimingProgress({
            totalActiveSecondsOnPage,
            politePopTimeInSecondsRequired,
            exitIntentPopTimeInSecondsRequired,
            onTimingProgress,
            onExitIntentRequirementsMet,
            onPopped
          });
        }
        lastPageActiveTime = new Date().getTime();
      } else {
        lastPageActiveTime = null;
      }
      if (global_variables_default.timingRequirementMet) {
        clearInterval(updateTimingIntervalTimer);
      }
    }, 200);
    function initVisibilityChangeListener() {
      let hiddenProp, visibilityChangeEventName;
      if (typeof document.hidden !== "undefined") {
        hiddenProp = "hidden";
        visibilityChangeEventName = "visibilitychange";
      } else if (typeof document.msHidden !== "undefined") {
        hiddenProp = "msHidden";
        visibilityChangeEventName = "msvisibilitychange";
      } else if (typeof document.webkitHidden !== "undefined") {
        hiddenProp = "webkitHidden";
        visibilityChangeEventName = "webkitvisibilitychange";
      }
      document.addEventListener(visibilityChangeEventName, function(event) {
        if (document[hiddenProp]) {
          isPageActive = false;
        } else {
          isPageActive = true;
        }
      });
    }
    initVisibilityChangeListener();
    window.addEventListener("focus", function() {
      isPageActive = true;
    });
    window.addEventListener("blur", function() {
      isPageActive = false;
    });
    function userEvent(eventName) {
      isPageActive = true;
    }
    let userEventThrottled = throttle(userEvent, 1e3, { trailing: false });
    document.addEventListener("pointermove", userEventThrottled());
    document.addEventListener("pointerdown", userEventThrottled());
    document.addEventListener("pointerup", userEventThrottled());
    document.addEventListener("keydown", userEventThrottled());
    document.addEventListener("keyup", userEventThrottled());
    window.addEventListener("scroll", userEventThrottled());
  }

  // node_modules/micromodal/dist/micromodal.es.js
  function e(e2, t3) {
    for (var o3 = 0; o3 < t3.length; o3++) {
      var n3 = t3[o3];
      n3.enumerable = n3.enumerable || false, n3.configurable = true, "value" in n3 && (n3.writable = true), Object.defineProperty(e2, n3.key, n3);
    }
  }
  function t2(e2) {
    return function(e3) {
      if (Array.isArray(e3))
        return o2(e3);
    }(e2) || function(e3) {
      if (typeof Symbol != "undefined" && Symbol.iterator in Object(e3))
        return Array.from(e3);
    }(e2) || function(e3, t3) {
      if (!e3)
        return;
      if (typeof e3 == "string")
        return o2(e3, t3);
      var n3 = Object.prototype.toString.call(e3).slice(8, -1);
      n3 === "Object" && e3.constructor && (n3 = e3.constructor.name);
      if (n3 === "Map" || n3 === "Set")
        return Array.from(e3);
      if (n3 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3))
        return o2(e3, t3);
    }(e2) || function() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function o2(e2, t3) {
    (t3 == null || t3 > e2.length) && (t3 = e2.length);
    for (var o3 = 0, n3 = new Array(t3); o3 < t3; o3++)
      n3[o3] = e2[o3];
    return n3;
  }
  var n2;
  var i2;
  var a;
  var r;
  var s;
  var l = (n2 = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'], i2 = function() {
    function o3(e2) {
      var n3 = e2.targetModal, i4 = e2.triggers, a3 = i4 === void 0 ? [] : i4, r3 = e2.onShow, s2 = r3 === void 0 ? function() {
      } : r3, l2 = e2.onClose, c = l2 === void 0 ? function() {
      } : l2, d = e2.openTrigger, u = d === void 0 ? "data-micromodal-trigger" : d, f = e2.closeTrigger, h = f === void 0 ? "data-micromodal-close" : f, v = e2.openClass, g = v === void 0 ? "is-open" : v, m = e2.disableScroll, b = m !== void 0 && m, y = e2.disableFocus, p = y !== void 0 && y, w = e2.awaitCloseAnimation, E = w !== void 0 && w, k = e2.awaitOpenAnimation, M = k !== void 0 && k, A = e2.debugMode, C = A !== void 0 && A;
      !function(e3, t3) {
        if (!(e3 instanceof t3))
          throw new TypeError("Cannot call a class as a function");
      }(this, o3), this.modal = document.getElementById(n3), this.config = { debugMode: C, disableScroll: b, openTrigger: u, closeTrigger: h, openClass: g, onShow: s2, onClose: c, awaitCloseAnimation: E, awaitOpenAnimation: M, disableFocus: p }, a3.length > 0 && this.registerTriggers.apply(this, t2(a3)), this.onClick = this.onClick.bind(this), this.onKeydown = this.onKeydown.bind(this);
    }
    var i3, a2, r2;
    return i3 = o3, (a2 = [{ key: "registerTriggers", value: function() {
      for (var e2 = this, t3 = arguments.length, o4 = new Array(t3), n3 = 0; n3 < t3; n3++)
        o4[n3] = arguments[n3];
      o4.filter(Boolean).forEach(function(t4) {
        t4.addEventListener("click", function(t5) {
          return e2.showModal(t5);
        });
      });
    } }, { key: "showModal", value: function() {
      var e2 = this, t3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
      if (this.activeElement = document.activeElement, this.modal.setAttribute("aria-hidden", "false"), this.modal.classList.add(this.config.openClass), this.scrollBehaviour("disable"), this.addEventListeners(), this.config.awaitOpenAnimation) {
        var o4 = function t4() {
          e2.modal.removeEventListener("animationend", t4, false), e2.setFocusToFirstNode();
        };
        this.modal.addEventListener("animationend", o4, false);
      } else
        this.setFocusToFirstNode();
      this.config.onShow(this.modal, this.activeElement, t3);
    } }, { key: "closeModal", value: function() {
      var e2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, t3 = this.modal;
      if (this.modal.setAttribute("aria-hidden", "true"), this.removeEventListeners(), this.scrollBehaviour("enable"), this.activeElement && this.activeElement.focus && this.activeElement.focus(), this.config.onClose(this.modal, this.activeElement, e2), this.config.awaitCloseAnimation) {
        var o4 = this.config.openClass;
        this.modal.addEventListener("animationend", function e3() {
          t3.classList.remove(o4), t3.removeEventListener("animationend", e3, false);
        }, false);
      } else
        t3.classList.remove(this.config.openClass);
    } }, { key: "closeModalById", value: function(e2) {
      this.modal = document.getElementById(e2), this.modal && this.closeModal();
    } }, { key: "scrollBehaviour", value: function(e2) {
      if (this.config.disableScroll) {
        var t3 = document.querySelector("body");
        switch (e2) {
          case "enable":
            Object.assign(t3.style, { overflow: "" });
            break;
          case "disable":
            Object.assign(t3.style, { overflow: "hidden" });
        }
      }
    } }, { key: "addEventListeners", value: function() {
      this.modal.addEventListener("touchstart", this.onClick), this.modal.addEventListener("click", this.onClick), document.addEventListener("keydown", this.onKeydown);
    } }, { key: "removeEventListeners", value: function() {
      this.modal.removeEventListener("touchstart", this.onClick), this.modal.removeEventListener("click", this.onClick), document.removeEventListener("keydown", this.onKeydown);
    } }, { key: "onClick", value: function(e2) {
      (e2.target.hasAttribute(this.config.closeTrigger) || e2.target.parentNode.hasAttribute(this.config.closeTrigger)) && (e2.preventDefault(), e2.stopPropagation(), this.closeModal(e2));
    } }, { key: "onKeydown", value: function(e2) {
      e2.keyCode === 27 && this.closeModal(e2), e2.keyCode === 9 && this.retainFocus(e2);
    } }, { key: "getFocusableNodes", value: function() {
      var e2 = this.modal.querySelectorAll(n2);
      return Array.apply(void 0, t2(e2));
    } }, { key: "setFocusToFirstNode", value: function() {
      var e2 = this;
      if (!this.config.disableFocus) {
        var t3 = this.getFocusableNodes();
        if (t3.length !== 0) {
          var o4 = t3.filter(function(t4) {
            return !t4.hasAttribute(e2.config.closeTrigger);
          });
          o4.length > 0 && o4[0].focus(), o4.length === 0 && t3[0].focus();
        }
      }
    } }, { key: "retainFocus", value: function(e2) {
      var t3 = this.getFocusableNodes();
      if (t3.length !== 0)
        if (t3 = t3.filter(function(e3) {
          return e3.offsetParent !== null;
        }), this.modal.contains(document.activeElement)) {
          var o4 = t3.indexOf(document.activeElement);
          e2.shiftKey && o4 === 0 && (t3[t3.length - 1].focus(), e2.preventDefault()), !e2.shiftKey && t3.length > 0 && o4 === t3.length - 1 && (t3[0].focus(), e2.preventDefault());
        } else
          t3[0].focus();
    } }]) && e(i3.prototype, a2), r2 && e(i3, r2), o3;
  }(), a = null, r = function(e2) {
    if (!document.getElementById(e2))
      return console.warn("MicroModal: \u2757Seems like you have missed %c'".concat(e2, "'"), "background-color: #f8f9fa;color: #50596c;font-weight: bold;", "ID somewhere in your code. Refer example below to resolve it."), console.warn("%cExample:", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", '<div class="modal" id="'.concat(e2, '"></div>')), false;
  }, s = function(e2, t3) {
    if (function(e3) {
      e3.length <= 0 && (console.warn("MicroModal: \u2757Please specify at least one %c'micromodal-trigger'", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", "data attribute."), console.warn("%cExample:", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", '<a href="#" data-micromodal-trigger="my-modal"></a>'));
    }(e2), !t3)
      return true;
    for (var o3 in t3)
      r(o3);
    return true;
  }, { init: function(e2) {
    var o3 = Object.assign({}, { openTrigger: "data-micromodal-trigger" }, e2), n3 = t2(document.querySelectorAll("[".concat(o3.openTrigger, "]"))), r2 = function(e3, t3) {
      var o4 = [];
      return e3.forEach(function(e4) {
        var n4 = e4.attributes[t3].value;
        o4[n4] === void 0 && (o4[n4] = []), o4[n4].push(e4);
      }), o4;
    }(n3, o3.openTrigger);
    if (o3.debugMode !== true || s(n3, r2) !== false)
      for (var l2 in r2) {
        var c = r2[l2];
        o3.targetModal = l2, o3.triggers = t2(c), a = new i2(o3);
      }
  }, show: function(e2, t3) {
    var o3 = t3 || {};
    o3.targetModal = e2, o3.debugMode === true && r(e2) === false || (a && a.removeEventListeners(), (a = new i2(o3)).showModal());
  }, close: function(e2) {
    e2 ? a.closeModalById(e2) : a.closeModal();
  } });
  typeof window != "undefined" && (window.MicroModal = l);
  var micromodal_es_default = l;

  // src/utils/exit-intent.js
  function exit_intent_default(exitIntentCallback) {
    function onMouseOut(event) {
      let mouseNearTopOfPage = event.clientY < 20;
      let mouseDidntEnterAnotherElement = event.relatedTarget === null;
      let mouseEventIsNotInsideAnInputElement = event.target.nodeName.toLowerCase() !== "select" && event.target.nodeName.toLowerCase() !== "input";
      if (mouseNearTopOfPage && mouseDidntEnterAnotherElement && mouseEventIsNotInsideAnInputElement) {
        if (exitIntentCallback) {
          exitIntentCallback();
        }
      }
    }
    document.addEventListener("mouseout", onMouseOut);
  }

  // src/core/watch-pop-events.js
  function init2({ onPopped }) {
    let modalOptions = {
      disableScroll: true,
      onShow: (modal) => {
        let modalContainer = modal.querySelector(".polite-pop__modal-container");
        let hedgieElems = modal.querySelectorAll(".polite-pop__modal-hedgie");
        if (modalContainer.scrollHeight > modalContainer.clientHeight) {
          [].forEach.call(hedgieElems, (hedgie) => hedgie.style.display = "none");
        } else {
          [].forEach.call(hedgieElems, (hedgie) => hedgie.style.display = "block");
        }
      }
    };
    [].forEach.call(document.querySelectorAll(".polite-pop__pop-bubble-button--sure"), function(sureButtonElem) {
      sureButtonElem.addEventListener("click", function(event) {
        micromodal_es_default.show("polite-modal", modalOptions);
        hideMainPop();
        hideExitIntentPop();
      });
    });
    [].forEach.call(document.querySelectorAll(".polite-pop__pop-bubble-button--nope"), function(nopeButtonElem) {
      nopeButtonElem.addEventListener("click", function(event) {
        hideMainPop();
        hideExitIntentPop();
      });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        hideMainPop();
        hideExitIntentPop();
      }
    });
    window.addEventListener("storage", (e2) => {
      if (e2.key === "POLITE_POP_LAST_SEEN_DATE" && window.PolitePop) {
        global_variables_default.wasMainPopPopped = true;
        global_variables_default.wasExitIntentPopPopped = true;
      }
    });
    exit_intent_default(() => {
      if (global_variables_default.wasMainPopPopped || global_variables_default.wasExitIntentPopPopped) {
        return;
      }
      if (global_variables_default.exitIntentTimingRequirementMet && global_variables_default.exitIntentScrollRequirementMet && global_variables_default.scrollDistanceInPixelsRequirementMet) {
        showExitIntentPop({ onPopped });
      }
    });
  }

  // src/core/watch-scroll.js
  function init3({
    politePopScrollPercentageRequired,
    exitIntentPopScrollPercentageRequired,
    minScrollDistanceInPixelsRequired,
    onScrollProgress,
    onExitIntentRequirementsMet,
    onScrollDistanceInPixelsRequirementMet,
    onPopped
  }) {
    function getCurrentScrollPercentage() {
      let scrollTop = window.scrollY;
      let docHeight = document.body.offsetHeight;
      let winHeight = window.innerHeight;
      let pageBelowViewport = docHeight - scrollTop - winHeight;
      let scrollPercent = scrollTop / (scrollTop + pageBelowViewport);
      let scrollPercentRounded = Math.round(scrollPercent * 100);
      if (isNaN(scrollPercentRounded)) {
        return 100;
      } else {
        return scrollPercentRounded;
      }
    }
    let getCurrentScrollPercentageThrottled = throttle(function() {
      let scrollPercentageRelativeToRequirement = Math.min(100, Math.round(getCurrentScrollPercentage() / politePopScrollPercentageRequired * 100));
      let currentScrollPercentageRounded = Math.round(getCurrentScrollPercentage());
      updateScrollPercentage({
        politePopScrollPercentageRequired,
        exitIntentPopScrollPercentageRequired,
        minScrollDistanceInPixelsRequired,
        scrollPercentageRelativeToRequirement,
        currentScrollPercentageRounded,
        onScrollProgress,
        onExitIntentRequirementsMet,
        onScrollDistanceInPixelsRequirementMet,
        onPopped
      });
      if (global_variables_default.scrollRequirementMet && global_variables_default.timingRequirementMet) {
        window.removeEventListener("scroll", getCurrentScrollPercentageThrottled);
      }
    }, 50);
    window.addEventListener("scroll", getCurrentScrollPercentageThrottled);
    getCurrentScrollPercentageThrottled();
  }

  // src/utils/email-platform.js
  var emailPlatforms = [
    {
      urlIncludes: ".convertkit.com/forms",
      subscribeFunction: addSubscriberToConvertKit
    },
    {
      urlIncludes: ".list-manage.com/subscribe",
      subscribeFunction: addSubscriberToMailChimp
    }
  ];
  function sendToEmailPlatform({
    signupFormAction,
    onNewEmailSignup,
    newEmailSignupSuccessMessage,
    newEmailSignupErrorMessage,
    firstName,
    email
  }) {
    let subscribeFunction = getSubscribeFunction(signupFormAction);
    if (subscribeFunction) {
      subscribeFunction({
        firstName,
        email,
        signupFormAction,
        onSuccess: () => {
          toastNotification(newEmailSignupSuccessMessage);
          onNewEmailSignup({
            firstName,
            email,
            wasSuccessful: true
          });
        },
        onError: () => {
          toastNotification(newEmailSignupErrorMessage, { backgroundColor: "#c41f33" });
          onNewEmailSignup({
            firstName,
            email,
            wasSuccessful: false
          });
        }
      });
    }
  }
  function getSubscribeFunction(signupFormAction) {
    for (let i3 = 0; i3 < emailPlatforms.length; i3++) {
      let emailPlatform = emailPlatforms[i3];
      if (signupFormAction.includes(emailPlatform.urlIncludes)) {
        return emailPlatform.subscribeFunction;
      }
    }
  }
  function addSubscriberToConvertKit({ firstName, email, signupFormAction, onSuccess, onError }) {
    fetch(signupFormAction, {
      method: "POST",
      body: JSON.stringify({
        "first_name": firstName,
        "email_address": email
      }),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }).then((res2) => res2.json()).then((res2) => {
      if (res2.status === "success") {
        onSuccess(res2);
      } else {
        onError(res2);
      }
    }).catch((err) => {
      onError(res);
    });
  }
  function addSubscriberToMailChimp({ firstName, email, signupFormAction, onSuccess, onError }) {
    let url = (signupFormAction || "").replace("/post?", "/post-json?");
    url += `&EMAIL=${encodeURIComponent(email)}&FNAME=${encodeURIComponent(firstName)}`;
    let script = document.createElement("script");
    script.src = url + "&c=politePopMailchimpCallback";
    document.body.appendChild(script);
    let callback = "politePopMailchimpCallback";
    window[callback] = function(res2) {
      delete window[callback];
      document.body.removeChild(script);
      if (res2.result === "success") {
        onSuccess(res2);
      } else {
        onError(res2);
      }
    };
  }

  // src/core/watch-submit-modal-form.js
  function init4({
    signupFormAction,
    onNewEmailSignup,
    newEmailSignupSuccessMessage,
    newEmailSignupErrorMessage
  }) {
    document.querySelector(".polite-pop__modal-form").addEventListener("submit", function(event) {
      event.preventDefault();
      micromodal_es_default.close("polite-modal");
      let formElem = event.currentTarget;
      let firstName = formElem.querySelector("#polite-pop--first-name").value;
      let email = formElem.querySelector("#polite-pop--email").value;
      if (typeof signupFormAction === "string" && signupFormAction.length > 4) {
        sendToEmailPlatform({
          signupFormAction,
          onNewEmailSignup,
          newEmailSignupSuccessMessage,
          newEmailSignupErrorMessage,
          firstName,
          email
        });
      } else {
        toastNotification(newEmailSignupSuccessMessage);
        onNewEmailSignup({ firstName, email, wasSuccessful: false });
      }
    });
  }

  // src/polite-pop.js
  var politePopOptions = {};
  var defaultOptions = {
    debug: false,
    loadFullStatsDisplay: false,
    fullStatsDisplayOptions: {},
    fullStatsAssetsUseLocalUrls: false,
    character: "hedgehog",
    politePopEnabled: true,
    politePopHtml: "<p>Hey, I've been cooking up something cool. Want to get a peek?</p>",
    politePopYesText: "Yeah sure!",
    politePopNoText: "No thanks",
    politePopPosition: "left",
    politePopScrollPercentageRequired: 50,
    politePopTimeInSecondsRequired: 10,
    exitIntentPopEnabled: true,
    exitIntentPopHtml: "<p>Want to hear about the next awesome thing I\u2019m working on?</p>",
    exitIntentPopYesText: "Yeah sure!",
    exitIntentPopNoText: "No thanks",
    exitIntentPopPosition: "right",
    exitIntentPopScrollPercentageRequired: 0,
    exitIntentPopTimeInSecondsRequired: 10,
    modalHtml: "<p>Go beyond social newsfeeds and explore the wild, undiscovered web.</p><p>Join my weekly newsletter where you\u2019ll see:</p><ul><li>Evolving ideas in techno-spirituality</li><li>Life-affirming art that will help you grow</li><li>New ways of communicating on the web</li></ul><p>My mission is to make the web more fun<em>!</em> \u{1F92A}</p>",
    modalSubscribeButtonText: "Subscribe",
    signupFormAction: "",
    newEmailSignupSuccessMessage: "Success! You signed up! \u{1F389}",
    newEmailSignupErrorMessage: "Error. Signup failed.",
    daysToWaitBeforeDisplayingAgain: 3,
    minScreenWidthInPixelsRequired: 1e3,
    minScrollDistanceInPixelsRequired: 500,
    onNewEmailSignup: ({ wasSuccessful, email, firstName }) => {
      if (politePopOptions.debug) {
        console.log(`${firstName} signed up with email ${email}`);
      }
    },
    onPopSeenRecently: () => {
    },
    onBelowMinScreenWidth: () => {
    },
    onRendered: () => {
    },
    onTimingProgress: () => {
    },
    onScrollProgress: () => {
    },
    onExitIntentRequirementsMet: () => {
    },
    onScrollDistanceInPixelsRequirementMet: () => {
    },
    onPopped: () => {
    }
  };
  window.PolitePop = function(options = {}) {
    var isOldBrowser = !Array.from;
    if (isOldBrowser) {
      if (options.debug) {
        console.warn("Polite Pop not supported on older browsers");
      }
      return;
    }
    Object.assign(politePopOptions, defaultOptions, options);
    if (politePopOptions.loadFullStatsDisplay) {
      let link1 = document.createElement("link");
      link1.rel = "stylesheet";
      if (politePopOptions.fullStatsAssetsUseLocalUrls) {
        link1.href = "/common/common.css";
      } else {
        link1.href = "https://cdn.politepop.com/common/common.css?d=" + Date.now();
      }
      document.head.appendChild(link1);
      let link2 = document.createElement("link");
      link2.rel = "stylesheet";
      if (politePopOptions.fullStatsAssetsUseLocalUrls) {
        link2.href = "/demo/circular-progress.css";
      } else {
        link2.href = "https://cdn.politepop.com/demo/circular-progress.css?d=" + Date.now();
      }
      document.head.appendChild(link2);
      let fullStatsDisplayScript = document.createElement("script");
      if (politePopOptions.fullStatsAssetsUseLocalUrls) {
        fullStatsDisplayScript.setAttribute("src", "/demo/demo.js");
      } else {
        fullStatsDisplayScript.setAttribute("src", "https://cdn.politepop.com/demo/demo.js?d=" + Date.now());
      }
      document.body.appendChild(fullStatsDisplayScript);
      fullStatsDisplayScript.addEventListener("load", () => {
        Object.assign(politePopOptions, politePopOptions.fullStatsDisplayOptions);
        let fullStatsDisplayConfig = PolitePop.fullStatsDisplay.init(politePopOptions);
        Object.assign(politePopOptions, fullStatsDisplayConfig);
        finishPolitePopInit({ politePopOptions });
      });
    } else {
      finishPolitePopInit({ politePopOptions });
    }
  };
  function finishPolitePopInit({ politePopOptions: politePopOptions2 }) {
    let politePopLastSeenString = localStorage.getItem("POLITE_POP_LAST_SEEN_DATE");
    if (politePopLastSeenString) {
      let politePopLastSeenMs = parseInt(politePopLastSeenString);
      let dayMs = 864e5;
      let wasPolitePopSeenRecently = Date.now() - politePopLastSeenMs < dayMs * politePopOptions2.daysToWaitBeforeDisplayingAgain;
      if (wasPolitePopSeenRecently) {
        politePopOptions2.onPopSeenRecently();
        if (politePopOptions2.debug) {
          console.warn(`Polite Pop won't display for ${politePopOptions2.daysToWaitBeforeDisplayingAgain} more days

Run PolitePop.reset() to reset it.`);
        }
        return;
      }
    }
    if (isBelowMinScreenWidth(politePopOptions2)) {
      politePopOptions2.onBelowMinScreenWidth();
      if (politePopOptions2.debug) {
        console.warn("Polite Pop won't display because screen width is below " + politePopOptions2.minScreenWidthInPixelsRequired + "px");
      }
      return;
    }
    let politePopFullHtml = html(politePopOptions2) + html2(politePopOptions2) + html3(politePopOptions2);
    domReady(() => {
      document.body.insertAdjacentHTML("beforeend", politePopFullHtml);
      init(politePopOptions2);
      init2(politePopOptions2);
      init3(politePopOptions2);
      init4(politePopOptions2);
      politePopOptions2.onRendered();
    });
  }
  Object.assign(window.PolitePop, {
    toastNotification,
    options: politePopOptions,
    defaultOptions,
    reset,
    globalVariables: global_variables_default,
    skipTimingRequirements: () => {
      global_variables_default.timingRequirementMet = true;
      global_variables_default.exitIntentTimingRequirementMet = true;
    }
  });
})();
