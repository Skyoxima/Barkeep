export const INVALID_PATTERN = new RegExp(
  /[^0-9\.]|(?<=\.\d*)\.|(?<=\d*\.\d{2})\d+|(?<=^[2-9])\d+|(?<=^10).+|(?<=^1)[1-9]+|(?<=^0)\d+/,
  "g"
);

export const BASE_COLOR = "#ffc0cb";

export const ADD_BAR_RESETS = {
  targets: [
    "value",
    "value",
    "value",
  ],
  defaultVals: [
    "",
    "",
    BASE_COLOR,
  ]
}

export const BASE_BAR_ANIM_STR = {width: "0px", opacity: 0}

export const BASE_BAR_ANIM_OPTS = {
  duration: 1500,
  iterations: 1,
  easing: "ease-out"
}