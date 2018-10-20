const blueprint = require('./blueprint.json');
require('particles.js');
import { animate, illustrate } from './svgbuilder';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = SVG('svg-container')
    .size('90%', '90%')
    .viewbox(0, 0, 640, 480);

  particlesJS.load(
    'particles-js',
    './assets/particlesjs.json',
    () =>
      (document.getElementById('particles-js').style.animation =
        'show 2s forwards')
  );

  window.onpopstate = () => selectPage(canvas, window.location.hash);
  selectPage(canvas, window.location.hash);
});

const selectPage = (canvas, hash) => {
  const container =
    document.getElementById(hash.substring(1)) ||
    document.getElementById('home');
  const id = container.id;

  if (container.classList.contains('active')) return;

  // remove existing active classes and hide all
  for (const element of document.querySelectorAll('.active')) {
    element.classList.remove('active');
  }

  for (const element of document.querySelectorAll('#content div')) {
    element.classList.add('hidden');
  }

  // add .active to the new active item and content
  const content = document.getElementById(id);
  content.classList.remove('hidden');
  content.classList.add('active');
  document
    .querySelector('a[href="#' + id + '"]')
    .parentElement.classList.add('active');

  clearCanvas(canvas);
  animate(illustrate(canvas, blueprint[content.dataset.animation]));
}

const clearCanvas = (draw) => {
  draw.each(function() {
    this.removeClass('*');
    this.off();
    this.stop();
  }, true);
  draw.ungroup();
  draw.clear();
};
