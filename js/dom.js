export const DOM_ELEMENTS = {
  startBtn: document.getElementById("start-btn"),
  get barDivs() {
    return Array.from(document.getElementsByClassName("bar"));
  },
  barPlane: document.querySelector("#bar-plane"),
  blockerDiv: document.querySelector('.blocker'),
  xTicks: document.querySelectorAll('.x-ticks'),
  addBarBtn: document.getElementById("add-bar-btn"),
  saveBarsBtn: document.getElementById("save-bars-btn"),
  loadBarsBtn: document.getElementById("load-bars-btn"),
  loadBarsFile: document.getElementById("load-bars-file"),
  removeBarsBtn: document.getElementById("remove-all-bars-btn"),
  editBarModal: document.getElementById('edit-bar-modal'),
  infoBtn: document.getElementById("info-button")
}

//~ (Following notes are pertaining to addBars and loadBars)
// Note: QuerySelectors return a static NodeList, a snapshot of, at the time state of the element. It doesn't update dynamically.
// getElementsBy... can be used for the dynamicity, but it required Array mapping as it returns a HTML Collection and not a NodeList.
// Unfortunately, it now comes down to requerying updates (which would be equivalent to vanilla "at the start of a function querying") or using getElementsBy... which has an overhead too
// Also, xTicks reference is still valid, as I am only using it for getBoundingClientRect which dynamically updates, xTicks' DOM subtree isn't changing with my code and so this reference can stay.

//~ Pertaining to barPlane
// Sort of an expansion of the previous points, since bar-plane itself is not changing as a DOM element, it can be querySelected. The reference will work as intended.