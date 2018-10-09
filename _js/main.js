var blueprint = require('/blueprint.json');
require('particles.js');
import { animator, illustrator } from './svgbuilder';

document.addEventListener("DOMContentLoaded", () => {
  let canvas = SVG("svg-container").size("90%", "90%").viewbox(0, 0, 640, 480);

  particlesJS.load("particles-js", "./assets/particlesjs.json", () =>
    document.getElementById("particles-js").style.animation = "show 2s forwards");

  window.onpopstate = () => selectPage(canvas, window.location.hash);
  selectPage(canvas, window.location.hash);
});

function selectPage(canvas, hash) {
  let container = document.getElementById(hash.substring(1)) || document.getElementById("home");
  let id = container.id;
  if (container.classList.contains("active")) return;

  // remove existing active classes and hide all
  for (let element of document.querySelectorAll(".active")) {
    element.classList.remove("active");
  }
  for (let element of document.querySelectorAll("#content div")) {
    element.classList.add("hidden");
  }

  // add .active to the new active item and content
  let content = document.getElementById(id);
  content.classList.remove("hidden");
  content.classList.add("active");
  document.querySelector("a[href=\"#" + id + "\"]").parentElement.classList.add("active");

  clearCanvas(canvas);
  animator(illustrator(canvas, blueprint[content.dataset.animation]));
}

function clearCanvas(draw) {
  draw.each(function() {
    this.removeClass("*");
    this.off();
    this.stop();
  }, true);
  draw.ungroup();
  draw.clear();
}
