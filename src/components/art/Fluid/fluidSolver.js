// Approximate simulation for Navier-Stokes equations in a confined field
// Ref: Jos Stam, "Real-Time Fluid Dynamics for Games"
//   http://www.dgp.toronto.edu/people/stam/reality/Research/pdf/GDC03.pdf
//
// Author: Jonathan Kay

// Fluid is a collection of fields of size (x+2,y+2) to account for
//   boundary cells

class fluidSolver {
  constructor(size, diffusion, viscosity, dt) {
    this.size = size;
    this.dt = dt;
    this.diffusion = diffusion;
    this.viscosity = viscosity;

    this.dyeDensity = [];
    this.velocityX = [];
    this.velocityY = [];

    this.dyeDensityPrev = [];
    this.velocityXPrev = [];
    this.velocityYPrev = [];

    let area = (this.size+2)*(this.size+2);
    for (let i = 0; i < area; i++) {
      this.dyeDensity.push(0);
      this.velocityX.push(0);
      this.velocityY.push(0);
    }
    console.log("VelocityX in constructor: " + this.velocityX);
  }

  // Adds dye density
  addSource(x, s) {
    let N = this.size;
    let area = (N+2)*(N+2);
    let dt = this.dt;

    for (let i = 0; i < area; i++) {
      x[i] += dt * s[i];
    }
  }

  addVelocity(x,y,deltaVelocityX,deltaVelocityY) {
    this.velocityX[this.I(x,y)] += deltaVelocityX;
    this.velocityY[this.I(x,y)] += deltaVelocityY;
  }

  // Moves velocity/dye according to nearby velocities
  advect(b, d, d0, u, v) {
    let N = this.size;
    let dt = this.dt;
    let dt0 = dt * N;
    let x, y, i0, i1, j0, j1, s0, s1, t0, t1;

    for (let i=1; i<=N; i++ ) {
      for (let j=1; j<=N; j++ ) {
        x = i-dt0*u[this.I(i,j)];
        y = i-dt0*v[this.I(i,j)];

        if (x<0.5) x=0.5;
        if (x>N+0.5) x=N+0.5;
        i0 = Math.floor(x);
        i1 = i0+1;

        if (y<0.5) y=0.5;
        if (y>N+0.5) y=N+0.5;
        j0 = Math.floor(y);
        j1 = i0+1;

        s1 = x-i0;
        s0 = 1-s1;
        t1 = y-j0;
        t0 = 1-t1;
        d[this.I(i,j)] = s0 * (t0*d0[this.I(i0, j0)] + t1*d0[this.I(i0, j1)]) +
                         s1 * (t0*d0[this.I(i1, j0)] + t1*d0[this.I(i1, j1)]);
      }
    }
    this.setBound(b, d);
  }

