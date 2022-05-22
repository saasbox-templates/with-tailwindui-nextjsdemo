PolitePop.fullStatsDisplay = {};

PolitePop.fullStatsDisplay.initArrowKeyBypass = function () {
  // short-circuit timing requirements by pressing ⬅️➡️⬅️➡️
  let arrowKeysPressed = "";
  document.addEventListener('keydown', event => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      arrowKeysPressed += event.key;

      if (arrowKeysPressed.includes("ArrowLeftArrowRightArrowLeftArrowRight")) {
        PolitePop.skipTimingRequirements();
      }
    } else {
      arrowKeysPressed = "";
    }
  });
}

PolitePop.fullStatsDisplay.hidePopDescriptionNote = function () {
  document.querySelector(".circular-progress__pop-description-note").style.display = "none";
}

PolitePop.fullStatsDisplay.hidePopExitDescriptionNote = function () {
  document.querySelector(".circular-progress__pop-exit-description-note").style.display = "none";
}

PolitePop.fullStatsDisplay.showExitIntentNote = function () {
  document.querySelector(".circular-progress__exit-intent-note").style.display = "block";
}

PolitePop.fullStatsDisplay.hideExitIntentNote = function () {
  document.querySelector(".circular-progress__exit-intent-note").style.display = "none";
}

PolitePop.fullStatsDisplay.showPopPoppedNotes = function () {
  document.querySelector(".circular-progress__pop-popped-note").style.display = "block";
  document.querySelector(".circular-progress__pop-disabled-note").style.display = "block";
}

PolitePop.fullStatsDisplay.showNoMobileSupportNote = function () {
  document.querySelector(".circular-progress__no-mobile-support-note").style.display = "block";
}

PolitePop.fullStatsDisplay.showMinDistanceScrollNote = function () {
  document.querySelector(".circular-progress__pop-min-distance-scroll-note").style.display = "block";
}

PolitePop.fullStatsDisplay.hideMinDistanceScrollNote = function () {
  document.querySelector(".circular-progress__pop-min-distance-scroll-note").style.display = "none";
}

PolitePop.fullStatsDisplay.popPoppedNotes = function () {
  PolitePop.fullStatsDisplay.hideExitIntentNote();
  PolitePop.fullStatsDisplay.hidePopDescriptionNote();
  PolitePop.fullStatsDisplay.hideMinDistanceScrollNote();
  PolitePop.fullStatsDisplay.hidePopExitDescriptionNote();
  PolitePop.fullStatsDisplay.showPopPoppedNotes();
}

PolitePop.fullStatsDisplay.initCircularProgress = function (progressElem) {
  let progressElemSvg = progressElem.querySelector(".circular-progress__circle-svg");
  let progressBar = progressElem.querySelector(".circular-progress__progress-bar");
  let successElem = progressElem.querySelector(".circular-progress__success");
  let progressTextContainer = progressElem.querySelector(".circular-progress__text-container");
  let progressTextInner = progressElem.querySelector(".circular-progress__text-inner");

  let circumference = 251.3274;
  function setProgress ({percentageNum = 0, text} = {}) {
    text = typeof text === "undefined" ? percentageNum : text;
    let percentageCircumferenceIncrement = circumference / 100;
    let dashOffset = circumference - (percentageNum * percentageCircumferenceIncrement);

    if (percentageNum !== 100) {
      progressBar.style.strokeDashoffset = dashOffset;
      progressTextInner.innerText = text;

      // reset complete status if percentageNum recedes from 100
      if (progressElem.classList.contains("circular-progress__circle--complete")) {
        progressTextContainer.style.display = "";
        successElem.style.display = "none";
        progressElem.classList.remove("circular-progress__circle--complete");
      }
    }

    if (percentageNum === 100) {
      progressBar.style.strokeDashoffset = 0;
      progressTextContainer.style.display = "none";
      successElem.style.display = "";
      progressElem.classList.add("circular-progress__circle--complete");
    }
  }

  return setProgress;
}

