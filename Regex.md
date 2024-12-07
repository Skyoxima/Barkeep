# RegEx Explanation for live input validation

(These are attempted to be ordered in descending order of importance)

- [^0-9\.] → don't allow any text other than digits and decimal
- (?<=\.\d*)\. → if there is already a decimal (whether or not followed by any other number), don't allow another decimal
- 1[^0\.] → 1 should not be followed by any digit except 0 or a decimal point, _if_ there isn't a decimal already ahead
- [2-9]\d → 2-9 should not be followed by any number (except if this is after the decimal...)
- → any number should not be followed by anything except decimal, _if_ there isn't a decimal already
- 10\. → 10 should not be followed by anything (10 is the max limit)
- (?<=\.\d\d).* → decimal should be followed by at most 2 digits, rest should not be allowed

There has to be one where it blocks any number after a number if there is no decimal.
But there has to be another check where if there is a decimal, then number following a number should be allowed once

What if I try to match valid pattern instead..?
