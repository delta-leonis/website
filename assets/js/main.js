document.addEventListener("DOMContentLoaded", function() {
  canvas = SVG("svg-container").size("90%", "90%").viewbox(0, 0, 640, 480);

  particlesJS.load("particles-js", "assets/js/vendor/particlesjs-config.json", function() {
    document.getElementById("particles-js").style.animation = "show 3s forwards"
  });

  window.onpopstate = function() { selectPage(canvas, window.location.hash) };
  selectPage(canvas, window.location.hash || "#home");
})

function selectPage(canvas, hash) {
  id = hash.substring(1);

  // remove existing active classes and hide all
  children = document.querySelectorAll(".active");
  for(i = 0; i < children.length; i++) {
    children[i].classList.remove("active");
  }
  children = document.querySelectorAll("#content div");
  for(i = 0; i < children.length; i++) {
    children[i].classList.add("hidden");
  }

  // add .active to the new active item and content
  content = document.getElementById(id)
  content.classList.remove("hidden");
  content.classList.add("active");
  document.querySelector('a[href="' + hash + '"]').parentElement.classList.add("active");

  clearCanvas(canvas);
  animator(illustrator(canvas, window[content.dataset.animation]));
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
