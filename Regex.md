# RegEx Explanation for live input validation

(These are attempted to be ordered in descending order of importance)

- [^0-9\.] → don't allow any text other than digits and decimal
- (?<=\.\d*)\. → if there is already a decimal (whether or not followed by any other number), don't allow another decimal

- 1[^0\.] → 1 should not be followed by any digit except 0 or a decimal point, [BEFORE DECIMAL THOUGH]
- [2-9]\d → 2-9 should not be followed by any number [BEFORE DECIMAL THOUGH]
- 10\. → 10 should not be followed by anything (10 is the max limit) [BEFORE DECIMAL THOUGH]
- (?<=\d+\.\d{2})\d+ → decimal should be followed by at most 2 digits, rest should not be allowed

Note: It seems that the engine starts checking from the first character on every callback of oninput's handler. That is actually great, because it secures the input field from clicked cursor misinputs and copy-paste misinputs.
