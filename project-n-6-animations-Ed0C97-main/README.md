# 🎳 Project 6: Physically-Based Mass-Spring Simulation

In this project, we will implement a physically-based simulation using a **mass-spring system**.

You are given an HTML file implementing the user interface and part of the JavaScript and WebGL code. Your main task is to implement the following time-stepping function to simulate physics:

```javascript
function SimTimeStep(
  dt, positions, velocities, springs,
  stiffness, damping, particleMass, gravity, restitution
)
```

Additionally, you will need to copy/paste your implementation of the previous shading project (`project4_Shading`) to handle rendering and shading.


---

### 📌 Simulation Details:

- `positions` and `velocities` are arrays of particles (`Vec3` objects).
- `springs` array contains spring objects with particle indices (`p0`, `p1`) and rest length (`rest`).
- **Box Collision**: Simulation space is a cube centered at the origin, extending from `-1` to `1` in all axes.
- **Parameters**:
  - `stiffness`: Spring stiffness coefficient.
  - `damping`: Damping coefficient.
  - `particleMass`: Mass of each particle (same for all particles).
  - `gravity`: Gravity vector (`Vec3`).
- Handle collisions with box walls using `restitution`. *(Self-collisions are not required.)*
- You can choose any numerical integration method (Euler explicit, semi-implicit, etc.).

---

### 📂 Files Provided:

- **`project7.html`**: Implementation of the interface and various JavaScript/WebGL functionalities.
- **`project7.js`**: Placeholder for JavaScript function `GetModelViewMatrix`, class `MeshDrawer`, and the `SimTimeStep` function that you will complete.
- **`obj.js`**: Updated OBJ parser (includes additional functionalities for this project).
- **`teapot-low.obj`**: A low-resolution Utah Teapot model, suitable for real-time mass-spring simulation.

You can reuse OBJ files and textures from previous projects for testing.

---

### 📌 Class `Vec3` Provided:

`Vec3` class simplifies vector math. Available methods:

- `.init(x,y,z)`
- `.copy()`
- `.set(v)`
- `.inc(v)`, `.dec(v)`
- `.scale(f)`
- `.add(v)`, `.sub(v)`
- `.dot(v)`
- `.cross(v)`
- `.mul(f)`
- `.div(f)`
- `.len2()`, `.len()`
- `.unit()`, `.normalize()`

---

### 💡 Useful Tips:

- Press **F4** to quickly reload your JavaScript file without reloading the page.
- Use **Visual Studio Code** for effective debugging.

📹 [Project Demo Video](https://www.youtube.com/watch?time_continue=187&v=Kpep7eWHQBM)
