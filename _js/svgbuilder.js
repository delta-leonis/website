require('svg.js');
require('svg.easing.js');
import Vivus from 'vivus';

export { illustrate, animate };

const illustrate = (canvas, blueprint = []) => {
  const shapeRef = [];
  const animationRef = {};

  for (const element in blueprint) {
    if (element === 'opt') continue;
    for (const shape in blueprint[element]) {
      const group = drawShapes(canvas, shape, blueprint[element][shape]);
      shapeRef.push({ group });

      if (blueprint[element][shape].opt.animation === 'none') continue;

      const animationName = blueprint[element][shape].opt.animation;
      if (animationRef.hasOwnProperty(animationName)) {
        animationRef[animationName] = pack(animationRef[animationName], group);
        continue;
      }

      animationRef[animationName] = group;
    }
  }
  return {
    canvas,
    shape: shapeRef,
    animation: animationRef,
    vivus: (blueprint.opt && blueprint.opt.vivus) || 'none'
  };
};

const animate = blueprint => {
  const animationRef = {};
  blueprint.canvas.node.style.animation = '';

  if (blueprint.vivus === true) {
    new Vivus(blueprint.canvas.node.id, {
      type: 'delayed',
      duration: 100,
      start: 'autostart',
      animTimingFunction: Vivus.EASE_IN
    });
  }

  executeBlueprintAnimations(blueprint, animationRef);
  return { animationRef, blueprint };
};

const executeBlueprintAnimations = (blueprint, animationRef) => {
  for (const animation in blueprint.animation) {
    executeBlueprintAnimation(blueprint, animation, animationRef);
  }
};

const executeBlueprintAnimation = (blueprint, animation, animationRef) => {
  const innerAnimation = blueprint.animation[animation];
  const animator = new Animator(innerAnimation);
  switch (animation) {
    case 'otherPlayer':
      const otherPlayer = animator.animateOtherPlayer();
      animationRef.otherPlayer = otherPlayer;
      break;
    case 'mainPlayer':
      const mainPlayer = animator.animateMainPlayer();
      animationRef.mainPlayer = mainPlayer;
      break;
    case 'plot':
      const plot = animator.animatePlot();
      animationRef.plot = plot;
      break;
    case 'stars':
      const stars = animator.animateStars(blueprint.canvas.node);
      animationRef.stars = stars;
      break;
    case 'base':
      const base = new Vivus(blueprint.animation[animation].node.id, {
        type: 'sync',
        duration: 50,
        animTimingFunction: Vivus.EASE_OUT
      });
      animationRef.base = base;
      break;
    case 'graph':
      const graph = animator.animateGraph();
      animationRef.graph = graph;
      break;
  }
};

const drawShapes = (canvas, shapeName, { data: shapes, opt }) => {
  return shapes.reduce(
    (group, shape) => group.add(drawFunctions[shapeName](canvas, shape, opt)),
    canvas.group()
  );
};

const drawFunctions = {
  lines: (canvas, line, { stroke }) =>
    canvas.line(line.x, line.y, line.x1, line.y1).stroke(stroke),
  polygons: (canvas, poly, { stroke = 'none', fill = 'none' }) =>
    canvas
      .polygon(poly)
      .stroke(stroke)
      .fill(fill),
  ellipses: (canvas, ellipse, { stroke, fill }) =>
    canvas
      .ellipse()
      .radius(ellipse.rx, ellipse.ry)
      .center(ellipse.cx, ellipse.cy)
      .stroke(stroke)
      .fill(fill),
  paths: (canvas, path, { stroke = 'none', fill = 'none' }) =>
    canvas
      .path(path)
      .stroke(stroke)
      .fill(fill),
  circles: (canvas, circle, { stroke = 'none', fill = 'none' }) => {
    const circleRef = canvas
      .circle(circle.r)
      .stroke(stroke)
      .fill(fill);
    if (circle.hasOwnProperty('cx')) {
      circleRef.center(circle.cx, circle.cy);
    }
    return circleRef;
  }
};

const pack = (oldRef, newRef) => ({
  [oldRef.node.id]: oldRef,
  [newRef.node.id]: newRef
});

