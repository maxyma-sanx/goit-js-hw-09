!function(){var t={body:document.querySelector("body"),start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]")},e=null;t.start.addEventListener("click",(function(){e=setInterval((function(){t.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),t.start.disabled=!0})),t.stop.addEventListener("click",(function(){clearInterval(e),t.start.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.af657a4f.js.map
