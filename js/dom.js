export const DOM_ELEMENTS = {
  barPlane: document.querySelector("#bar-plane"),
  xTicks: document.querySelectorAll('.x-ticks'),
  barDivs: document.querySelectorAll('.bar'),
  addBarBtn: document.getElementById("add-bar-btn"),
  saveBarsBtn: document.getElementById("save-bars-btn")
}

// Note: QuerySelectors return a static NodeList, a snapshot of, at the time state of the element. It doesn't update dynamically.
// getElementsBy... can be used for the dynamicity, but it required Array mapping as it returns a HTML Collection and not a NodeList.
// Unfortunately, it now comes down to requerying updates (which would be equivalent to vanilla "at the start of a function querying") or using getElementsBy... which has an overhead too