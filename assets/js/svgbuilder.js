/**
 *
 * @param canvas
 * @param blueprint
 * @returns {Promise<any | never>}
 */
function illustrator(canvas, blueprint){
  return new Promise(async (resolve, reject) => {
    let shapeRef = [],
        animationRef = {};

    for (element in blueprint) {
      if (element != 'opt') {
        for (shape in blueprint[element]) {
          switch(shape) {
            case 'lines':
              let lineGroup = await drawLine(canvas, blueprint[element][shape]);
              if (blueprint[element][shape].opt.animation !== 'none') {
                let animatioName = blueprint[element][shape].opt.animation;
                if (animationRef.hasOwnProperty(animatioName)) {
                  let packed = await pack(animationRef[animatioName], lineGroup);
                  animationRef[animatioName] = packed;
                } else {
                  animationRef[animatioName] = lineGroup;
                }
              }
              shapeRef.push({lineGroup});
              break;
            case 'polygons':
              let polyGroup = await drawPoly(canvas, blueprint[element][shape]);
              if (blueprint[element][shape].opt.animation !== 'none') {
                let animatioName = blueprint[element][shape].opt.animation;
                if (animationRef.hasOwnProperty(animatioName)) {
                  let packed = await pack(animationRef[animatioName], polyGroup);
                  animationRef[animatioName] = packed;
                } else {
                  animationRef[animatioName] = polyGroup;
                }
              }
              shapeRef.push({polyGroup});
              break;
            case 'ellipses':
              let ellipseGroup = await drawEllipse(canvas, blueprint[element][shape]);
              if (blueprint[element][shape].opt.animation !== 'none') {
                let animatioName = blueprint[element][shape].opt.animation;
                if (animationRef.hasOwnProperty(animatioName)) {
                  let packed = await pack(animationRef[animatioName], ellipseGroup);
                  animationRef[animatioName] = packed;
                } else {
                  animationRef[animatioName] = ellipseGroup;
                }
              }
              shapeRef.push({ellipseGroup});
              break;
            case 'paths':
              let pathGroup = await drawPath(canvas, blueprint[element][shape]);
              if (blueprint[element][shape].opt.animation !== 'none') {
                let animatioName = blueprint[element][shape].opt.animation;
                if (animationRef.hasOwnProperty(animatioName)) {
                  let packed = await pack(animationRef[animatioName], pathGroup);
                  animationRef[animatioName] = packed;
                } else {
                  animationRef[animatioName] = pathGroup;
                }
              }
              shapeRef.push({pathGroup});
              break;
            case 'circles':
              let circleGroup = await drawCircle(canvas, blueprint[element][shape]);
              if (blueprint[element][shape].opt.animation !== 'none') {
                let animatioName = blueprint[element][shape].opt.animation;
                if (animationRef.hasOwnProperty(animatioName)) {
                  let packed = await pack(animationRef[animatioName], circleGroup);
                  animationRef[animatioName] = packed;
                } else {
                  animationRef[animatioName] = circleGroup;
                }
              }
              shapeRef.push({circleGroup});
              break;
            default:
              console.log('unknown shape: ' + shape);
          }
        }
      }
    }
    let returnObj = {
      canvas: canvas,
      shape: shapeRef,
      animation: animationRef,
      vivus: blueprint.opt.vivus || 'none'
    };

    resolve(returnObj)

  }).catch((result) => {
    console.log('error: ' + result);
  })
}
/**
 *
 * @param blueprint
 * @returns {Promise<any | never>}
 */
function animator(blueprint) {
  return new Promise(async (resolve,reject) => {
    let animationRef = {};
    if (blueprint.vivus === true) {
      const myVivus = new Vivus(blueprint.canvas.node.id, {type: 'delayed', duration: 100, animTimingFunction: Vivus.EASE_IN});
    }
    for (animation in blueprint.animation) {
      switch (animation) {
        case 'otherPlayer':
          let otherPlayer = await animateOtherPlayer(blueprint.animation[animation]);
          animationRef.otherPlayer = otherPlayer;
          break;
        case 'mainPlayer':
          let mainPlayer = await animateMainPlayer(blueprint.animation[animation]);
          animationRef.mainPlayer = mainPlayer;
          break;
        case 'plot':
          let plot = await animatePlot(blueprint.animation[animation]);
          animationRef.plot = plot;
          break;
        case 'stars':
          let stars = await animateStars(blueprint.animation[animation]);
          animationRef.stars = stars;
          break;
        case 'base':
          let base = new Vivus(blueprint.animation[animation].node.id, {type: 'sync', duration: 50, animTimingFunction: Vivus.EASE_OUT});
          animationRef.base = base;
          break;
        case 'graph':
          let graph =  await animateGraph(blueprint.animation[animation]);
          animationRef.graph = graph;
          break;
        default:
          reject('unknown animation: ' + animation);
      }
    }
    resolve({animationRef,blueprint});
  }).catch((result) => {
    console.log('error: ' + result);
  })
}

