function illustrator(canvas, blueprint){
  let shapeRef = [],
      animationRef = {};

  for (let element in blueprint) {
      if (element !== 'opt') {
          for (let shape in blueprint[element]) {
              switch(shape) {
                  case 'lines':
                      let lineGroup = drawLine(canvas, blueprint[element][shape]);
                      if (blueprint[element][shape].opt.animation !== 'none') {
                          let animationName = blueprint[element][shape].opt.animation;
                          if (animationRef.hasOwnProperty(animationName)) {
                              animationRef[animationName] = pack(animationRef[animationName], lineGroup);
                          } else {
                              animationRef[animationName] = lineGroup;
                          }
                      }
                      shapeRef.push({lineGroup});
                      break;
                  case 'polygons':
                      let polyGroup = drawPoly(canvas, blueprint[element][shape]);
                      if (blueprint[element][shape].opt.animation !== 'none') {
                          let animationName = blueprint[element][shape].opt.animation;
                          if (animationRef.hasOwnProperty(animationName)) {
                              animationRef[animationName] = pack(animationRef[animationName], polyGroup);
                          } else {
                              animationRef[animationName] = polyGroup;
                          }
                      }
                      shapeRef.push({polyGroup});
                      break;
                  case 'ellipses':
                      let ellipseGroup = drawEllipse(canvas, blueprint[element][shape]);
                      if (blueprint[element][shape].opt.animation !== 'none') {
                          let animationName = blueprint[element][shape].opt.animation;
                          if (animationRef.hasOwnProperty(animationName)) {
                              animationRef[animationName] = pack(animationRef[animationName], ellipseGroup);
                          } else {
                              animationRef[animationName] = ellipseGroup;
                          }
                      }
                      shapeRef.push({ellipseGroup});
                      break;
                  case 'paths':
                      let pathGroup = drawPath(canvas, blueprint[element][shape]);
                      if (blueprint[element][shape].opt.animation !== 'none') {
                          let animationName = blueprint[element][shape].opt.animation;
                          if (animationRef.hasOwnProperty(animationName)) {
                              animationRef[animationName] = pack(animationRef[animationName], pathGroup);
                          } else {
                              animationRef[animationName] = pathGroup;
                          }
                      }
                      shapeRef.push({pathGroup});
                      break;
                  case 'circles':
                      let circleGroup = drawCircle(canvas, blueprint[element][shape]);
                      if (blueprint[element][shape].opt.animation !== 'none') {
                          let animationName = blueprint[element][shape].opt.animation;
                          if (animationRef.hasOwnProperty(animationName)) {
                              animationRef[animationName] = pack(animationRef[animationName], circleGroup);
                          } else {
                              animationRef[animationName] = circleGroup;
                          }
                      }
                      shapeRef.push({circleGroup});
                      break;
              }
          }
      }
  }
  return {
      canvas: canvas,
      shape: shapeRef,
      animation: animationRef,
      vivus: blueprint.opt.vivus || 'none'
  };
}

function animator(blueprint) {
  let animationRef = {};
  blueprint.canvas.node.style.animation = '';
  if (blueprint.vivus === true) {
      const myVivus = new Vivus(blueprint.canvas.node.id, {type: 'delayed', duration: 100, start: 'autostart', animTimingFunction: Vivus.EASE_IN});
  }
  for (let animation in blueprint.animation) {
      switch (animation) {
          case 'otherPlayer':
              let otherPlayer = animateOtherPlayer(blueprint.animation[animation]);
              animationRef.otherPlayer = otherPlayer;
              break;
          case 'mainPlayer':
              let mainPlayer = animateMainPlayer(blueprint.animation[animation]);
              animationRef.mainPlayer = mainPlayer;
              break;
          case 'plot':
              let plot = animatePlot(blueprint.animation[animation]);
              animationRef.plot = plot;
              break;
          case 'stars':
              let stars = animateStars(blueprint.animation[animation], blueprint.canvas.node);
              animationRef.stars = stars;
              break;
          case 'base':
              let base = new Vivus(blueprint.animation[animation].node.id, {type: 'sync', duration: 50, animTimingFunction: Vivus.EASE_OUT});
              animationRef.base = base;
              break;
          case 'graph':
              let graph =  animateGraph(blueprint.animation[animation]);
              animationRef.graph = graph;
              break;
      }
  }
  return {animationRef,blueprint};
}

function drawLine(canvas, lines) {
  let lineGroup = canvas.group();
  for (let line of lines.data) {
      let lineRef = canvas.line(line.x,line.y,line.x1,line.y1).stroke(lines.opt.stroke);
      lineGroup.add(lineRef);
  }
  return lineGroup
}

