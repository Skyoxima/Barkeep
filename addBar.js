document.getElementById("add-bar-btn").addEventListener("click", addBar)
const invalidPtrn = new RegExp(/[^0-9\.]|(?<=\.\d*)\./, "g");
function addBar() {
  const xTicksSpans = document.querySelectorAll('.x-ticks'),
        zXTickPsn = xTicksSpans[0].getBoundingClientRect(),          // z ~ zero-th
        lastTickPsn = xTicksSpans[xTicksSpans.length - 1].getBoundingClientRect(),
        blockerDiv = document.querySelector('.blocker'),
        addBarPopUp = document.querySelector('.add-bar-pu'),
        barPlaneDiv = document.querySelector('#bar-plane'),
        newBarVal = document.getElementById("new-bar-val"),
        newBarLabel = document.getElementById("new-bar-label"),
        newBarColor = document.getElementById("bar-color-picker"),
        popUpSubmitBtn = document.getElementById("pop-up-submit"),
        popUpCancelBtn = document.getElementById("pop-up-cancel");
  
  // Cleanup the screen first
  document.querySelector("#edit-bar-tooltip").classList.remove("active-tooltip");
  popUpSubmitBtn.disabled = true;
  addBarPopUp.style.display = 'block';
  blockerDiv.style.display = 'block';
  
  // live validation of inputted values for the new bar
  newBarVal.oninput = () => {
    if(newBarVal.value === "")                                                  // disable the add button for all invalid inputs i.e no value to set to
      popUpSubmitBtn.disabled = true;
    else {
      console.log('here');
      popUpSubmitBtn.disabled = false
      console.log(invalidPtrn.test(newBarVal.value))
      newBarVal.value = newBarVal.value.replace(invalidPtrn, "");
      popUpSubmitBtn.disabled = false;
    }
  }
  
  // With the entered data, adding the new bar on the canvas when Add is clicked
  popUpSubmitBtn.onclick = () => {
    let bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.background = newBarColor.value === "#ffffff" ? "#FAFAFA" : newBarColor.value; // to not make an invisible bar
    bar.style.setProperty("--stands-for-text", `"${newBarLabel.value}"`);
    bar.setAttribute("bar-value", newBarVal.value);
    bar.setAttribute("bar-number", barPlaneDiv.childElementCount);

    const barWidth = (lastTickPsn.left - zXTickPsn.left) * (parseFloat(newBarVal.value) / 10);
    bar.style.width = `${barWidth}px`;
    barPlaneDiv.appendChild(bar);
    barPlaneDiv.lastChild.animate(
      [
        {width: "0px", opacity: 0},
        {width: `${barWidth}px`, opacity: 1}
      ], {
        duration: 1500,
        iterations: 1,
        easing: "ease-out"
      }
    );
    // barPlaneDiv.lastChild.addEventListener("click", editBars);      // for editing tool tip
    yAxisBarIndxAndVal();
    
    // reset the pop-up field before finalising the submit, keeps it ready for next new bars
    newBarVal.value = "";
    newBarLabel.value = "";
    newBarColor.value = "#ffc0cb";
    addBarPopUp.style.display = 'none';
    blockerDiv.style.display = 'none';
  }

  popUpCancelBtn.onclick = () => {
    addBarPopUp.style.display = 'none';
    blockerDiv.style.display = 'none';
  }
} 

//IIFE (Immediately Invoked Function Expression) to have hold of all the necessary elements already and local event handlers for add bar pop-up(pu) buttons and fields
