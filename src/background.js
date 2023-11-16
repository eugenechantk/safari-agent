import browser from "webextension-polyfill";

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // Log the message received from the content script
  console.log("Message received:", request.greeting);
});
