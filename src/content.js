import browser from "webextension-polyfill";
import { scrapeDOM, getRandomClickableElement } from "./utils/scraper";
import React from "react";
import { render } from "react-dom";
import { StyleSheetManager } from "styled-components";
import { CursorContainer } from "./Cursor";
import { getElementCoordinates, smoothScrollTo } from "./utils/domManipulation";

// window.addEventListener("load", function () {
//   const message = { greeting: "Sending from content script; page loaded" };
//   const items = scrapeDOM();
//   // console.log("Clickables:", items);
//   const randomSelectedElement = getRandomClickableElement(items);
//   // console.log("Random clickable element:", randomSelectedElement);
//   browser.runtime.sendMessage(message);
// });

const body = document.querySelector("body");
const app = document.createElement("div");
app.style.cssText = "z-index:10000;position:relative";

app.id = "react-root";

if (body) {
  body.prepend(app);
}

// const container = document.getElementById("react-root");
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
  const [position, setPosition] = React.useState({
    x: window.innerWidth * 0.4,
    y: window.innerHeight * 0.3,
  });

  const [cursorClicked, setCursorClicked] = React.useState(false);
  const [wasclicked, setWasclicked] = React.useState(false);

  window.addEventListener("load", async () => {
    console.log("Page loaded");
    const items = scrapeDOM();
    // This is where you will send the DOM to the background script for AI processing
    // For now, just simulate a random click
    let nextElement;
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("async get random clickable element");
        nextElement = getRandomClickableElement(items);
        resolve();
      }, 1500);
    });
    await simulateClick(nextElement);
  });

  const simulateClick = async (elementToClick) => {
    console.log("simulating click for: ", elementToClick);
    let nextPosition = elementToClick.getBoundingClientRect();
    const scrolledBy =
      nextPosition.y >= window.innerHeight
        ? nextPosition.y - window.innerHeight / 2 + 180
        : nextPosition.y;
    const scrollTime =
      nextPosition.y >= window.innerHeight ? scrolledBy * 0.5 : 1000;
    if (nextPosition.y >= window.innerHeight) {
      // Set the cursor position relative to the window
      const newPos = {
        x: nextPosition.x - 22,
        y: nextPosition.y - 22,
      };
      setPosition(newPos);
      // Scrolling the page itself
      await smoothScrollTo(scrolledBy, scrollTime);
    } else {
      setPosition(nextPosition);
    }
    setTimeout(() => {
      setCursorClicked(true);
    }, scrollTime);
    setTimeout(() => {
      elementToClick.click();
      setWasclicked(false);
      setCursorClicked(false);
    }, 1500);
  };

  React.useEffect(() => {
    console.log(cursorClicked, typeof cursorClicked);
  }, [cursorClicked]);

  return (
    <>
      <CursorContainer position={position} clicked={cursorClicked} />
    </>
  );
};

render(
  <StyleSheetManager target={styleSlot}>
    <App />
  </StyleSheetManager>,
  renderIn
);
