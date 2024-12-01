// <========================================= Forming the X-axis Ticks Functionality =========================================>
(function CreateXAxisTicks() {
  xTicks = document.querySelectorAll(".x-ticks");

  for(let i = 0; i < xTicks.length; i++) {
    xTicks[i].style.left = `${1.75 + 4.75 * i}%`;
    xTicks[i].style.setProperty("--tick-text", `'${i / 2}'`);
    if(i / 2 > 6)
      xTicks[i].style.setProperty("--tick-text-color", "green");
    else if(i / 2 > 3 && i / 2 < 7)
      xTicks[i].style.setProperty("--tick-text-color", "#ffb700");
  }
})();

// <========================================= Adjusting the bar width whenever xTicks change =========================================>
(function adjustBarWidths() {
  window.addEventListener("resize", () => {
    const xTicks = document.querySelectorAll(".x-ticks"),   // when the zeroth changes so do the others cause percentages have been used
          barDivs = document.querySelectorAll(".bar");
    
    for(let i = 0; i < barDivs.length; i++) {
      barDivs[i].style.width = `${xTicks[parseFloat(barDivs[i].getAttribute("bar-value")) * 2].getBoundingClientRect().left - xTicks[0].getBoundingClientRect().left}px`;
      //. * 2 makes the value correctly correspond to its index
      
      // keeps the bar index on within the y-axis - offsetLeft gives position relative to the parent which is what I wanted for 0th x-tick
      if(i < 9)
        barDivs[i].style.setProperty("--bar-index-left", `${-(xTicks[0].offsetLeft + 5)}px`);
      if(i >= 9)
        barDivs[i].style.setProperty("--bar-index-left", `${-(xTicks[0].offsetLeft + 3)}px`);
    }
  });
})();

// <========================================= Indexing the Bars Functionality =========================================>
function yAxisBarIndxAndVal() {
  barDivs = document.querySelectorAll('.bar');
  for(let i = 0; i < barDivs.length; i++) {
    const barValue = parseFloat(barDivs[i].getAttribute("bar-value"));
    barDivs[i].innerHTML = `<span>${barValue}</span>`;
    
    // adjusting the text representation for the bar value inside the div
    if((barValue * 2) % 2 != 0)                                   // if decimal value
      barDivs[i].firstChild.style.right = "-25px";

    if(i >= 9)
      barDivs[i].style.setProperty("--bar-index-left", "-20px");
    if(barValue == 10)
      barDivs[i].firstChild.style.right = "-18px";

  }
};
yAxisBarIndxAndVal();          //! for testing, no need to call it on an empty canvas

// <========================================= Adding a Bar Functionality =========================================>
(function addBar() {
  const xTicksSpans = document.querySelectorAll('.x-ticks'),
        zXTickPsn = xTicksSpans[0].getBoundingClientRect(),          // z ~ zero-th
        lastTickPsn = xTicksSpans[xTicksSpans.length - 1].getBoundingClientRect(),
        blockerDiv = document.querySelector('.blocker'),
        addBarPopUp = document.querySelector('.add-bar-pu'),
        barPlaneDiv = document.querySelector('#bar-plane'),
        addBarBtn = document.getElementById('add-bar-btn'),
        newBarVal = document.getElementById("new-bar-val"),
        newBarLabel = document.getElementById("new-bar-label"),
        newBarColor = document.getElementById("bar-color-picker"),
        popUpSubmitBtn = document.getElementById("pop-up-submit"),
        popUpCancelBtn = document.getElementById("pop-up-cancel");
  
  // Entering the pop-up by using the button on the Control Panel
  addBarBtn.onclick = () => {
    document.querySelector("#edit-bar-tooltip").classList.remove("active-tooltip");
    popUpSubmitBtn.disabled = true;
    addBarPopUp.style.display = 'block';
    blockerDiv.style.display = 'block';
  }
  
  // live validation of inputted values for the new bar
  newBarVal.oninput = () => {
    if(newBarVal.value === "")                                                  // disable the add button for all invalid inputs i.e no value to set to
      popUpSubmitBtn.disabled = true;
    else {
      newBarVal.value = newBarVal.value.replace(/^\.|[^0-9\.]||10.|(?<=\.\d\d).*/g, "");      
      popUpSubmitBtn.disabled = false;
    }
  }
  // ^\. → . cannot be at the start of the string
  // [^0-9\.] → don't allow any text other than digits and decimal
  // (?<=\.\d*)\. → if there is already a decimal, don't allow another decimal
  //- 1[^0\.] → 1 should not be followed by any digit except 0 or a decimal point, _if_ there isn't a decimal already ahead
  //- [2-9]\d → 2-9 should not be followed by any number
  // → any number should not be followed by anything except decimal, _if_ there isn't a decimal already
  // 10. → 10 should not be followed by anything (10 is the max limit)
  // (?<=\.\d\d).* → decimal should be followed by at most 2 digits, rest should not be allowed

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
    barPlaneDiv.lastChild.addEventListener("click", editBars);      // for editing tool tip
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
})(); //IIFE (Immediately Invoked Function Expression) to have hold of all the necessary elements already and local event handlers for add bar pop-up(pu) buttons and fields

