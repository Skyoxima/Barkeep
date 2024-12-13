import { DOM_ELEMENTS } from "./dom.js";
import {removeAllBars, yAxisBarIndxAndVal} from "./paralleux.js"

export async function loadBars() {
  const loadedBars = await new Response(DOM_ELEMENTS.loadBarsFile.files[0]).json();  //! understand this line...
  const allBars = loadedBars.allBars,
        zXTickPsn = DOM_ELEMENTS.xTicks[0].getBoundingClientRect();
        // barPlaneDiv = document.querySelector('#bar-plane');
        
  removeAllBars();                                                                         // clear the screen before loading the uploaded bars
  for(let i = 0; i < allBars.length; i++) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.background = allBars[i].barColor;
    bar.style.setProperty("--stands-for-text", allBars[i].barLabel);
    bar.setAttribute("bar-value", allBars[i].barValue);
    bar.setAttribute("bar-number", DOM_ELEMENTS.barPlane.childNodes.length + 1);
    
    let iXTickPsn = DOM_ELEMENTS.xTicks[allBars[i].barValue * 2].getBoundingClientRect();
    const barWidth = iXTickPsn.left - zXTickPsn.left;
    bar.style.width = `${barWidth}px`;
    DOM_ELEMENTS.barPlane.appendChild(bar);
    
    DOM_ELEMENTS.barPlane.lastChild.animate(
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
  DOM_ELEMENTS.loadBarsFile.value = null
}