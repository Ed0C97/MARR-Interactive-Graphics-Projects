# 🚁 Project 2: Transformations

In this project we will implement transformations using JavaScript.

You are given an HTML file that implements a very simple UAV simulation. The missing part of this application (the part you will implement) consists of two JavaScript functions:

## 🛠️ Functions to Implement:

### `GetTransform`

Returns a 3x3 transformation matrix defined by the given transformation arguments. Correctly implementing this function is sufficient for applying the correct transformation to the UAV body.

```javascript
function GetTransform(positionX, positionY, rotation, scale)
```

- **`positionX`** and **`positionY`** define the translation component.
- **`rotation`** is the rotation component (in degrees).
- **`scale`** defines the scale component.

The returned transformation should first apply scale, then rotation, and finally translation. The transformation matrix is returned as a 1D array in column-major format:

| array[0] | array[3] | array[6] |
|----------|----------|----------|
| array[1] | array[4] | array[7] |
| array[2] | array[5] | array[8] |

---

### `ApplyTransform`

Takes two 3x3 transformation matrices and returns the resulting combined 3x3 transformation matrix, all in the same column-major format as above.

```javascript
function ApplyTransform(trans1, trans2)
```

- The returned transformation should first apply **`trans1`** and then **`trans2`**.
- Used to apply local transformations to propellers before the UAV body transformation.

---

### 📂 Files Provided:

- **`project2.html`**: Contains the entire implementation except for the two functions you will implement.
- **`project2.js`**: Contains placeholders for the two functions to implement. *(Included by `project2.html`. Make sure they're in the same directory.)*

The `project2.html` file also includes these images:
- `uav.png`
- `propeller.png`
- `shadow.png`
- `ground.jpg` *(image by Giles Hodges)*

---

### 💡 Useful Tips:
- Press the **F4** key to reload the `project2.js` file without reloading the page for quick testing.
- You can use **Visual Studio** to debug JavaScript code.

📹 **[Project Demo Video](https://graphics.cs.utah.edu/courses/cs4600/fall2023/?prj=2)**
