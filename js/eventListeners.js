import { DOM_ELEMENTS } from "./dom.js";
import { saveBars } from "./saveBars.js";
import { handleAddBar } from "./addBar.js";
import { scrollToCanvas, showInfo } from './otherFunctions.js'
import { editBars } from "./editBars.js";
import { loadBars } from "./loadBars.js";
import { adjustBarWidths, removeAllBars } from "./paralleux.js";
// These are ordered in correspondence of their respective HTML elements' order in the HTML file

window.addEventListener("resize", adjustBarWidths)

DOM_ELEMENTS.startBtn.addEventListener("click", scrollToCanvas)

// DOM_ELEMENTS.blockerDiv.addEventListener("click", blockerClick)
// DOM_ELEMENTS.blockerDiv.firstElementChild.addEventListener("click", (e) => {
//   e.stopPropagation();
// })
//~ not using this would close the blockerDiv when any click is registered inside the modal, Event Bubbling.

//~ Event Delegation - While bubbling, the event can be caught by the parent's listener and within the callback...
//~ ...determine from which child it was for through event object, that way, no need to add ELs to each child while creation
DOM_ELEMENTS.barPlane.addEventListener("click", (e) => {
  if(e.target.classList.contains('bar')) {
    editBars(e);
  }
});

DOM_ELEMENTS.infoBtn.addEventListener("click", (e) => { showInfo(e) })

DOM_ELEMENTS.addBarBtn.addEventListener("click", handleAddBar);

DOM_ELEMENTS.removeBarsBtn.addEventListener("click", removeAllBars);

DOM_ELEMENTS.saveBarsBtn.addEventListener("click", (e) => saveBars(e));

// This trick is done for styling to be proper for the button, the input cannot be directly styled to look like a button.
DOM_ELEMENTS.loadBarsBtn.addEventListener("click", () => {
  DOM_ELEMENTS.loadBarsFile.click();
});

DOM_ELEMENTS.loadBarsFile.addEventListener("change", loadBars);

