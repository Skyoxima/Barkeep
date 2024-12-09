import { DOM_ELEMENTS } from "./dom.js";

export function saveBars(e) {
  const obj = { 
    allBars: [] 
  };

  for(let i = 0; i < DOM_ELEMENTS.barDivs.length; i++) {
    obj.allBars.push(
      {
        barValue: parseFloat(DOM_ELEMENTS.barDivs[i].getAttribute("bar-value")),
        barColor: window.getComputedStyle(DOM_ELEMENTS.barDivs[i]).getPropertyValue("background-color"),
        barLabel: window.getComputedStyle(DOM_ELEMENTS.barDivs[i]).getPropertyValue('--stands-for-text'),
      }
    )
  }
  
  const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
  e.target.href = 'data:' + data;
  e.target.download = 'paralleux-save.json';
}