function drawPoly(canvas, polys) {
  let polyGroup = canvas.group();
  for (let poly of polys.data) {
      let polyRef = canvas.polygon(poly).stroke(polys.opt.stroke || 'none').fill(polys.opt.fill || 'none');
      polyGroup.add(polyRef);
  }
  return polyGroup
}

function drawEllipse(canvas, ellipses) {
  let ellipseGroup = canvas.group();
  for (let ellipse of ellipses.data) {
      let ellipseRef = canvas.ellipse().radius(ellipse.rx,ellipse.ry).center(ellipse.cx,ellipse.cy).stroke(ellipses.opt.stroke).fill(ellipses.opt.fill);
      ellipseGroup.add(ellipseRef);
  }
  return ellipseGroup
}

function drawPath(canvas, paths) {
  let pathGroup = canvas.group();
  for (let path of paths.data) {
      let pathRef = canvas.path(path).stroke(paths.opt.stroke || 'none').fill(paths.opt.fill || 'none');
      pathGroup.add(pathRef)
  }
  return pathGroup
}

function drawCircle(canvas, circles) {
  let circleGroup = canvas.group();
  for (let circle of circles.data) {
      let circleRef = canvas.circle(circle.r).stroke(circles.opt.stroke || 'none').fill(circles.opt.fill || 'none');
      circleGroup.add(circleRef);
      if (circle.hasOwnProperty('cx')) {
          circleRef.center(circle.cx,circle.cy);
      }
  }
  return circleGroup
}

function pack(oldRef, newRef) {
  return {[oldRef.node.id]:oldRef, [newRef.node.id]:newRef}
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * max) + min
}

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function animateOtherPlayer(target) {
  let flip = false;
  for (let group in target) {
      for (let child of target[group].children()) {
          child.fill('#000000').animate(1000).fill('#fff');
      }
      if (!flip) {
          target[group].animate(7000, 'swingTo' , 500).move(25,-25).loop(true,true);
          flip = true;
      } else {
          target[group].animate(5000, 'swingTo' , 500).move(25,15).loop(true,true);
      }
  }
  return target
}

function animateMainPlayer(target) {
  target.children()[0].fill('#000').scale(0.1).animate(1500, 'elastic').scale(1).fill('#fff');
  return target
}

function animatePlot(target) {
  for (let child of target.children()) {
      child.fill('#000').animate(1400).fill('#fff');
  }
  target.animate(3000, 'elastic').skew(10, 0);
  return target
}

function animateStars(target, id) {
  let starRef = {};
  let duration = 16000;
  id.style.animation = 'tilt 2s forwards';
  for (let group in target) {
      let type = target[group].children()[0].type;
      let childArray = target[group].children();
      if (type === 'circle') {
          starRef[type] = {sun: childArray.shift(), moon:childArray.pop(), data:childArray};

          for (let child of target[group].children()) {
              let original = child.attr('r');
              child.attr({'r': 0.1}).animate(getRandomNum(1000,1500), 'elastic').attr({'r': original});
          }
      } else {
          starRef[type] = {moonPath:childArray.pop(), data:childArray};
          for (let child of target[group].children()) {
              child.scale(0.1).stroke({width:0, color: '#000000'}).animate(getRandomNum(1000,1500), 'elastic').scale(1).stroke({width:0.4, color: '#fff'});
          }
      }
  }
  setTimeout(() => {
      for (let i = 0; i < starRef.circle.data.length; i++) {
          duration += getRandomNum(10000,25000);
          let length = starRef.path.data[i].length();
          starRef.circle.data[i].animate(duration).during((pos, morph, eased) =>{
              let p = starRef.path.data[i].pointAt(eased * length);
              starRef.circle.data[i].center(p.x, p.y);
          }).loop(true);
          if (i === 3) {

              starRef.circle.moon.animate(8000).during((pos, morph, eased) => {
                  let l = starRef.path.moonPath.length();
                  let p = starRef.path.moonPath.pointAt(eased * l);
                  starRef.circle.moon.center(p.x, p.y);
              }).loop(true);
              starRef.path.moonPath.animate(duration).during((pos, morph, eased) => {
                  let p = starRef.path.data[i].pointAt(eased * length);
                  starRef.path.moonPath.center(p.x, p.y);
              }).loop(true);
          }
      }
      return target
  },2500)
}

function animateGraph(target) {
  let lines = target[Object.keys(target)[0]];
  let paths = target[Object.keys(target)[1]];
  let vPath = new Vivus(paths.node.id, {type: 'sync', duration: 100, start: 'autostart', animTimingFunction: Vivus.EASE_OUT});
  let vLine = new Vivus(lines.node.id, {type: 'delayed', duration: 75, start: 'autostart', animTimingFunction: Vivus.EASE_OUT}, () => {
      for (let line of lines.children()) {
          line.animate(getRandomNum(1000,3000),'<>', 500).stroke({width: 2, color: '#333333'}).loop(true,true);
      }
      return target
  });
}
