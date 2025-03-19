// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The transformation first applies scale, then rotation, and finally translation.
// The given rotation value is in degrees.
function GetTransform(positionX, positionY, rotation, scale) {
    const rad = rotation * Math.PI / 180; // Convert to radians
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    // Column-major order
    return [
        scale * cos, scale * sin, 0,
        -scale * sin, scale * cos, 0,
        positionX, positionY, 1
    ];
}

// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The arguments are transformation matrices in the same format.
// The returned transformation first applies trans1 and then trans2.
function ApplyTransform(trans1, trans2) {
    let result = new Array(9);
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            result[row * 3 + col] =
                trans1[row * 3] * trans2[col] +
                trans1[row * 3 + 1] * trans2[col + 3] +
                trans1[row * 3 + 2] * trans2[col + 6];
        }
    }
    return result;
}
