# 🌈 Project 5: GPU Ray Tracing

In this project we will implement a software ray tracer that runs on the GPU.

The ray tracer will be implemented using **GLSL** as the programming language. You are given an HTML file that implements the user interface and the entire JavaScript and WebGL code. The only part missing is the GLSL code you will write for ray tracing.

📹 **[Project Demo Video & Instructions](https://graphics.cs.utah.edu/courses/cs4600/fall2023/?prj=6)**

---

## ⚙️ Implementation Details:

The scenes we will render are different collections of spheres and point lights. The application has three rendering modes:

- ✅ **Rasterization:** *(fully implemented, but lacks shadows and proper reflections.)*  
  *(All spheres approximated as triangular meshes.)*

- 🔲 **Ray Tracing:** *(renders the entire image using ray tracing; will not work until you complete your implementation.)*  
  *(Ray tracing occurs inside the fragment shader of a quad covering the entire screen.)*

- 🔲 **Rasterization + Ray Tracing:** *(rasterization handles basic rendering, ray tracing computes reflections and shadows only.)*

The GLSL code you will write for ray tracing will be included inside a fragment shader that performs the actual rendering operation.

---

### 📌 Functions to implement:

In GLSL (`project6.js` file):

- **`RayTracer`** *(main ray tracing function)*
- **`IntersectRay`** *(computes intersection with spheres)*
- **`Shade`** *(computes shading based on reflections and lights)*

---

### 📂 Files Provided:

- **`project6.html`**: Contains the implementation of the interface, including JavaScript/WebGL code.
- **`project6.js`**: Contains GLSL code as JavaScript strings (placeholders provided).

---

### 💡 Useful Tips:

- Press **F4** to reload `project6.js` and quickly recompile shaders without reloading the page, making testing faster.

📹 [Project Demo & Instructions](https://graphics.cs.utah.edu/courses/cs4600/fall2023/?prj=6)
