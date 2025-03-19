# Interactive Graphics Projects

Welcome to the comprehensive documentation for the **Interactive Graphics** projects of the *Robotics and Artificial Intelligence Master's Degree* at **La Sapienza of Rome**. This guide covers multiple projects, each designed to explore fundamental and advanced concepts in graphics programming, from alpha compositing and transformations to advanced rendering techniques and physically-based simulations.

---

## Table of Contents

- [Project 1: Alpha Compositing](#project-1-alpha-compositing)
- [Project 2: UAV Transformations](#project-2-uav-transformations)
- [Project 3: 3D Mesh Rendering with WebGL](#project-3-3d-mesh-rendering-with-webgl)
- [Project 4: Shading and Lighting](#project-4-shading-and-lighting)
- [Project 5: GPU-Based Ray Tracing](#project-5-gpu-based-ray-tracing)
- [Project 6: Physically-Based Mass-Spring Simulation](#project-6-mass-spring-simulation)
- [Getting Started](#getting-started)
- [Credits](#credits)
- [License](#license)

---

## Project 1: Alpha Compositing

Implement a JavaScript function to composite a foreground image onto a background image using alpha blending.

### Key Features:
- Alpha blending using foreground opacity
- Handling images with variable dimensions and positions (including negative coordinates)
- Ignoring portions outside the background boundaries

**Function:**
```javascript
function composite(bgImg, fgImg, fgOpac, fgPos)
```

**Files Provided:**
- `project1.html`, `project1.js`
- **Test Images:** `background.png`, `teapot.png`, `u.png`, `star.png`

[**Demo Video**](https://www.youtube.com/watch?v=QpwfzYpseeo)

---

## Project 2: UAV Transformations

Implement transformation matrices to animate a UAV with correctly positioned propellers.

### Required Functions:
- `GetTransform(translation, rotation, scale)`
- `ApplyTransform(transformA, transformB)`

**Files Provided:**
- `project2.html`, `project2.js`
- **UAV Assets:** `uav.png`, `propeller.png`, `shadow.png`, `ground.jpg`

[**Demo**](https://graphics.cs.utah.edu/courses/cs4600/fall2023/?prj=2)

---

## Project 3: 3D Mesh Rendering with WebGL

Render a textured 3D triangular mesh using WebGL.

### Features:
- Model transformations (translation, rotation, perspective projection)
- Mesh rendering (`MeshDrawer` class)
- Texture mapping

**Key Function:**
```javascript
function GetModelViewProjection(projectionMatrix, translationX, translationY, translationZ, rotationX, rotationY)
```

**Files Provided:**
- `project4.html`, `project4.js`, `obj.js`
- **OBJ & Textures:** `teapot.obj`, `bricks.png`, `nyra.obj`, `nyra.png`

[**Demo**](https://graphics.cs.utah.edu/courses/cs4600/fall2023/?prj=4)

---

## Project 4: Shading and Lighting

Enhance rendering using advanced shading techniques with the **Blinn-Phong** model.

### Additional Features:
- Vertex normals
- Directional lighting
- Shininess control

### Key Functions:
```javascript
setMesh(vertPos, texCoords, normals)
setLightDir(x, y, z)
setShininess(shininess)

function GetModelViewMatrix(translationX, translationY, translationZ, rotationX, rotationY)
```

**Files Provided:**
- `project5.html`, `project5.js`, `obj.js`
- **Models:** `teapot.obj`, `nyra.obj`

[**Demo**](https://graphics.cs.utah.edu/courses/cs4600/fall2023/?prj=5)

---

## Project 5: GPU-Based Ray Tracing

Implement GPU-based ray tracing using GLSL shaders to render scenes with spheres and lights.

### Rendering Modes:
- Rasterization (provided)
- Pure Ray Tracing
- Hybrid (Rasterization + Ray Tracing for reflections/shadows)

### GLSL Functions:
- `RayTracer`
- `IntersectRay`
- `Shade`

**Files Provided:**
- `project6.html`, `project6.js`

[**Ray Tracing Demo**](https://graphics.cs.utah.edu/courses/cs4600/fall2023/?prj=6)

---

## Project 6: Mass-Spring Simulation

Implement a physically-based simulation of a mass-spring system, including collision detection and numerical integration.

### Core Function:
```javascript
function SimTimeStep(dt, positions, velocities, springs, stiffness, damping, particleMass, gravity, restitution)
```

### Features:
- Numerical integration (Euler explicit/semi-implicit)
- Collision detection within a bounding box
- Interaction and visualization with WebGL

**Files Provided:**
- `project7.html`, `project7.js`, `obj.js`
- `teapot-low.obj`

[**Simulation Demo**](https://www.youtube.com/watch?v=Kpep7eWHQBM)

---

## Getting Started

### Cloning Repository:
```bash
git clone <repository-url>
cd interactive-graphics-projects
```

### Running Projects:
- Open `.html` files directly in your browser.
- Edit `.js` files to experiment with parameters.
- Press **F4** for fast JavaScript reload and debugging.

### Recommended Tools:
- [Visual Studio Code](https://code.visualstudio.com/)
- Modern browsers (**Chrome recommended**)

---

## Credits

- **Sapienza University of Rome**, Robotics and Artificial Intelligence Master's Course
- Inspired by **University of Utah** Graphics Course
- Special thanks to original creators for demonstrations and initial resources.

---

## License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more details.

