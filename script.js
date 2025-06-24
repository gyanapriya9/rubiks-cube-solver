class RubiksCube {
  constructor() {
    // Each face has 9 stickers, initialized with their respective colors
    this.faces = {
      U: Array(9).fill('w'), // Up (white)
      D: Array(9).fill('y'), // Down (yellow)
      F: Array(9).fill('g'), // Front (green)
      B: Array(9).fill('b'), // Back (blue)
      L: Array(9).fill('o'), // Left (orange)
      R: Array(9).fill('r')  // Right (red)
    };

    this.movesLog = []; // To track rotations for solving
  }

  // Rotates a face 90° clockwise
  rotateFaceClockwise(faceArray) {
    const [a, b, c, d, e, f, g, h, i] = faceArray;
    return [g, d, a, h, e, b, i, f, c];
  }

  // Rotates a face 90° counter-clockwise
  rotateFaceCounterClockwise(faceArray) {
    const [a, b, c, d, e, f, g, h, i] = faceArray;
    return [c, f, i, b, e, h, a, d, g];
  }

  // Display the cube's state 
  display() {
    // Converting all face arrays into a single string
    const cubeStr = Object.values(this.faces)
      .map(face => face.join(''))
      .join('');
    
    document.getElementById("cubeDisplay").innerText = cubeStr;
  }

  // Rotating a face and update adjacent pieces
  rotate(face, clockwise = true) {
    this.movesLog.push({ face, clockwise }); // Log the move for later solving
    
    // Rotate UP face
    if (face === 'U') {
      // 1. Rotate the U face itself
      this.faces.U = clockwise
        ? this.rotateFaceClockwise(this.faces.U)
        : this.rotateFaceCounterClockwise(this.faces.U);

      // 2. Rotate the top rows of adjacent faces: L, F, R, B
      const { L, F, R, B } = this.faces;

      if (clockwise) {
        const temp = [L[0], L[1], L[2]];
        [L[0], L[1], L[2]] = [B[0], B[1], B[2]];
        [B[0], B[1], B[2]] = [R[0], R[1], R[2]];
        [R[0], R[1], R[2]] = [F[0], F[1], F[2]];
        [F[0], F[1], F[2]] = temp;
      } else {
        const temp = [L[0], L[1], L[2]];
        [L[0], L[1], L[2]] = [F[0], F[1], F[2]];
        [F[0], F[1], F[2]] = [R[0], R[1], R[2]];
        [R[0], R[1], R[2]] = [B[0], B[1], B[2]];
        [B[0], B[1], B[2]] = temp;
      }
    }

    // Rotate FRONT face
    else if (face === 'F') {
      // 1. Rotate the F face itself
      this.faces.F = clockwise
        ? this.rotateFaceClockwise(this.faces.F)
        : this.rotateFaceCounterClockwise(this.faces.F);

      // 2. Rotate the edge rows of U, R, D, L (front-facing edges)
      const { U, R, D, L } = this.faces;

      if (clockwise) {
        const temp = [U[6], U[7], U[8]];
        [U[6], U[7], U[8]] = [L[8], L[5], L[2]];
        [L[8], L[5], L[2]] = [D[2], D[1], D[0]];
        [D[2], D[1], D[0]] = [R[0], R[3], R[6]];
        [R[0], R[3], R[6]] = temp;
      } else {
        const temp = [U[6], U[7], U[8]];
        [U[6], U[7], U[8]] = [R[0], R[3], R[6]];
        [R[0], R[3], R[6]] = [D[2], D[1], D[0]];
        [D[2], D[1], D[0]] = [L[8], L[5], L[2]];
        [L[8], L[5], L[2]] = temp;
      }
    }

    this.display(); // Updating the screen
  }

  // Randomly scramble the cube by rotating random faces
  scramble(times = 10) {
    const faces = ['U', 'D', 'F', 'B', 'L', 'R'];
    for (let i = 0; i < times; i++) {
      const face = faces[Math.floor(Math.random() * faces.length)];
      const clockwise = Math.random() > 0.5;
      this.rotate(face, clockwise);
    }
    this.display();
  }

  // Solving the cube by reversing the move log
  solve() {
    for (let i = this.movesLog.length - 1; i >= 0; i--) {
      const { face, clockwise } = this.movesLog[i];
      this.rotate(face, !clockwise); // Reverse the move
    }
    this.display();
  }

  //Resetting the cube to original state
  reset() {
    this.faces = {
      U: Array(9).fill('w'),
      D: Array(9).fill('y'),
      F: Array(9).fill('g'),
      B: Array(9).fill('b'),
      L: Array(9).fill('o'),
      R: Array(9).fill('r')
    };
    this.movesLog = [];
    this.display();
  }
}

// for testing object accessible globally in browser console
window.cube = new RubiksCube();
