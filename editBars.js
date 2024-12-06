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

// Event Delegation
document.getElementById("bar-plane").addEventListener("click", (e) => {
  console.log("Bar plane was clicked")
  if(e.target.classList.contains('bar')) {
    editBars(e);
  }
})