PolitePop.fullStatsDisplay.circularProgressHtml = function ({
  politePopScrollPercentageRequired, 
  politePopTimeInSecondsRequired,
  minScrollDistanceInPixelsRequired,
  showPolitePopLogo,
}) {
  return `<div class="circular-progress polite-pop">
  ${showPolitePopLogo ? `<div class="circular-progress__heading">
    <img src="https://cdn.politepop.com/v1.2.4-beta/images/demo-logo.png?v=11">
  </div>` : ``}
  <div class="circular-progress__main-container">
  <div class="circular-progress__note">
    <div class="circular-progress__note-heading">Start scrolling!</div>
    <div class="circular-progress__note-text">Polite Pop will open when:</div>
  </div>
  <div class="circular-progress__circles-container">
    <div class="circular-progress__circle-area">
      <div class="circular-progress__circle circular-progress__circle--scroll">
      <svg class="circular-progress__circle-svg" style="transform: rotate(90deg)" height="100%" viewBox="0 0 110 110" width="100%" style="overflow: visible;">
        <!-- gray dashed -->
        <circle cx="50%" cy="50%" fill="none" stroke-width="20" r="40" stroke="#334D80" stroke-dasharray="1.4137,1.4137"></circle>
        <!-- green solid -->
        <circle class="circular-progress__progress-bar" cx="50%" cy="50%" fill="none" stroke-width="20" r="40" stroke="#77D845" style="stroke-dashoffset: 251.3274; stroke-dasharray: 251.3274;"></circle>
        <!-- inner black stroke -->
        <circle class="circular-progress__progress-border" cx="50%" cy="50%" fill="none" stroke-width="1" r="27.5" stroke="#6591E7"></circle>
        <!-- outer black stroke -->
        <circle class="circular-progress__progress-border" cx="50%" cy="50%" fill="none" stroke-width="1" r="52.5" stroke="#6591E7"></circle>
        <g class="circular-progress__success" style="display:none;">
          <!-- inner solid green success -->
          <circle cx="50%" cy="50%" fill="#62CF2A" r="50"></circle>
          <!-- checkmark line -->
          <polyline points="52 74, 65 60, 40 36" stroke="#fff" fill="none" stroke-width="10" />
        </g>
      </svg>
      <div class="circular-progress__text-container">
        <div class="circular-progress__text">
          <span class="circular-progress__text-inner">0</span><span class="circular-progress__text-percent">%</span>
        </div>
      </div>
      </div>
      <div class="circular-progress__label-container">
        <div class="circular-progress__label">scroll:</div>
        <div class="circular-progress__label-note">${politePopScrollPercentageRequired}% of page</div>
      </div>
    </div>
    <div class="circular-progress__circle-area">
      <div class="circular-progress__circle circular-progress__circle--timing">
        <svg class="circular-progress__circle-svg" style="transform: rotate(90deg)" height="100%" viewBox="0 0 110 110" width="100%" style="overflow: visible;">
          <!-- gray dashed -->
          <circle cx="50%" cy="50%" fill="none" stroke-width="20" r="40" stroke="#334D80" stroke-dasharray="1.4137,1.4137"></circle>
          <!-- green solid -->
          <circle class="circular-progress__progress-bar" cx="50%" cy="50%" fill="none" stroke-width="20" r="40" stroke="#77D845" style="stroke-dashoffset: 251.3274; stroke-dasharray: 251.3274;"></circle>
          <!-- inner black stroke -->
          <circle class="circular-progress__progress-border" cx="50%" cy="50%" fill="none" stroke-width="1" r="27.5" stroke="#6591E7"></circle>
          <!-- outer black stroke -->
          <circle class="circular-progress__progress-border" cx="50%" cy="50%" fill="none" stroke-width="1" r="52.5" stroke="#6591E7"></circle>
          <g class="circular-progress__success" style="display:none;">
            <!-- inner solid green success -->
            <circle cx="50%" cy="50%" fill="#62CF2A" r="50"></circle>
            <!-- checkmark line -->
            <polyline points="52 74, 65 60, 40 36" stroke="#fff" fill="none" stroke-width="10" />
          </g>
        </svg>
        <div class="circular-progress__text-container">
          <div class="circular-progress__text">
            <span class="circular-progress__text-inner">${politePopTimeInSecondsRequired}</span><span class="circular-progress__text-percent">s</span>
          </div>
        </div>
      </div>
      <div class="circular-progress__label-container">
        <div class="circular-progress__label">time:</div>
        <div class="circular-progress__label-note">${politePopTimeInSecondsRequired}s on page</div>
      </div>
    </div>
  </div>
</div>
<div class="circular-progress__pop-description-note"><span class="circular-progress__pop-description-note-heading">GET POLITE POP TO POP!</span> Get the <b class="circular-progress__mini-text">scroll</b> and <b class="circular-progress__mini-text">time</b> progress bars to completion!</div>
<div class="circular-progress__pop-exit-description-note"><span class="circular-progress__pop-exit-description-note-heading"><span style="color: #6b94e5;">(BONUS)</span> EXIT INTENT POP</span> Fill up the <b class="circular-progress__mini-text">time</b> progress bar to activate the exit intent pop</div>
<div class="circular-progress__pop-min-distance-scroll-note">You also need to scroll a minimum of <b class="circular-progress__mini-text">${minScrollDistanceInPixelsRequired}px</b></div>
<div class="circular-progress__exit-intent-note"><span class="circular-progress__exit-intent-note-heading">EXIT INTENT ACTIVATED</span> Move your mouse to the tab bar to see the exit-intent pop!</div>
<div class="circular-progress__pop-popped-note"><span class="circular-progress__pop-popped-note-heading">YOU GOT POLITE POP TO POP!</span> You've experienced the magic of Polite Pop!</div>
<div class="circular-progress__pop-disabled-note">
  <span class="circular-progress__pop-disabled-note-heading">NO MORE POPS!</span> Since you've already seen a pop, no more will appear for 3 days. 
  <button class="ocean-wave-button ocean-wave-button--restart-demo">
    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="#ffffff" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
    RESTART DEMO
  </button>
</div>
<div class="circular-progress__no-mobile-support-note"><span class="circular-progress__no-mobile-support-note-heading">NO POPS ON MOBILE</span> Polite Pop doesn't activate on mobile because of the limited space.</div>
</div>`;
}

