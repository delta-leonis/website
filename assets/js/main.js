document.addEventListener('DOMContentLoaded', async () => {
  canvas = SVG('svg-container').size('90%', '90%').viewbox(0,0,640,480);

  particlesJS.load('particles-js', 'assets/js/vendor/particlesjs-config.json', () => {
      document.getElementById('particles-js').style.animation = 'show 3s forwards'
  });

  window.onpopstate = () => selectPage(canvas, window.location.hash);
  selectPage(canvas, window.location.hash || '#home');
});

function selectPage(canvas, hash) {
id = hash.substring(1);

// remove existing active classes and hide all
document.querySelectorAll('.active').forEach(element => element.classList.remove('active'));
document.querySelectorAll('#content div').forEach(element => element.classList.add('hidden'));

// add .active to the new active item and content
document.getElementById(id).classList.remove('hidden');
document.getElementById(id).classList.add('active');
document.querySelector('a[href="' + hash + '"]').parentElement.classList.add('active');

// select animation if available
clearCanvas(canvas)
if(animation = getAnimation(id)) {
  animator(illustrator(canvas, animation));
}
}

function getAnimation(id) {
return {
  home: soccerPitch,
  zosma: starSystem,
  algieba: graph,
}[id];
}

function clearCanvas(draw){
  draw.each(function() {
      this.removeClass('*');
      this.off();
      this.stop();
  }, true);
  draw.ungroup();
  draw.clear();
}
