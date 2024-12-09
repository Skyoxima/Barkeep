import { DOM_ELEMENTS } from "./dom.js";
import { saveBars } from "./saveBars.js";

DOM_ELEMENTS.saveBarsBtn.addEventListener("click", (e) => saveBars(e));