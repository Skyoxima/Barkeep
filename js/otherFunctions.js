import { DOM_ELEMENTS } from "./dom.js";

export function scrollToCanvas() {
  const y = window.innerHeight;
  window.scroll({
    top: y,
    behavior: "smooth",
  });
}

export function showInfo(e) {    
  DOM_ELEMENTS.editBarModal.classList.remove("active-modal");
  e.target.classList.toggle("active");
  const infoTxt = document.querySelector(".info-text");
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

export function barAnimator(element, keyframes, options) {
  element.animate([
    ...keyframes
  ], options)
}

export function resetFields(elements, targets, defaultVals) {
  
  try {
    if(elements.length !== targets.length) {
      throw Error("noofelements !== nooftargets");
    } else if (targets.length !== defaultVals.length) {
      throw Error ("nooftargets !== noofdefaults");
    } else if (elements.length !== defaultVals.length) {
      throw Error("noofelements !== noofdefaults");
    }
  } catch (err) {
    console.error(err)
  }

  for (let i = 0; i < elements.length; i++) {
    switch (targets[i]) {
      case "value":
        elements[i].value = defaultVals[i];
        break;
      case "display":
        elements[i].style.display = defaultVals[i];
    }
  }
}

// export function blockerClick() {
//   DOM_ELEMENTS.blockerDiv.style.display = 'none';
// }