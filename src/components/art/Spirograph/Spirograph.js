export default function spirograph(p) {
  var NUMSINES = 20;
  var sines = new Array(NUMSINES);
  var rad;
  var i;

  var fund = 0.005; // animation speed
  var ratio = 1; // how much faster are subsequent spirals
  var alpha = 50;

  var trace = false;

  p.setup = function() {
    p.createCanvas(window.innerWidth*0.75, window.innerHeight*0.75);
    
    let pseudo_diameter = (window.innerWidth < window.innerHeight*0.75) ? window.innerWidth*0.75 : window.innerHeight*0.75;
    rad = pseudo_diameter/4;
    p.clear();

    for (var i = 0; i<sines.length; i++) {
      sines[i] = p.PI;
    }
  }

  p.draw = function() {
    if (!trace) {
      p.clear();
      p.stroke(0, 26, 132, 219);
      p.noFill();
    } 

    p.push();
    p.translate(p.width/2, p.height/2);

    for (var i = 0; i<sines.length; i++) {
      var erad = 0;

      if (trace) {
        p.stroke(0, 0, 255*(p.float(i)/sines.length), alpha);
        p.fill(0, 0, 255, alpha/2);
        erad = 5.0*(1.0-p.float(i)/sines.length);
      }
      var radius = rad/(i+1);
      p.rotate(sines[i]);
      if (!trace) p.ellipse(0, 0, radius*2, radius*2);
      p.push();
      p.translate(0, radius);
      if (!trace) p.ellipse(0, 0, 5, 5);
      if (trace) p.ellipse(0, 0, erad, erad);
      p.pop();
      p.translate(0, radius);
      sines[i] = (sines[i]+(fund+(fund*i*ratio)))%p.TWO_PI;
    }
    
    p.pop();
    
  }

  p.keyReleased = function () {
    if (p.key==' ') {
      trace = !trace; 
      p.clear();
    }
  }
}