// utility function through out the app

export function addCommas(number) {
    let numStr = number.toString();
    let lastThree = numStr.slice(-3);
    let otherNumbers = numStr.slice(0, -3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    let result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return result;
  }

export function numberToWords(number) {
    const units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const teens = ["", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const thousands = ["", "thousand", "lakh", "crore"];
  
    if (number === "0") return "zero";
  
    let numStr = number.toString();
    let numLength = numStr.length;
  
    function getTwoDigitWords(num) {
      if (num < 10) return units[num];
      if (num < 20) return teens[num - 10];
      return tens[Math.floor(num / 10)] + (num % 10 === 0 ? "" : " " + units[num % 10]);
    }
  
    function getThreeDigitWords(num) {
      if (num < 100) return getTwoDigitWords(num);
      return units[Math.floor(num / 100)] + " hundred" + (num % 100 === 0 ? "" : " " + getTwoDigitWords(num % 100));
    }
  
    if (numLength > 7) return "Number too large";
  
    let words = "";
    if (numLength > 5) {
      words += getTwoDigitWords(parseInt(numStr.slice(0, -5))) + " lakh ";
      numStr = numStr.slice(-5);
    }
    if (numLength > 3) {
      words += getTwoDigitWords(parseInt(numStr.slice(0, -3))) + " thousand ";
      numStr = numStr.slice(-3);
    }
    words += getThreeDigitWords(parseInt(numStr));
  
    return words.trim();
  }
