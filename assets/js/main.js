document.addEventListener("DOMContentLoaded", () => {
  canvas = SVG("svg-container").size("90%", "90%").viewbox(0, 0, 640, 480);

  particlesJS.load("particles-js", "assets/js/vendor/particlesjs-config.json", () =>
      document.getElementById("particles-js").style.animation = "show 3s forwards"
  );

  window.onpopstate = () => selectPage(canvas, window.location.hash);
  selectPage(canvas, window.location.hash);
});

function selectPage(canvas, hash) {
  id = hash.substring(1);

  if(container = document.getElementById(id)) {
    if(container.classList.contains('active')) {
      return;
    }
  } else {
    id = 'home';
  }

  // remove existing active classes and hide all
  for(element of document.querySelectorAll(".active")) {
    element.classList.remove("active");
  }
  for(element of document.querySelectorAll("#content div")){
    element.classList.add("hidden");
  }

  // add .active to the new active item and content
  content = document.getElementById(id)
  content.classList.remove("hidden");
  content.classList.add("active");
  document.querySelector('a[href="#' + id + '"]').parentElement.classList.add("active");

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
