import { yAxisBarIndxAndVal } from './paralleux.js' 
import { DOM_ELEMENTS } from './dom.js';

const addBarBtn = document.getElementById("add-bar-btn"),
      newBarVal = document.getElementById("new-bar-val"),
      blockerDiv = document.querySelector('.blocker'),
      addBarPopUp = document.querySelector('.add-bar-pu'),
      popUpSubmitBtn = document.getElementById("pop-up-submit"),
      popUpCancelBtn = document.getElementById("pop-up-cancel");
const invalidPtrn = new RegExp(/[^0-9\.]|(?<=\.\d*)\.|(?<=\d*\.\d{2})\d+|(?<=^[2-9])\d+|(?<=^10).+|(?<=^1)[1-9]+|(?<=^0)\d+/, "g");

addBarBtn.addEventListener("click", addBar)

newBarVal.addEventListener("input", function (e) {
  if(e.target.value === "")                                                  // disable the add button for all invalid inputs i.e no value to set to
      popUpSubmitBtn.disabled = true;
    else {
      e.target.value = e.target.value.replace(invalidPtrn, "");
      if(e.target.value !== "")
        popUpSubmitBtn.disabled = false;
    }
})

popUpCancelBtn.addEventListener("click", function () {
  addBarPopUp.style.display = 'none';
  blockerDiv.style.display = 'none';
})

function addBar() {
  const xTicksSpans = document.querySelectorAll('.x-ticks'),
        zXTickPsn = xTicksSpans[0].getBoundingClientRect(),          // z ~ zero-th
        lastTickPsn = xTicksSpans[xTicksSpans.length - 1].getBoundingClientRect(),
        
        barPlaneDiv = document.querySelector('#bar-plane'),
        newBarLabel = document.getElementById("new-bar-label"),
        newBarColor = document.getElementById("bar-color-picker");
  
  // Cleanup the screen first
  document.querySelector("#edit-bar-tooltip").classList.remove("active-tooltip");
  addBarPopUp.style.display = 'block';
  blockerDiv.style.display = 'block';
  
  function handleSubmit() {
    let bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.background = newBarColor.value === "#ffffff" ? "#FAFAFA" : newBarColor.value; // to not make an invisible bar
    bar.style.setProperty("--stands-for-text", `"${newBarLabel.value}"`);
    bar.setAttribute("bar-value", newBarVal.value);
    bar.setAttribute("bar-number", barPlaneDiv.childElementCount);

    const barWidth = (lastTickPsn.left - zXTickPsn.left) * (parseFloat(newBarVal.value) / 10);
    bar.style.width = `${barWidth}px`;
    barPlaneDiv.appendChild(bar);
    
    barPlaneDiv.lastElementChild.animate(
      [
        {width: "0px", opacity: 0},
        {width: `${barWidth}px`, opacity: 1}
      ], {
        duration: 1500,
        iterations: 1,
        easing: "ease-out"
      }
    );
    yAxisBarIndxAndVal();
    
    // reset the pop-up field before finalising the submit, keeps it ready for next new bars
    newBarVal.value = "";
    newBarLabel.value = "";
    newBarColor.value = "#ffc0cb";
    addBarPopUp.style.display = 'none';
    blockerDiv.style.display = 'none';
  }
  
  // With the entered data, adding the new bar on the canvas when Add is clicked or when enter is pressed
  popUpSubmitBtn.onclick = handleSubmit
}