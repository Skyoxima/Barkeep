import { DOM_ELEMENTS } from "./dom.js";

export function editBars(ev) {
  const closeIcon = document.getElementById("close-edit"),
        confirmIcon = document.getElementById("confirm-edit"),
        deleteIcon = document.getElementById("delete-bar"),
        labelChangeTxt = document.getElementById("change-label"),
        colorInput = document.getElementById("edit-color-swatch");
  
  DOM_ELEMENTS.editBarModal.style.left = `${ev.pageX}px`;      //! have to consider the whole page
  DOM_ELEMENTS.editBarModal.style.top = `${ev.pageY}px`;
  DOM_ELEMENTS.editBarModal.classList.add("active-modal");
  
  deleteIcon.onclick = () => {
    labelChangeTxt.value = ""; 
    DOM_ELEMENTS.editBarModal.classList.remove("active-modal");
    ev.target.remove();
  }
  
  confirmIcon.onclick = () => {
    // ev is accessible because of function closure i.e editBars is HOF because of this function
    ev.target.style.backgroundColor = colorInput.value;
    if(labelChangeTxt.value == "-") {
      ev.target.style.setProperty("--stands-for-text", `""`);
    } else if(labelChangeTxt.value != "") {
      ev.target.style.setProperty("--stands-for-text", `"${labelChangeTxt.value}"`);
    }
    labelChangeTxt.value = ""; 
    DOM_ELEMENTS.editBarModal.classList.remove("active-modal");
  }
  
  closeIcon.onclick = () => {
    labelChangeTxt.value = ""; 
    DOM_ELEMENTS.editBarModal.classList.remove("active-modal");
  }
}
// in my head, I have put handlers here and not in the listeners file because these handlers are strictly pertaining to the elements 
// found inside the parent element, i.e., the edit bars modal. I might change them to listeners though...
// The same reason applies for not putting the element references used here in DOM_ELEMENTS, nothing else use these elements.