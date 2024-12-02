// <========================================= Forming the X-axis Ticks Functionality =========================================>
(function CreateXAxisTicks() {
  xTicks = document.querySelectorAll(".x-ticks");

  for(let i = 0; i < xTicks.length; i++) {    
    xTicks[i].style.left = `${1.75 + 4.75 * i}%`; //95 percent in total
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

// <========================================= Indexing the Bars =========================================>
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

//! addBar has been moved to its own file.
//! editBars has been moved to its own file.

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