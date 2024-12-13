import { DOM_ELEMENTS } from "./dom.js";

// <========================================= Forming the X-axis Ticks Functionality =========================================>
(function CreateXAxisTicks() {
  // xTicks = document.querySelectorAll(".x-ticks");

  for (let i = 0; i < DOM_ELEMENTS.xTicks.length; i++) {
    DOM_ELEMENTS.xTicks[i].style.left = `${1.75 + 4.75 * i}%`; //95 percent in total
    DOM_ELEMENTS.xTicks[i].style.setProperty("--tick-text", `'${i / 2}'`);
    if (i / 2 > 6)
      DOM_ELEMENTS.xTicks[i].style.setProperty("--tick-text-color", "green");
    else if (i / 2 > 3 && i / 2 < 7)
      DOM_ELEMENTS.xTicks[i].style.setProperty("--tick-text-color", "#ffb700");
  }
})(); //IIFE-ing these so that they make the dynamic UI asap after the HTML elements are loaded

// <========================================= Adjusting the bar width whenever xTicks change =========================================>
(function adjustBarWidths() {
  window.addEventListener("resize", () => {
    for (let i = 0; i < DOM_ELEMENTS.barDivs.length; i++) {
      DOM_ELEMENTS.barDivs[i].style.width = `${
        DOM_ELEMENTS.xTicks[
          parseFloat(DOM_ELEMENTS.barDivs[i].getAttribute("bar-value")) * 2
        ].getBoundingClientRect().left -
        DOM_ELEMENTS.xTicks[0].getBoundingClientRect().left
      }px`;
      //. * 2 makes the value correctly correspond to its index

      // keeps the bar index on within the y-axis. -offsetLeft gives position relative to the parent which is what I wanted for 0th x-tick
      if (i < 9)
        DOM_ELEMENTS.barDivs[i].style.setProperty(
          "--bar-index-left",
          `${-(DOM_ELEMENTS.xTicks[0].offsetLeft + 5)}px`
        );
      if (i >= 9)
        DOM_ELEMENTS.barDivs[i].style.setProperty(
          "--bar-index-left",
          `${-(DOM_ELEMENTS.xTicks[0].offsetLeft + 3)}px`
        );
    }
  });
})();

// <========================================= Indexing the Bars =========================================>
export function yAxisBarIndxAndVal() {
  for (let i = 0; i < DOM_ELEMENTS.barDivs.length; i++) {
    const barValue = parseFloat(
      DOM_ELEMENTS.barDivs[i].getAttribute("bar-value")
    );
    DOM_ELEMENTS.barDivs[i].innerHTML = `<span>${barValue}</span>`;

    // adjusting the text representation for the bar value inside the div
    if ((barValue * 2) % 2 != 0)
      // if decimal value
      DOM_ELEMENTS.barDivs[i].firstChild.style.right = "-25px";

    if (i >= 9)
      DOM_ELEMENTS.barDivs[i].style.setProperty("--bar-index-left", "-20px");
    if (barValue == 10)
      DOM_ELEMENTS.barDivs[i].firstChild.style.right = "-18px";
  }
}
yAxisBarIndxAndVal(); //! for testing, no need to call it on an empty canvas

// <========================================= Removing All Bars Functionality =========================================>
export function removeAllBars() {
  const barPlaneDiv = document.getElementById("bar-plane");
  barPlaneDiv.innerHTML = null;
}
