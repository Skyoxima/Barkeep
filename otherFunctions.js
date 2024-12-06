function scrollToCanvas(e) {
  const y = window.innerHeight;
  window.scroll({
    top: y,
    behavior: "smooth",
  });
}

function invokeFileUpload() {
  fileUploadTag = document.getElementById("load-bars-file");
  fileUploadTag.click(); // invokes a click on the almost non-existing file tag, make the upload box appear
}

function unhideInfo(e) {  
  document.querySelector("#edit-bar-tooltip").classList.remove("active-tooltip");
  e.target.classList.toggle("active");
  console.log()
  // e.target.firstChild.classList.toggle("active");
  infoTxt = document.querySelector(".info-text");
  infoTxt.classList.toggle("active-text");
  if (infoTxt.classList.contains("active-text"))
    infoTxt.style.height = `${
      parseFloat(
        window
          .getComputedStyle(document.querySelector(".info-text ul"))
          .getPropertyValue("height")
      ) + 40
    }px`;
  else infoTxt.style.height = 0;
}