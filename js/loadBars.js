import {removeAllBars, yAxisBarIndxAndVal} from "./paralleux.js"

const loadBarFiles = document.getElementById("load-bars-file");

async function loadBars() {
  const loadedBars = await new Response(loadBarFiles.files[0]).json(),                       //! understand this line...
        xTicksSpans = document.querySelectorAll('.x-ticks'),
        zXTickPsn = xTicksSpans[0].getBoundingClientRect(),
        barPlaneDiv = document.querySelector('#bar-plane');
  removeAllBars();                                                                         // clear the screen before loading the uploaded bars

  for(let i = 0; i < loadedBars.allBars.length; i++) {
    const bar = document.createElement('div');
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
    yAxisBarIndxAndVal();
  }
  loadBarFiles.value = null
}

loadBarFiles.addEventListener("change", loadBars);