PolitePop.fullStatsDisplay.init = function({
  politePopScrollPercentageRequired,
  politePopTimeInSecondsRequired,
  minScrollDistanceInPixelsRequired,

  addFormSubmissionWontSubscribeNote = false,
  allowArrowKeysBypass = false,
  showPolitePopLogo = false
} = {}) {

  // insert circular progress html
  document.body.insertAdjacentHTML("beforeend", PolitePop.fullStatsDisplay.circularProgressHtml({
    politePopScrollPercentageRequired,
    politePopTimeInSecondsRequired,
    minScrollDistanceInPixelsRequired,
    showPolitePopLogo
  }));
  // initialize circular progress bars
  let setTimingProgress = PolitePop.fullStatsDisplay.initCircularProgress(document.querySelector(".circular-progress__circle--timing"));
  let setScrollProgress = PolitePop.fullStatsDisplay.initCircularProgress(document.querySelector(".circular-progress__circle--scroll"));

  if (minScrollDistanceInPixelsRequired !== 0) {
    PolitePop.fullStatsDisplay.showMinDistanceScrollNote();
  }

  let demoOptions = {
    debug: true,
    onBelowMinScreenWidth: () => {
      // hide main progress bar
      document.querySelector(".circular-progress__main-container").style.display = "none";

      // set up correct notes
      PolitePop.fullStatsDisplay.hidePopDescriptionNote();
      PolitePop.fullStatsDisplay.hideMinDistanceScrollNote();
      PolitePop.fullStatsDisplay.hidePopExitDescriptionNote();
      PolitePop.fullStatsDisplay.showNoMobileSupportNote();
    },
    onRendered: () => {
      if (addFormSubmissionWontSubscribeNote) {
        document.querySelector(".polite-pop__modal-form").insertAdjacentHTML("beforeend", `<div class="polite-pop__modal-form-submission-note">This form won't subscribe you to anything</div>`);
      }
    },
    onTimingProgress: setTimingProgress,
    onScrollProgress: setScrollProgress,
    onPopped: PolitePop.fullStatsDisplay.popPoppedNotes,
    onExitIntentRequirementsMet: () => {
      PolitePop.fullStatsDisplay.hidePopExitDescriptionNote();
      PolitePop.fullStatsDisplay.hideMinDistanceScrollNote();
      PolitePop.fullStatsDisplay.showExitIntentNote();
    },
    onScrollDistanceInPixelsRequirementMet: () => {
      let noteElem = document.querySelector(".circular-progress__pop-min-distance-scroll-note");
      noteElem.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="position: relative; bottom: -3px; width: 21px; height: 21px;" viewBox="0 0 20 20" fill="#4ade80"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg> Scrolled <b class="circular-progress__mini-text">${PolitePop.options.minScrollDistanceInPixelsRequired}px</b> so far! Continue scrolling to see Polite Pop!`;
    },
    onPopSeenRecently: () => {
      // hide main progress bar
      document.querySelector(".circular-progress__main-container").style.display = "none";

      // set up correct notes
      PolitePop.fullStatsDisplay.hidePopDescriptionNote();
      PolitePop.fullStatsDisplay.hideMinDistanceScrollNote();
      PolitePop.fullStatsDisplay.hidePopExitDescriptionNote();
      PolitePop.fullStatsDisplay.showPopPoppedNotes();
    }
  };

  // reset demo button
  document.querySelector(".circular-progress .ocean-wave-button--restart-demo").addEventListener("click", function (event) {
    PolitePop.reset();
  });

  if (allowArrowKeysBypass) {
    PolitePop.fullStatsDisplay.initArrowKeyBypass();
  }

  return demoOptions;
}









