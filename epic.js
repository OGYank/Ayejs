// ==UserScript==
// @name PatreonFull
// @namespace https://github.com/frosn0w/iOSscripts
// @version 1.3.1
// @description Expand content and comments.
// @author frosn0w
// @match *://*.patreon.com/*
// @run-at document-end
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA3tJREFUeF7tmj1s00AUx/8vbjdaOy1MMMDCQBlggoEBJMRE2ZqNBSEisdRRO7A1nVhaxSxIRagDYzu2E0KiAwNMdKAMLDDABG3swtamD10hJRjbd44T+YgvY+757r3ffbyPO0LBf1Rw+2EAmBVQcAJmCxR8AZhDUHkLfJ8ZO9c6aN0hxhUGLum4cgh4w4RXVqm1PLL4472KjkoAAteZY3BdpUNdZBg8X/Z2pTpLAXyrjZ8c4v3PuhiWRo99Gjp1vLH9JekbKYDAHW0wyE0zsC6yBPZsb7eWCYDv2m8BXNDFqJR6bDpecDErAE45qFbijhckrnLpFvBd2wDQakpTKtP3FcCg+bLnJ7qbpuucLoGXGLihoj8Bzw9A1bLnf0qSb7qjdQLNJcn0HYBsgLZyvmvfA7CkAgBA1fGCJyqysi0q0y/zGRAeoOk6V8OKE/MJEFZUDDqSYVSY6Gv4m7Lnb3T+px0AoZxfs1fAmEplsEyYsOo0gkpYTBsAYuY7Z6enEELGd46lFQAivt85Sz2BEDJe9MlMj9uw9QIAfokIhbveDjF9MeiavgDEJu0FhIQ+9AcQAaE57awR8U3ZWffrU16zvd1bRy40dKhqBYBBZ0TAEunnO2ax2zgg5hw5jBNEgEXgj7kGQiJqY8bTOD/PTOsEftZNHEDEtxk0GWkgo0KEu7Losu+BkMqSzlPGADDpsKkHmIKIKYklEMicDud5wquMbbyA8QLGC/TXC4jEhUHrsfU+wioYL1LUA9tbuwrC9YRUusrMk0SUmGD1/QxokXV+vLGz5U/bU//E+53JUFR73CnGqDiPgtXY8trv9sMb61ZrK9dkqE1YlKlIFETavyw1Acm3WqXDkQCyGK8AUG8AvTBeAkFfAEUviha6LP7XbU0RL0baACKvxsBnu4kDGPThv7wai/LLkXGCQhwgS3hyvxhRuR7fro1NDPH+w9gCZ8hKAq2VrNKDkcWdxKduTdepEzjf63HZDOXd3vdQOG8DZeMbAFnrAYFrv9b1aaxs9sXTWdsLLmerCdbsBTBmZINp2U5YdBrBbCYA27VjExZb77Q0UKKUZVkTMk8iLYqKMVTcjW6ACFS3PX9eppcSANGJeDQ9zHuzDBKPoHR9OrtJ4I09Gl6QPZL+k3DKEA14u/IKGFQOBsCgzqyqXWYFqJIaVDmzAgZ1ZlXt+gnhrHFfaCYwZQAAAABJRU5ErkJggg==
// @grant none
// @license MIT
// ==/UserScript==
 
// Define a constant for the sleep time in milliseconds
const SLEEP_TIME = 375;

// Define a function to wait for a given time
function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

// Define a counter for the number of iterations
let count = 1;

// Define a function to process the elements on the page
function processElements() {
  // Get all the elements of different types
  let buttons = document.querySelectorAll("button");
  let divs = document.querySelectorAll("div");
  let spans = document.querySelectorAll("span");
  let links = document.querySelectorAll("a");

  // Process the spans
  for (let span of spans) {
    // Remove outdated posts
    if (span.getAttribute("color") === "content" ||
        span.innerText.includes("天前 时间： ") ||
        span.innerText.includes("日 时间： ") ||
        (span.innerText.includes("昨天 时间： ") && span.innerText.split('时间： ')[1].split(':')[0] < 20)) {
      span.parentNode.parentNode.parentNode.remove();
    }
  }

  // Process the divs
  for (let div of divs) {
    // Remove comment-field-box, comment-actions and load more elements
    if (div.getAttribute("data-tag") === "comment-field-box" ||
        div.getAttribute("data-tag") === "comment-actions" ||
        div.innerText === "加载更多") {
      div.parentNode.parentNode.remove();
    }
  }

  // Process the links
  for (let link of links) {
    // Remove comment-avatar-wrapper elements
    if (link.getAttribute("data-tag") === "comment-avatar-wrapper") {
      link.parentNode.remove();
    }
    // Highlight the author's name
    else if (link.getAttribute("data-tag") === "commenter-name" && link.innerText === "贝乐斯 Think Analyze Invest") {
      link.style.color = 'rgb(0, 47, 167)';
    }
  }

  // Process the buttons
  for (let button of buttons) {
    // Remove lock icon, toolbar and header elements
    if (button.innerText === "已解锁" ||
        button.getAttribute("aria-label") === "更多操作" ||
        (button.getAttribute("aria-label") === "筛选条件选项" && button.getAttribute("data-tag") === "menuToggleDiv")) {
      button.remove();
    }
    // Expand content by clicking the button and waiting for a while
    else if (button.innerText === "继续阅读") {
      button.click();
      await sleep(SLEEP_TIME);
    }
    // Uncomment the following lines to click comment and reply buttons as well
    /*
    else if (button.innerText === "加载更多留言") {
      button.click();
      await sleep(SLEEP_TIME / 2.5);
    }
    else if (button.innerText.includes(" 条回复")) {
      button.click();
      await sleep(SLEEP_TIME / 3.75);
    }
    */
  }

  // Increment the counter
  count++;
}

// Set an interval to run the function repeatedly until a limit is reached
setInterval(() => {
  "use strict";
  if (count < 5) {
    processElements();
  }
}, SLEEP_TIME * 1.25);
