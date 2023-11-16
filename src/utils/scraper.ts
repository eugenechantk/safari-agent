export const scrapeDOM = () => {
  const allElements = document.getElementsByTagName("*");

  // Filter clickable elements
  const clickableElements: HTMLElement[] = [].filter.call(allElements, (element: any): boolean => {
    const tagName = element.tagName.toLowerCase();
    // const hasClickableRole =
    //   element.getAttribute("role") === "button" ||
    //   element.getAttribute("role") === "link";
    const clickableTags = ["a", "button", "input"];
    const isClickableTag = clickableTags.includes(tagName);
    const isClickableInput =
      tagName === "input" &&
      ["submit", "button", "reset", "image"].includes(element.getAttribute("type") ?? "");

    const isNotAtOrigin =
      element.getBoundingClientRect().x !== 0 &&
      element.getBoundingClientRect().y !== 0;

    const hasDomain =
      !element.href || element.href.includes(window.location.hostname);
    return (
      (isClickableTag || isClickableInput) &&
      isNotAtOrigin &&
      hasDomain
    );
  });
  
  // var items = [];
  // var globalIDcount = 0;
  // var bodysize = document.body.getBoundingClientRect();

  // for (var e of clickableElements) {
  //   var temp_dict: { [key: string]: any } = {};
  //   // temp_dict["bg-color"] = window
  //   //   .getComputedStyle(e)
  //   //   .getPropertyValue("background-color");
  //   temp_dict["href"] = (e as HTMLAnchorElement).href;
  //   temp_dict["content"] = e.innerText;
  //   if (e.id === "") {
  //     temp_dict["id"] = "" + globalIDcount;
  //     globalIDcount++;
  //   } else {
  //     temp_dict["id"] = e.id;
  //   }
  //   // temp_dict["color_text"] = window
  //   //   .getComputedStyle(e)
  //   //   .getPropertyValue("color");
  //   // temp_dict["size"] = {
  //   //   h: window.getComputedStyle(e).getPropertyValue("height"),
  //   //   w: window.getComputedStyle(e).getPropertyValue("width"),
  //   // };
  //   var rect = e.getBoundingClientRect();
  //   temp_dict["location"] = {
  //     v: (rect.y * 100) / bodysize.height,
  //     h: (rect.x * 100) / bodysize.width,
  //   };
  //   items.push(JSON.stringify(temp_dict));
  // }
  return clickableElements
};
