# 🎨 Project 4: WebGL Shading

In this project we will add shading to the WebGL-based triangular mesh renderer we implemented in the previous project. You can read the instructions and see an example of the expected behavior at this link:

📹 **[Project Demo Video](https://graphics.cs.utah.edu/courses/cs4600/fall2023/?prj=5)**

Again, you are given an HTML file that implements the user interface and a part of the JavaScript and WebGL code. The part you will implement is the same `MeshDrawer` class you implemented in the previous project. Therefore, you can copy and paste most of your implementation from the previous project.

The new version of the `MeshDrawer` class in this project has just a few additions to facilitate shading:

---

## 🛠️ Implementation Details:

The `setMesh` method in the new version also takes a list of vertex normals. These vertex normals should be sent to the vertex shader as another attribute.

```javascript
setMesh(vertPos, texCoords, normals)
```

The `draw` method now takes three matrices: a 4x4 model-view-projection matrix (as before), a 4x4 model-view matrix, and a 3x3 normal transformation matrix. All matrices are stored as arrays in column-major order, as before. The last two additional matrices should be used for transforming object-space vertex positions and normals to camera space, where you can perform shading.

```javascript
draw(matrixMVP, matrixMV, matrixNormal)
```

The new `setLightDir` method is called by the interface for setting the light direction in camera space. If you perform shading in camera space, you do not need to transform the light direction.

```javascript
setLightDir(x, y, z)
```

The new `setShininess` method is called by the interface for setting the shininess parameter (i.e. the exponent alpha) of the Blinn material model.

```javascript
setShininess(shininess)
```

In addition to these changes, the `GetModelViewProjection` function from the previous project is replaced with the new `GetModelViewMatrix` function. This new one does not take the projection matrix as an argument, and so returns the part of the transformation prior to projection.

```javascript
function GetModelViewMatrix(translationX, translationY, translationZ, rotationX, rotationY)
```

After modifying your code from the previous project to account for these relatively minor changes above, all you need to do is implement shading in the fragment shader. We will use the **Blinn material model** for shading. Here is a short video showing what the successfully completed project should look like:

📹 [Video Demo](https://graphics.cs.utah.edu/courses/cs4600/fall2023/?prj=5)

---

### 💡 Shading Specifications:

- Use a single directional light with the given direction.
- The interface includes a custom control for adjusting the light direction.
- The light intensity (I) should be taken as white `(1,1,1)` in RGB.
- Using ambient light is optional (no interface controls).
- Interface allows adjusting shininess (the exponent alpha) of the Blinn material model.
- Diffuse (`Kd`) and specular `(Ks)` color coefficients should be white.
- If `showTexture` is set and `setTexture` is called, replace diffuse coefficient (`Kd`) with the texture value.

---

### 📂 Files Provided:

- **`project5.html`**: Contains the interface implementation and various JavaScript/WebGL functionalities.
- **`project5.js`**: Contains the placeholder for the JavaScript function `GetModelViewMatrix` and class `MeshDrawer` that you will complete. *(Included by `project5.html`.)*
- **`obj.js`**: Implements the OBJ parser *(identical to previous project version)*.

You can use the same OBJ files and textures from the previous project for testing your implementation.

