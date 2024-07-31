//TODO - Your ES6 JavaScript code (if any) goes here
import "bootstrap"

/* Generate a random background color every second with the following snippet.
Source: https://www.facebook.com/JavaScriptTodayMagazine. 
Original snippet: 
setInterval(() => {
  document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215)
    .toString(16)}`
}, 1000)
Correction from a user:
"The snippet can generate numbers shorter than 6-digit though. Actually there is almost 1/16 chance of producing an invalid code. 3-digit ones are fine, but 4-digit ones will have a potentially unwanted alpha value, and 1/2/5-digits are invalid completely. We should add .padStart(6,'0') after toString to fix this. Also, since we're floor()ing the multiplication result, since random() returns numbers less than 1, we should multiply by 16777216 (or 2**24, for even more clarity) to cover the whole range."

// */
// setInterval(() => {
//   document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777216)
//     .toString(16)
//     .padStart(6, "0")}`
// }, 1000)