const getRandomNum = (min, max) => Math.floor(Math.random() * max) + min;

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

class Animator {
  constructor(animation) {
    this.animation = animation;
  }

  animateOtherPlayer() {
    const animation = this.animation;
    let flip = false;
    for (const group in animation) {
      for (const child of animation[group].children()) {
        child
          .fill('#000000')
          .animate(1000)
          .fill('#fff');
      }
      if (!flip) {
        animation[group]
          .animate(7000, 'swingTo', 500)
          .move(25, -25)
          .loop(true, true);
        flip = true;
      } else {
        animation[group]
          .animate(5000, 'swingTo', 500)
          .move(25, 15)
          .loop(true, true);
      }
    }
    return animation;
  }

  animateMainPlayer() {
    const animation = this.animation;
    animation
      .children()[0]
      .fill('#000')
      .scale(0.1)
      .animate(1500, 'elastic')
      .scale(1)
      .fill('#fff');
    return animation;
  }

  animatePlot() {
    const animation = this.animation;
    for (const child of animation.children()) {
      child
        .fill('#000')
        .animate(1400)
        .fill('#fff');
    }
    animation.animate(3000, 'elastic').skew(10, 0);
    return animation;
  }

  animateStars(id) {
    const animation = this.animation;
    const starRef = {};
    let duration = 16000;
    id.style.animation = 'tilt 2s forwards';
    for (const group in animation) {
      const type = animation[group].children()[0].type;
      const childArray = animation[group].children();
      if (type === 'circle') {
        starRef[type] = {
          sun: childArray.shift(),
          moon: childArray.pop(),
          data: childArray
        };

        for (const child of animation[group].children()) {
          const original = child.attr('r');
          child
            .attr({ r: 0.1 })
            .animate(getRandomNum(1000, 1500), 'elastic')
            .attr({ r: original });
        }
        continue;
      }

      starRef[type] = { moonPath: childArray.pop(), data: childArray };
      for (const child of animation[group].children()) {
        child
          .scale(0.1)
          .stroke({ width: 0, color: '#000000' })
          .animate(getRandomNum(1000, 1500), 'elastic')
          .scale(1)
          .stroke({ width: 0.4, color: '#fff' });
      }
    }
    setTimeout(() => {
      for (let i = 0; i < starRef.circle.data.length; i++) {
        duration += getRandomNum(10000, 25000);
        const length = starRef.path.data[i].length();
        starRef.circle.data[i]
          .animate(duration)
          .during((pos, morph, eased) => {
            const p = starRef.path.data[i].pointAt(eased * length);
            starRef.circle.data[i].center(p.x, p.y);
          })
          .loop(true);

        if (i !== 3) continue;
        starRef.circle.moon
          .animate(8000)
          .during((pos, morph, eased) => {
            const l = starRef.path.moonPath.length();
            const p = starRef.path.moonPath.pointAt(eased * l);
            starRef.circle.moon.center(p.x, p.y);
          })
          .loop(true);
        starRef.path.moonPath
          .animate(duration)
          .during((pos, morph, eased) => {
            const p = starRef.path.data[i].pointAt(eased * length);
            starRef.path.moonPath.center(p.x, p.y);
          })
          .loop(true);
      }
      return animation;
    }, 2500);
  }

  animateGraph() {
    const animation = this.animation;
    const keys = Object.keys(this.animation);
    const lines = animation[keys[0]];
    const paths = animation[keys[1]];

    new Vivus(paths.node.id, {
      type: 'sync',
      duration: 100,
      start: 'autostart',
      animTimingFunction: Vivus.EASE_OUT
    });

    new Vivus(
      lines.node.id,
      {
        type: 'delayed',
        duration: 75,
        start: 'autostart',
        animTimingFunction: Vivus.EASE_OUT
      },
      () => {
        for (const line of lines.children()) {
          line
            .animate(getRandomNum(1000, 3000), '<>', 500)
            .stroke({ width: 2, color: '#333333' })
            .loop(true, true);
        }
        return animation;
      }
    );
  }
}
