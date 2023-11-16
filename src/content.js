import browser from "webextension-polyfill";
import { scrapeDOM } from "./utils/scraper";
import React from "react";
import { render } from "react-dom";
import { StyleSheetManager } from "styled-components";
import Cursor from "./components/Cursor";

const getRandomClickableElement = (clickableElements) => {
  // Select a random element from the clickable elements
  const randomIndex = Math.floor(Math.random() * clickableElements.length);
  const randomClickableElement = clickableElements[randomIndex];

  return randomClickableElement;
};

window.addEventListener("load", function () {
  const message = { greeting: "Sending from content script; page loaded" };
  const items = scrapeDOM();
  console.log("Clickables:", items);
  const randomSelectedElement = getRandomClickableElement(items);
  console.log("Random clickable element:", randomSelectedElement);
  randomSelectedElement.click();
  browser.runtime.sendMessage(message);
});

const body = document.querySelector("body");
const app = document.createElement("div");
app.style.cssText = "z-index:10000;position:fixed;bottom:16px;width:100%";

app.id = "react-root";

if (body) {
  body.prepend(app);
}

const container = document.getElementById("react-root");
// const root = createRoot(container);

const host = document.querySelector("#react-root");
const shadow = host.attachShadow({ mode: "open" });

// create a slot where we will attach the StyleSheetManager
const styleSlot = document.createElement("section");
// append the styleSlot inside the shadow
shadow.appendChild(styleSlot);

// create the element where we would render our app
const renderIn = document.createElement("div");
// append the renderIn element inside the styleSlot
styleSlot.appendChild(renderIn);

const App = () => {
  return (
    <>
      <Cursor />
    </>
  );
};

render(
  <StyleSheetManager target={styleSlot}>
    <App />
  </StyleSheetManager>,
  renderIn
);
