import { yAxisBarIndxAndVal } from './paralleux.js' 
import { DOM_ELEMENTS } from './dom.js';
import { ADD_BAR_RESETS, BASE_BAR_ANIM_OPTS, BASE_BAR_ANIM_STR, INVALID_PATTERN } from './constants.js';
import { barAnimator, resetFields } from './otherFunctions.js';
console.log(DOM_ELEMENTS.addBarModal)
const addBarVal = document.getElementById("new-bar-val"),
      blockerDiv = document.querySelector('.blocker'),
      // addBarPopUp = document.querySelector('.add-bar-pu'),
      addBarLbl = document.getElementById("new-bar-label"),
      addBarCol = document.getElementById("bar-color-picker"),
      popUpSubmitBtn = document.getElementById("modal-submit"),
      popUpCancelBtn = document.getElementById("modal-cancel");

export function handleAddBar() {
  // Cleanup the screen first
  DOM_ELEMENTS.editBarModal.classList.remove("active-modal");

  // make the pop-up (modal) visible
  DOM_ELEMENTS.addBarModal.showModal()

  // if cancel was previously clicked before "value" was cleared.
  if (addBarVal.value !== "") {
    popUpSubmitBtn.disabled = false
  } else {
    popUpSubmitBtn.disabled = true;
  }
}

// this is extracted so that it can be re-used in loadBars for each bar to be loaded.
export function addBarToDOM(label, color, value) {
  const lastTickPsn = DOM_ELEMENTS.xTicks[DOM_ELEMENTS.xTicks.length - 1].getBoundingClientRect();
  const zXTickPsn = DOM_ELEMENTS.xTicks[0].getBoundingClientRect();

  let bar = document.createElement('div');
  bar.className = 'bar';
  bar.style.background = color === "#ffffff" ? "#FAFAFA" : color; // to not make an invisible bar w.r.t white bg
  bar.style.setProperty("--stands-for-text", label[0] === '\'' ?`${label}` : `\'${label}\'`);  //! quotes problem
  bar.setAttribute("bar-value", value);
  bar.setAttribute("bar-number", DOM_ELEMENTS.barPlane.childElementCount);
  
  const barWidth = (lastTickPsn.left - zXTickPsn.left) * (parseFloat(value) / 10);
  bar.style.width = `${barWidth}px`;
  
  // querySelector works for barPlane, check the dom.js file notes
  DOM_ELEMENTS.barPlane.appendChild(bar);
  return barWidth;
}

function handleAddBarPopUp() {
  const barWidth = addBarToDOM(addBarLbl.value, addBarCol.value, addBarVal.value);
  barAnimator(DOM_ELEMENTS.barPlane.lastElementChild, [BASE_BAR_ANIM_STR, {width: `${barWidth}px`, opacity: 1}], BASE_BAR_ANIM_OPTS)
  yAxisBarIndxAndVal();
  resetFields(
    [addBarVal, addBarLbl, addBarCol],
    ADD_BAR_RESETS.targets,
    ADD_BAR_RESETS.defaultVals
  );
  DOM_ELEMENTS.addBarModal.close();
}


//~ this is why addBarVal is global, to only once attach a listener (it is just hidden, it's always loaded)
addBarVal.addEventListener("input", function (e) {
  if(e.target.value === "")                                                  // disable the add button for all invalid inputs i.e no value to set to
      popUpSubmitBtn.disabled = true;
    else {
      e.target.value = e.target.value.replace(INVALID_PATTERN, "");
      if(e.target.value !== "")
        popUpSubmitBtn.disabled = false;
    }
})

popUpSubmitBtn.addEventListener("click", function () {
  handleAddBarPopUp();
});

popUpCancelBtn.addEventListener("click", function () {
  // addBarPopUp.style.display = 'none';
  DOM_ELEMENTS.addBarModal.close()
  // blockerDiv.style.display = 'none';
});

