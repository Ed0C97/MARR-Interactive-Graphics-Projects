# 📐 Project 3: Triangular Meshes & Texturing

In this project we will render a 3D triangular mesh with a texture on the GPU using WebGL.

Just like the previous projects, you are given an HTML file that implements the user interface and a part of the JavaScript and WebGL code.

📹 **[Project Video Demonstration and Detailed Instructions](https://graphics.cs.utah.edu/courses/cs4600/fall2023/?prj=4)**

The part you will implement can be separated into three steps:

---

## Step 1:

Implement the JavaScript function that computes the 4x4 transformation matrix, including perspective projection:

```javascript
function GetModelViewProjection(projectionMatrix, translationX, translationY, translationZ, rotationX, rotationY)
```

- The perspective projection is given to this function as a 4x4 matrix.
- The purpose of this function is to combine it with the other transformations that include a translation and two rotations.
- You must discover the correct order to apply transformations, such that the resulting transformation behaves similar to the one in the video above.

---

## Step 2:

Render a triangular mesh using WebGL. The triangular mesh is loaded from an OBJ file using the UI. The OBJ parser is already implemented for you. The given code also includes triangulation and scaling to form a triangular mesh that fits inside the box.

Complete the JavaScript class `MeshDrawer`, responsible for rendering the triangular mesh. The constructor of this class is called after WebGL initialization.

Methods to implement:

- `setMesh`: Takes an array of 3D vertex positions and an array of 2D texture coordinates. This method is called every time the user loads another OBJ file, so it can be called multiple times.
- `swapYZ`: Determines if the y and z axes should be swapped while rendering.
- `draw`: Responsible for drawing (i.e. rendering) the triangular mesh.

To render the object with varying colors, you can use the following code in your fragment shader:

```glsl
gl_FragColor = vec4(1,gl_FragCoord.z*gl_FragCoord.z,0,1);
```

This code adjusts the green channel of the color based on the distance of the fragment from the near plane of the camera projection. You can experiment with other formulations.

---

## Step 3:

Display a texture on the mesh. To facilitate this, the `MeshDrawer` class includes the following methods:

- `setTexture`: Called to set the texture of the object.
- `showTexture`: Called to specify whether the texture should be displayed.

---

### 📂 Files Provided:

- **`project4.html`**: Implements the interface and various JavaScript/WebGL functionalities.
- **`project4.js`**: Contains placeholders for the JavaScript function `GetModelViewProjection` and class `MeshDrawer` that you will complete. *(Included by `project4.html`.)*
- **`obj.js`**: Implements the OBJ parser. *(Included by `project4.html`.)*
- **`teapot.obj`**: A polygonal mesh version of the Utah Teapot.
- **`bricks.png`**: A texture image you can display on the Utah Teapot model.
- **`nyra.obj`**: A character model by Paul Tosca.
- **`nyra.png`**: Texture for the `nyra.obj` mesh.

---

### 💡 Useful Tips:

- Press **F4** to reload your script quickly without reloading the entire page, allowing fast testing.
- Use **Visual Studio Code** for debugging your JavaScript and WebGL implementation.

