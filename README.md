# 🚀 Interactive Graphics Projects

Welcome to the comprehensive documentation for the **Interactive Graphics** projects of the *Robotics and Artificial Intelligence Master's Degree* at **La Sapienza, Rome**. 🎓  

This guide covers multiple projects, each designed to explore fundamental and advanced concepts in graphics programming—from alpha compositing and transformations to advanced rendering techniques and physically-based simulations.

---

## 📚 Table of Contents

- [🖼️ Project 1: Alpha Compositing](#-project-1-alpha-compositing)
- [🚁 Project 2: UAV Transformations](#project-2-uav-transformations)
- [📐 Project 3: Triangular Meshes](#project-3-triangular-meshes)
- [🎨 Project 4: Shading](#project-4-shading)
- [🌈 Project 5: Ray Tracing](#project-5-ray-tracing)
- [🎳 Project 6: Mass-Spring Simulation](#project-6-mass-spring-simulation)
- [🚦 Getting Started](#getting-started)
- [📌 Credits](#credits)
- [📝 License](#license)

---

## 🖼️ Project 1: Alpha Compositing

In this project we will implement an alpha compositing function for raster images using JavaScript.

You're given an HTML file that implements a simple web-based image compositing application. Video demonstration:

▶️ [Watch Video](https://youtu.be/QpwfzYpseeo)

You'll implement the JavaScript function:

```javascript
function composite(bgImg, fgImg, fgOpac, fgPos)
```

- **bgImg:** background image to modify.
- **fgImg:** foreground image to composite onto background.
- **fgOpac:** opacity of foreground image.
- **fgPos:** position `{x, y}` of the foreground image; can be negative.

The function modifies the background image directly and ignores out-of-bound portions.

### 📂 Files Provided:

- **`project1.html`**  
- **`project1.js`** *(placeholder)*
- Images: `background.png`, `teapot.png`, `u.png`, `star.png`

💡 **Tip**: Press **F4** to reload your script without refreshing the entire page.

---

## 🚁 Project 2: UAV Transformations

Implement UAV transformations using JavaScript.

**Functions to implement:**
```javascript
function GetTransform(positionX, positionY, rotation, scale)
function ApplyTransform(trans1, trans2)
```

Transformations apply in order: scale → rotation → translation.

### 📂 Files Provided:

- **`project2.html`**  
- **`project2.js`** *(placeholder)*
- Images: `uav.png`, `propeller.png`, `shadow.png`, `ground.jpg` *(image by Giles Hodges)*

💡 **Tips**:
- Press **F4** for quick reloads.
- Debug using Visual Studio Code.

▶️ [Demo](https://graphics.cs.utah.edu/courses/cs4600/fall2023/?prj=2)

---

## 📐 Project 3: Triangular Meshes

Implement transformations and textured mesh rendering with WebGL.

### Steps:
1. `GetModelViewProjection(projectionMatrix, translationX, translationY, translationZ, rotationX, rotationY)`
2. Render mesh (`MeshDrawer` class)
3. Display texture on mesh.

### 📂 Files Provided:

- **`project4.html`**, **`project4.js`**, **`obj.js`**
- OBJ and textures: `teapot.obj`, `bricks.png`, `nyra.obj`, `nyra.png`

🎬 [Demo & Instructions](https://graphics.cs.utah.edu/courses/cs4600/fall2023/?prj=4)

---

## 🎨 Project 4: Shading

Enhance your previous mesh renderer with shading (Blinn material model).

### Additional methods:
- `setMesh(vertPos, texCoords, normals)`
- `draw(matrixMVP, matrixMV, matrixNormal)`
- `setLightDir(x, y, z)`
- `setShininess(shininess)`
- `GetModelViewMatrix(translationX, translationY, translationZ, rotationX, rotationY)`

### 📂 Files Provided:

- **`project5.html`**, **`project5.js`**, **`obj.js`**

💡 **Shading**:
- Directional white light `(1,1,1)`
- Optional ambient lighting
- Adjustable shininess
- Texture replaces diffuse color (`Kd`) if enabled

📹 [Demo](https://graphics.cs.utah.edu/courses/cs4600/fall2023/?prj=5)

---

## 🌈 Project 5: Ray Tracing

Implement GPU-based ray tracing (GLSL shaders) to render realistic scenes of spheres and point lights.

### GLSL Functions:
- `RayTracer`
- `IntersectRay`
- `Shade`

**Rendering Modes**:
- Rasterization (provided)
- Ray Tracing *(your implementation)*
- Hybrid (Rasterization + Ray Tracing reflections & shadows)

### 📂 Files Provided:

- **`project6.html`**, **`project6.js`** *(GLSL placeholders)*

💡 **Tip**: Press **F4** to reload GLSL code quickly.

📹 [Demo](https://graphics.cs.utah.edu/courses/cs4600/fall2023/?prj=6)

---

## 🌈 Project 5: Ray Tracing *(described above)*

---

## 🎳 Project 6: Mass-Spring Simulation

Physically-based simulation using mass-spring systems.

Implement numerical integration (`Euler explicit/semi-implicit`) and collisions in a bounding cube from `-1` to `1`.

```javascript
function SimTimeStep(dt, positions, velocities, springs, stiffness, damping, particleMass, gravity, restitution)
```

### 📂 Files Provided:

- **`project7.html`**, **`project7.js`** *(placeholders provided)*
- **`obj.js`** *(updated)*
- Model: `teapot-low.obj`

Class provided: **`Vec3`**  
*(with standard vector algebra methods: `add`, `sub`, `dot`, `cross`, `scale`, etc.)*

📹 [Demo](https://www.youtube.com/watch?time_continue=187&v=Kpep7eWHQBM)

---

## 🚦 Getting Started

Clone the repository and place all files in the same directory.

### Quick testing:
- Open HTML files directly in your browser.
- Press **F4** to reload JS scripts quickly.

### Recommended tools:
- 🖥️ [Visual Studio Code](https://code.visualstudio.com/)
- Modern browser (Chrome recommended)

---

## 📌 Credits

- **Sapienza University of Rome** – Robotics and Artificial Intelligence Master's Degree
- Inspired by University of Utah graphics projects
- Special thanks to the original creators

---

## 📝 License

Distributed under the **MIT License**. See `LICENSE` for details.

---

🌟 **Happy coding and exploring!**