function drawLine(canvas, lines) {
  return new Promise((resolve, reject) => {
    let lineGroup = canvas.group();
    for (line of lines.data) {
      let lineRef = canvas.line(line.x,line.y,line.x1,line.y1).stroke(lines.opt.stroke);
      lineGroup.add(lineRef);
    }
    resolve(lineGroup);
  })
}
function drawPoly(canvas, polys) {
  return new Promise((resolve,reject) => {
    let polyGroup = canvas.group();
    for (poly of polys.data) {
      let polyRef = canvas.polygon(poly).stroke(polys.opt.stroke || 'none').fill(polys.opt.fill || 'none');
      polyGroup.add(polyRef);
    }
    resolve(polyGroup);
  })
}
function drawEllipse(canvas, ellipses) {
  return new Promise((resolve,reject) => {
    let ellipseGroup = canvas.group();
    for (ellipse of ellipses.data) {
      let ellipseRef = canvas.ellipse().radius(ellipse.rx,ellipse.ry).center(ellipse.cx,ellipse.cy).stroke(ellipses.opt.stroke).fill(ellipses.opt.fill);
      ellipseGroup.add(ellipseRef);
    }
    resolve(ellipseGroup);
  })
}
function drawPath(canvas, paths) {
  return new Promise((resolve, reject) => {
    let pathGroup = canvas.group();
    for (path of paths.data) {
      pathRef = canvas.path(path).stroke(paths.opt.stroke || 'none').fill(paths.opt.fill || 'none');
      pathGroup.add(pathRef)
    }
    resolve(pathGroup);
  })
}
function drawCircle(canvas, circles) {
  return new Promise((resolve, reject) => {
    let circleGroup = canvas.group();
    for (circle of circles.data) {
      circleRef = canvas.circle(circle.r).stroke(circles.opt.stroke || 'none').fill(circles.opt.fill || 'none');
      circleGroup.add(circleRef);
      if (circle.hasOwnProperty('cx')) {
        circleRef.center(circle.cx,circle.cy);
      }
    }
    resolve(circleGroup);
  })
}


function pack(oldRef, newRef) {
  return new Promise((resolve,reject) => {
    resolve({[oldRef.node.id]:oldRef, [newRef.node.id]:newRef});
  })
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
  return new Promise((resolve,reject) => {
    let flip = false;
    for (group in target) {
      for (child of target[group].children()) {
        child.fill('#000000').animate(1000).fill('#fff');
      }
      if (!flip) {
        target[group].animate(7000, 'swingTo' , 500).move(25,-25).loop(true,true);
        flip = true;
      } else {
        target[group].animate(5000, 'swingTo' , 500).move(25,15).loop(true,true);
      }
    }
    resolve(target)
  })
}
function animateMainPlayer(target) {
  return new Promise((resolve,reject) => {
    target.children()[0].fill('#000').scale(0.1).animate(1500, 'elastic').scale(1).fill('#fff');
    resolve(target);
  })
}
function animatePlot(target) {
  return new Promise((resolve,reject) => {
    for (child of target.children()) {
      child.fill('#000').animate(1400).fill('#fff');
    }
    target.animate(3000, 'elastic').skew(10, 0);
    resolve(target);
  })
}
function animateStars(target) {
  return new Promise((resolve, reject) => {
    let starRef = {};
    let duration = 16000;
    document.getElementById('drawing').style.animation = 'tilt 2s forwards';
    for (group in target) {
      let type = target[group].children()[0].type;
      let childArray = target[group].children();
      if (type === 'circle') {
        starRef[type] = {sun: childArray.shift(), moon:childArray.pop(), data:childArray};

        for (child of target[group].children()) {
          let original = child.attr('r');
          child.attr({'r': 0.1}).animate(getRandomNum(1000,1500), 'elastic').attr({'r': original});
        }
      } else {
        starRef[type] = {moonPath:childArray.pop(), data:childArray};
        for (child of target[group].children()) {
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
      resolve(target);
    },2500)
  })
}
function animateGraph(target) {
  return new Promise((resolve,reject) => {
    let lines = target[Object.keys(target)[0]];
    let paths = target[Object.keys(target)[1]];
    let vPath = new Vivus(paths.node.id, {type: 'sync', duration: 100, animTimingFunction: Vivus.EASE_OUT});
    let vLine = new Vivus(lines.node.id, {type: 'delayed', duration: 75, animTimingFunction: Vivus.EASE_OUT}, () => {
      for (line of lines.children()) {
        line.animate(getRandomNum(1000,3000),'<>', 500).stroke({width: 2, color: '#333333'}).loop(true,true);
      }
      for (path of paths.children()) {
        //path.animate(1000,'<>', 500).stroke({width: 2, color: '#2e3134'}).loop(true,true);
      }
      resolve(target);
    });
  })
}