let copyTextSource = document.querySelector(".copy-code-source");
let generatedOptions = {};

function escapeHTML (str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

let quillOptionsPops = {
  theme: "snow",
  modules: {
    "toolbar": [
      [ "bold", "italic" ],
      [{ "color": [] }, { "background": [] }],
      [ "clean" ]
    ]
  }
};

let quillOptionsModal = {
  theme: "snow",
  modules: {
    "toolbar": [
      [ "bold", "italic" ],
      [{ "list": "ordered" }, { "list": "bullet"}],
      [ "link", "image" ],
      [{ "header": "1" }, { "header": "2" } ],
      [{ "color": [] }, { "background": [] }],
      [ "clean" ]
    ]
  }
};

PolitePop({
  debug: true,
  daysToWaitBeforeDisplayingAgain: 0,
  politePopScrollPercentageRequired: 50,
  politePopTimeInSecondsRequired: 10,
  exitIntentPopScrollPercentageRequired: 0,
  exitIntentPopTimeInSecondsRequired: 10,
  minScreenWidthInPixelsRequired: 0,
  politePopHtml: "Hey, I've been cooking up something cool. Want to get a peek?",
  exitIntentPopHtml: "Want to hear about the next awesome thing I’m working on?",
  modalHtml: "<p>Go beyond social newsfeeds and explore the wild, undiscovered web.</p><p>Join my weekly newsletter where you’ll see:</p><ul><li>Evolving ideas in techno-spirituality</li><li>Life-affirming art that will help you grow</li><li>New ways of communicating on the web</li></ul><p>My mission is to make the web more fun<i>!</i> 🤪</p>",
  onRendered: () => {
    let mainPopElem = document.querySelector(".polite-pop__pop--main");
    let exitIntentPopElem = document.querySelector(".polite-pop__pop--exit-intent");
    let modalElem = document.querySelector(".polite-pop__modal");

    // main pop (preview)
    let mainPopElemTargetContainer = document.querySelector('[data-polite-pop-configurable="main-pop"]');
    let mainPopElemClone = mainPopElem.cloneNode(true);
    mainPopElemTargetContainer.append(mainPopElemClone);

    // exit intent pop (preview)
    let exitIntentPopElemTargetContainer = document.querySelector('[data-polite-pop-configurable="exit-intent"]');
    let exitIntentPopElemClone = exitIntentPopElem.cloneNode(true);
    exitIntentPopElemTargetContainer.append(exitIntentPopElemClone);

    // modal (preview)
    let modalElemTargetContainer = document.querySelector('[data-polite-pop-configurable="modal"]');
    let modalElemClone = modalElem.cloneNode(true);
    modalElemClone.removeAttribute("id");
    modalElemTargetContainer.append(modalElemClone);

    // prevent form submit
    document.querySelectorAll(".polite-pop__modal-form").forEach(formElem => {
      formElem.addEventListener("submit", event => {
        event.preventDefault();
      });
    });

    // set quill content on polite pop
    // also generate code whenever it changes
    [mainPopElemClone, exitIntentPopElemClone, modalElemClone].forEach(el => {
      let containerElem = el.closest(".configurator__item-container");
      let quillElem = containerElem.querySelector(".quill-editor");
      let textElem = el.querySelector(".polite-pop__pop-bubble-text") || el.querySelector(".polite-pop__modal-text");
      let quillOptions = el.querySelector(".polite-pop__pop-bubble-text") ? quillOptionsPops : quillOptionsModal;
      let quill = new Quill(quillElem, quillOptions);
      containerElem.quill = quill;
      quill.on("text-change", (delta, oldDelta, source) => {
        let html = quill.root.innerHTML;
        textElem.innerHTML = html;
        generateAndInsertCode();
      });
    });

    // set content inside polite pop elements
    // and then call generateCode()
    document.querySelectorAll("[data-polite-pop-option]").forEach(configInputElem => {
      configInputElem.addEventListener("input", event => {
        // check if it edits on-screen polite pop content
        if (configInputElem.hasAttribute("[data-polite-pop-edit-target]")) {
          let selectorForTargetElem = configInputElem.getAttribute("data-polite-pop-edit-target");
          let targetElem = document.querySelector(selectorForTargetElem);
          targetElem.innerText = configInputElem.value;
        }

        generateAndInsertCode();
      });
    });
  }
});


function generateAndInsertCode () {
  let copyableCode = generateCode();
  let copyableCodeHtmlEscaped = escapeHTML(copyableCode);
  copyTextSource.innerHTML = copyableCode;
  Prism.highlightElement(copyTextSource);

  // SUPER HACKY
  // hack to properly escape string values inside PolitePop options
  // because innerHTML was causing them to be rendered (even though they were in a string)
  copyTextSource.querySelectorAll(".token.string").forEach(el => {
    let propName = el.innerText.replace(/"/g, "");
    if (typeof generatedOptions[propName] === "string") {
      el.innerHTML = '`' + escapeHTML(generatedOptions[propName]) + '`';
    }
    // special case
    // super ugly hacky ugh
    if (propName === "loadFullStatsDisplay") {
      el.classList.remove("string");
      el.classList.add("boolean");
      el.innerHTML = "true";
    }
  });

}

function generateCode () {
  let politePopStylesheet = `&lt;link rel="stylesheet" type="text/css" href="https://cdn.politepop.com/v1.2.4-beta/polite-pop.min.css"&gt;`;
  let politePopScript = `&lt;script src="https://cdn.politepop.com/v1.2.4-beta/polite-pop.min.js"&gt;&lt;/script&gt;`;

  let optionsJson = JSON.stringify(getGeneratedOptions(), null, 2);
  let optionsNoQuotes = optionsJson.replace(/"([^"]+)":/g, '$1:');
  let inlineOptions = indentString(`PolitePop(${optionsNoQuotes});`);

  let scriptWithInline = `&lt;script&gt;\n${inlineOptions}\n&lt;/script&gt;`;
  return politePopStylesheet + "\n" + politePopScript + "\n" + scriptWithInline;
}

function getGeneratedOptions () {
  let placeHolderOptions = {};

  document.querySelectorAll("[data-polite-pop-option]").forEach(politePopOptionElem => {
    let value;
    let optionName = politePopOptionElem.getAttribute("data-polite-pop-option");
    if (politePopOptionElem.classList.contains("quill-editor")) {
      let containerElem = politePopOptionElem.closest(".configurator__item-container");
      let quill = containerElem.quill;
      value = quill.root.innerHTML;
    } else if (politePopOptionElem.hasAttribute("pattern")) {
      value = parseInt(politePopOptionElem.value);
    } else if (politePopOptionElem.tagName === "SELECT") {
      console.log(123, politePopOptionElem.value, politePopOptionElem.value === "true");
      value = politePopOptionElem.value === "true";
    } else {
      value = politePopOptionElem.value;
    }

    let isChangedFromDefault = PolitePop.defaultOptions[optionName] !== value;
    
    if (isChangedFromDefault) {
      placeHolderOptions[optionName] = typeof value === "number" ? value : optionName;
      generatedOptions[optionName] = value;
    }
  });

  return placeHolderOptions;
}

function indentString (str, count = 2, indent = ' ') {
  return str.replace(/^/gm, indent.repeat(count));
}


// copy to clipboard
document.querySelector(".copy-code").addEventListener("click", () => {
  copyToClipboard(copyTextSource.textContent, () => {
    PolitePop.toastNotification("Copied code! 🎉");
  });
});
function copyToClipboard (str, callback) {
  // Create a <textarea> element
  const el = document.createElement('textarea');
  // Set its value to the string that you want copied
  el.value = str;
  // Make it readonly to be tamper-proof
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  // Move outside the screen to make it invisible
  el.style.left = '-9999px';
  // Append the <textarea> element to the HTML document
  document.body.appendChild(el);
  const selected =
    // Check if there is any content selected previously
    document.getSelection().rangeCount > 0
      // Store selection if found
      ? document.getSelection().getRangeAt(0)     
      // Mark as false to know no selection existed before
      : false;
  // Select the <textarea> content
  el.select();
  // Copy - only works as a result of a user action (e.g. click events)
  document.execCommand('copy');
  // Remove the <textarea> element
  document.body.removeChild(el);
  // If a selection existed before copying
  if (selected) {
    // Unselect everything on the HTML document
    document.getSelection().removeAllRanges();
    // Restore the original selection
    document.getSelection().addRange(selected);
  }

  if (callback) {
    callback();
  }
};





// wait 15s, then scroll the page over 14s (good for screen recording)
function scrollForDemoVideo () {
  let secondsBeforeScroll = 15;

  let jqueryScript = document.createElement("script");
  jqueryScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js");
  document.body.appendChild(jqueryScript);

  jqueryScript.addEventListener('load', () => {
    var scrollScript = document.createElement('script');
    scrollScript.textContent = `setTimeout(() => {
      $([document.documentElement, document.body]).animate({
        scrollTop: 5000
      }, 14000, "linear");
    }, ${secondsBeforeScroll * 1000});`;
    document.body.appendChild(scrollScript);
  });
}