  // Moves velocity/dye according to diffusion coefficient
  diffuse(b, values, values0, diff) {
    let N = this.size;
    let dt = this.dt;

    let a = dt * diff * N * N;

    for (let k = 0; k < 20; k++) {
      for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
          values[this.I(i,j)] = (
                                  values0[this.I(i,j)] +
                                  a * ( 
                                        values[this.I(i-1,j)] +
                                        values[this.I(i+1,j)] +
                                        values[this.I(i,j-1)] +
                                        values[this.I(i,j+1)]
                                      )
                                ) / (1+4*a);
        }
      }
    }
    this.setBound(b, values);
  }

  /**
   * Ensure no cell has a net inflow or outflow using Hodge decomposition
   *
   * @param x X component of final velocity
   * @param y Y component of final velocity
   * @param p Temporary array
   * @param div Temporary array to hold velocity divergence field
   */
  project(x, y, p, div) {
    let N = this.size;
    let h = 1/N;

    for (let i = 0; i <= N; i++) {
      for (let j = 0; j<= N; j++) {
        div[this.I(i,j)] = -0.5 * h * ( x[this.I(i+1,  j)] -
                                        x[this.I(i-1,  j)] +
                                        y[this.I(i,  j+1)] -
                                        y[this.I(i,  j-1)]);
        p[this.I(i,j)] = 0;
      }
    }
    this.setBound(0, div);
    this.setBound(0, p);

    for (let k = 0; k < 20; k++) {
      for (let i = 0; i <= N; i++) {
        for (let j = 0; j <= N; j++) {
          p[this.I(i,j)] = (div[this.I(i,    j)] +
                              p[this.I(i-1,  j)] +
                              p[this.I(i+1,  j)] +
                              p[this.I(i,  j-1)] + 
                              p[this.I(i,  j+1)]) / 4;
        }
      }
    }
    this.setBound(0, p);

    for (let i = 0; i <= N; i++) {
      for (let j = 0; j<= N; j++) {
        x[this.I(i,j)] -= 0.5 * (p[this.I(i+1,  j)] - p[this.I(i-1,  j)]) / h;
        y[this.I(i,j)] -= 0.5 * (p[this.I(i,  j+1)] - p[this.I(i,  j-1)]) / h;
      }
    }
    this.setBound(1, x);
    this.setBound(2, y);
  }

  // Manage wall behavior
  setBound(b, values) {
    let N = this.size;
    for (let i=1 ; i<=N ; i++ ) {
      values[this.I(0,   i)] = b === 1 ? -values[this.I(1,i)] : values[this.I(1,i)];
      values[this.I(N+1, i)] = b === 1 ? -values[this.I(N,i)] : values[this.I(N,i)];
      values[this.I(i,   0)] = b === 2 ? -values[this.I(i,1)] : values[this.I(i,1)];
      values[this.I(i, N+1)] = b === 2 ? -values[this.I(i,N)] : values[this.I(i,N)];
    }
    values[this.I(0,   0  )] = 0.5 * (values[this.I(1, 0  )] + values[this.I(0,   1)]);
    values[this.I(0,   N+1)] = 0.5 * (values[this.I(1, N+1)] + values[this.I(0,   N)]);
    values[this.I(N+1, 0  )] = 0.5 * (values[this.I(N, 0  )] + values[this.I(N+1, 1)]);
    values[this.I(N+1, N+1)] = 0.5 * (values[this.I(N, N+1)] + values[this.I(N+1, N)]);
  }

  // Density Step
  // Assume source densities contained in values0
  densityStep(values, values0, u, v) {
    let diff = this.diffusion;

    this.addSource(values, values0);
    [values, values0] = this.swap(values, values0, diff);
    this.diffuse(0, values, values0);
    [values, values0] = this.swap(values, values0, diff);
    this.advect(0, values, values0, u, v);
  }

  // Velocity Step
  // Assume source velocities contained in u0, v0
  velocityStep(u, v, u0, v0) {
    let visc = this.viscosity;

    this.addSource(u, u0);
    this.addSource(v, v0);

    [u, u0] = this.swap(u, u0);
    [v, v0] = this.swap(v, v0);
    this.diffuse(1, u, u0, visc);
    this.diffuse(2, v, v0, visc);
    this.project(u, v, u0, v0);

    [u, u0] = this.swap(u, u0);
    [v, v0] = this.swap(v, v0);
    this.advect(1, u, u0, u0, v0);
    this.advect(2, v, v0, u0, v0);
    this.project(u, v, u0, v0);
  }

  // Main loop
  step() {
    let dens_prev = this.dyeDensityPrev;
    let u_prev = this.velocityXPrev;
    let v_prev = this.velocityYPrev;
    let u = this.velocityX;
    let v = this.velocityY;
    let dens = this.dyeDensity;
    console.log("VelocityX in step: " + u);

    this.velocityStep(u, v, u_prev, v_prev);
    this.densityStep(dens, dens_prev);
    return(dens);
  }

  // Utility Methods

  //  Makes clear we're swapping the references to arrays
  //    Usage: [x,x0] = swap(x,x0)
  swap(v, v0) {return [v0,v];}

  // Helps index 1d arrays as if they're two dimensional
  I(i, j){return i+(this.size + 2)*j;}
}

export default fluidSolver;