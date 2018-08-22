// Update of Daniel Shiffman's (http://natureofcode.com) boids algorithms
// for p5 v0.7.1 and reactjs

export default function boids(p) {
  var flock;

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
    
    flock = new Flock();
    // Add an initial set of boids into the system
    for (var i = 0; i < 100; i++) {
      var b = new Boid(p.width/2,p.height/2);
      flock.addBoid(b);
    }
  }

  p.draw = function() {
    p.clear();
    flock.run();
  }

  // Add a new boid into the System
  p.mouseDragged = function() {
    flock.addBoid(new Boid(p.mouseX,p.mouseY));
  }

  function Flock() {
    // An array for all the boids
    this.boids = []; // Initialize the array
  }

  Flock.prototype.run = function() {
    for (var i = 0; i < this.boids.length; i++) {
      this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
    }
  }

  Flock.prototype.addBoid = function(b) {
    this.boids.push(b);
  }

  // Boid class
  // Methods for Separation, Cohesion, Alignment added

  function Boid(x,y) {
    this.acceleration = p.createVector(0,0);
    this.velocity = p.createVector(p.random(-1,1),p.random(-1,1));
    this.position = p.createVector(x,y);
    this.r = 3.0;
    this.maxspeed = 3;    // Maximum speed
    this.maxforce = 0.05; // Maximum steering force
  }

  Boid.prototype.run = function(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }

  Boid.prototype.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // We accumulate a new acceleration each time based on three rules
  Boid.prototype.flock = function(boids) {
    var sep = this.separate(boids);   // Separation
    var ali = this.align(boids);      // Alignment
    var coh = this.cohesion(boids);   // Cohesion
    // Arbitrarily weight these forces
    sep.mult(1.5);
    ali.mult(1.0);
    coh.mult(1.0);
    // Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

  // Method to update location
  Boid.prototype.update = function() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  Boid.prototype.seek = function(target) {
    var desired = target.sub(this.position);  // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    var steer = desired.sub(this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    return steer;
  }

  Boid.prototype.render = function() {
    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.heading() + p.radians(90);
    p.fill(44, 145, 39);
    p.stroke(20,66,17);
    p.push();
    p.translate(this.position.x,this.position.y);
    p.rotate(theta);
    p.beginShape();
    p.vertex(0, -this.r*2);
    p.vertex(-this.r, this.r*2);
    p.vertex(this.r, this.r*2);
    p.endShape(p.CLOSE);
    p.pop();
  }

  // Wraparound
  Boid.prototype.borders = function() {
    if (this.position.x < -this.r)  this.position.x = p.width +this.r;
    if (this.position.y < -this.r)  this.position.y = p.height+this.r;
    if (this.position.x > p.width +this.r) this.position.x = -this.r;
    if (this.position.y > p.height+this.r) this.position.y = -this.r;
  }

  // Separation
  // Method checks for nearby boids and steers away
  Boid.prototype.separate = function(boids) {
    var desiredseparation = 25.0;
    var steer = p.createVector(0,0);
    var count = 0;
    // For every boid in the system, check if it's too close
    for (var i = 0; i < boids.length; i++) {
      var d = this.position.dist(boids[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        var diff = this.position.sub(boids[i].position);
        diff.normalize();
        diff.div(d);        // Weight by distance
        steer.add(diff);
        count++;            // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  Boid.prototype.align = function(boids) {
    var neighbordist = 50;
    var sum = p.createVector(0,0);
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var d = this.position.dist(boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      var steer = sum.sub(this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return p.createVector(0,0);
    }
  }

  // Cohesion
  // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
  Boid.prototype.cohesion = function(boids) {
    var neighbordist = 50;
    var sum = p.createVector(0,0);   // Start with empty vector to accumulate all locations
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var d = this.position.dist(boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum);  // Steer towards the location
    } else {
      return p.createVector(0,0);
    }
  }
}