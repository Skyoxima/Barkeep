import { addBarToDOM } from "./addBar.js";
import { BASE_BAR_ANIM_OPTS, BASE_BAR_ANIM_STR } from "./constants.js";
import { DOM_ELEMENTS } from "./dom.js";
import { barAnimator } from "./otherFunctions.js";
import {removeAllBars, yAxisBarIndxAndVal} from "./paralleux.js"

export async function loadBars2() {
  const loadedData = await new Response(DOM_ELEMENTS.loadBarsFile.files[0]).json();  //! understand this line...
  const allBars = loadedData.allBars;
      
  removeAllBars();  // clear the screen before loading the uploaded bars
  for(let i = 0; i < allBars.length; i++) {
    const barWidth = addBarToDOM(allBars[i].barLabel, allBars[i].barColor, allBars[i].barValue);
    barAnimator(DOM_ELEMENTS.barPlane.lastElementChild, [BASE_BAR_ANIM_STR, {width: `${barWidth}px`, opacity: 1}], BASE_BAR_ANIM_OPTS)
    yAxisBarIndxAndVal();
  }
  document.getElementById("graph-title").innerHTML = loadedData.title;
  DOM_ELEMENTS.loadBarsFile.value = null
}

export async function loadBars() {
  const file = DOM_ELEMENTS.loadBarsFile.files[0];

  if(!file) {
    console.error('No File Selected' + Date.prototype.getDate() + "/"
    + (Date.prototype.getMonth()+1)  + "/" 
    + Date.prototype.getFullYear() + " @ "  
    + Date.prototype.getHours() + ":"  
    + Date.prototype.getMinutes() + ":" 
    + Date.prototype.getSeconds());
    return;
  }

  const fileName = file.name.toLowerCase();
  const extn = fileName.endsWith('.csv') ? 'csv' : fileName.endsWith('json') ? 'json' : 'inv';
  console.log(extn);
  
  let loadedData;
  if(extn === 'json') {
    loadedData = await new Response(file).json();
  } else if(extn === 'csv') {
    console.log('here');
    
    const csvText = await file.text();
    loadedData = parseCSV(csvText);
    if(!loadedData) {
      console.error("CSV validation failed. Required columns: barValue, barColor, barLabel!");
      return;
    }
  } else {
    console.log('Invalid File Format!');
  }

  const allBars = loadedData.allBars;
  console.log(allBars);
  
  removeAllBars();  // clear the screen before loading the uploaded bars
  for(let i = 0; i < allBars.length; i++) {
    const barWidth = addBarToDOM(allBars[i].barLabel || '######', allBars[i].barColor || '#303030', allBars[i].barValue || 1);
    barAnimator(DOM_ELEMENTS.barPlane.lastElementChild, [BASE_BAR_ANIM_STR, {width: `${barWidth}px`, opacity: 1}], BASE_BAR_ANIM_OPTS)
    yAxisBarIndxAndVal();
  }
  document.getElementById("graph-title").innerHTML = loadedData.title;
  DOM_ELEMENTS.loadBarsFile.value = null
}

function parseCSV(csvText) {
  const requiredCols = ['barValue', 'barColor', 'barLabel'];
  const rows = csvText.split("\n").map(row => row.split(',').map(cell => cell.trim()))

  const headers = rows[0];
  if(!headers || requiredCols.some(col => !headers.includes(col)))  // check if any one of the headers isn't there in the uploaded files' headers
    return null;

  // after verifying the headers, extracting the data now
  const data = rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  })

  return {
    allBars: data,
    title: ''
  }
}