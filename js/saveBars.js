import { DOM_ELEMENTS } from "./dom.js";

export function saveBars() {
  const title = document.getElementById('graph-title').textContent;

  const obj = { 
    title: title,
    allBars: [] 
  };
  
  for(let i = 0; i < DOM_ELEMENTS.barDivs.length; i++) {
    console.log(window.getComputedStyle(DOM_ELEMENTS.barDivs[i]).getPropertyValue('--stands-for-text'));
    obj.allBars.push(
      {
        barValue: parseFloat(DOM_ELEMENTS.barDivs[i].getAttribute("bar-value")),
        barColor: window.getComputedStyle(DOM_ELEMENTS.barDivs[i]).getPropertyValue("background-color"),
        barLabel: window.getComputedStyle(DOM_ELEMENTS.barDivs[i]).getPropertyValue('--stands-for-text'),
      }
    )
  }
  
  const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
  // direct reference is needed because the anchor now has children elements that trigger the event and the event object's target changes
  DOM_ELEMENTS.saveBarsBtn.href = 'data:' + data;
  DOM_ELEMENTS.saveBarsBtn.download = 'paralleux-save.json';
}