// <========================================= Editing Bars (Tooltip) Functionality =========================================>
function editBars(ev) {
  const editBarDiv = document.getElementById("edit-bar-tooltip"),
        closeIcon = document.getElementById("close-edit"),
        confirmIcon = document.getElementById("confirm-edit"),
        deleteIcon = document.getElementById("delete-bar"),
        labelChangeTxt = document.getElementById("change-label"),
        colorInput = document.getElementById("edit-color-swatch");

  editBarDiv.style.left = `${ev.pageX}px`;      //! have to consider the whole page
  editBarDiv.style.top = `${ev.pageY}px`;
  editBarDiv.classList.add("active-tooltip");
  
  deleteIcon.onclick = () => {
    labelChangeTxt.value = ""; 
    editBarDiv.classList.remove("active-tooltip");
    ev.target.remove();
  }
  
  confirmIcon.onclick = (e) => {
    // ev is accessible because of function closure i.e editBars is HOF because of this function
    ev.target.style.backgroundColor = colorInput.value;
    if(labelChangeTxt.value == "-") {
      ev.target.style.setProperty("--stands-for-text", `""`);
    } else if(labelChangeTxt.value != "") {
      ev.target.style.setProperty("--stands-for-text", `"${labelChangeTxt.value}"`);
    }
    labelChangeTxt.value = ""; 
    editBarDiv.classList.remove("active-tooltip");
  }
  
  closeIcon.onclick = () => {
    labelChangeTxt.value = ""; 
    editBarDiv.classList.remove("active-tooltip");
  }
}

// <========================================= Removing All Bars Functionality =========================================>
const removeAllBars = () => {
  const barPlaneDiv = document.getElementById("bar-plane");
  barPlaneDiv.innerHTML = null;
}

// <========================================= Saving/Downloading Functionality =========================================>
//! Cancelling still downloads an empty file, fix that.
(function saveBars() {
let saveBarsBtn = document.getElementById('save-bars-btn');
saveBarsBtn.addEventListener("click", () => {
    barDivs = document.querySelectorAll('.bar');
    obj = { 
      allBars: [] 
    };

    for(let i = 0; i < barDivs.length; i++) {
      obj.allBars.push(
        {
          barValue: parseFloat(barDivs[i].getAttribute("bar-value")),
          barColor: window.getComputedStyle(barDivs[i]).getPropertyValue("background-color"),
          barLabel: window.getComputedStyle(barDivs[i]).getPropertyValue('--stands-for-text'),
        }
      )
    }
    
    const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
    saveBarsBtn.href = 'data:' + data;
    saveBarsBtn.download = 'SaveBars.json';
});
})();

// <========================================= Loading Functionality =========================================>
const loadBarFiles = document.getElementById("load-bars-file");
loadBarFiles.onchange = async () => {
  const loadedBars = await new Response(loadBarFiles.files[0]).json(),                       //! understand this line...
        xTicksSpans = document.querySelectorAll('.x-ticks'),
        zXTickPsn = xTicksSpans[0].getBoundingClientRect(),
        barPlaneDiv = document.querySelector('#bar-plane');
  removeAllBars();                                                                         // clear the screen before loading the uploaded bars

  for(let i = 0; i < loadedBars.allBars.length; i++) {
    bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.background = loadedBars.allBars[i].barColor;
    bar.style.setProperty("--stands-for-text", loadedBars.allBars[i].barLabel);
    bar.setAttribute("bar-value", loadedBars.allBars[i].barValue);
    bar.setAttribute("bar-number", barPlaneDiv.childElementCount + 1);
    
    let iXTickPsn = xTicksSpans[loadedBars.allBars[i].barValue * 2].getBoundingClientRect();
    const barWidth = iXTickPsn.left - zXTickPsn.left;
    bar.style.width = `${barWidth}px`;
    barPlaneDiv.appendChild(bar);
    barPlaneDiv.lastChild.animate(
      [
        {width: "0px", opacity: 0},
        {width: `${barWidth}px`, opacity: 1}
      ], {
        duration: 1500,
        iterations: 1,
        easing: "ease-out",
        delay: i * 100,
        fill: "backwards"
      }
      );
      // adding a listener to divs added from this method, I intended for dblclick but it's not happening on laptop so fellback to click
    barPlaneDiv.lastChild.addEventListener("click", editBars);
    yAxisBarIndxAndVal();
  }
  loadBarFiles.value = null                                                                // once the file has been read, delete it
}