function GetModelViewProjection(projectionMatrix, translationX, translationY, translationZ, rotationX, rotationY) {
	var trans = [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		translationX, translationY, translationZ, 1
	];

	var rotXMatrix = [
		1, 0, 0, 0,
		0, Math.cos(rotationX), -Math.sin(rotationX), 0,
		0, Math.sin(rotationX), Math.cos(rotationX), 0,
		0, 0, 0, 1
	];

	var rotYMatrix = [
		Math.cos(rotationY), 0, Math.sin(rotationY), 0,
		0, 1, 0, 0,
		-Math.sin(rotationY), 0, Math.cos(rotationY), 0,
		0, 0, 0, 1
	];

	var mvMatrix = MatrixMult(rotXMatrix, rotYMatrix);
	mvMatrix = MatrixMult(trans, mvMatrix);

	var mvp = MatrixMult(projectionMatrix, mvMatrix);
	return mvp;
}

class MeshDrawer {
	constructor() {
		this.vertexBuffer = gl.createBuffer();
		this.texCoordBuffer = gl.createBuffer();
		this.numVertices = 0;
		this.texture = null;
		this.hasTexture = false;

		this.prog = InitShaderProgram(meshVS, meshFS);
		this.mvp = gl.getUniformLocation(this.prog, 'mvp');
		this.vertPos = gl.getAttribLocation(this.prog, 'pos');
		this.texCoord = gl.getAttribLocation(this.prog, 'texCoord');
		this.samplerUniform = gl.getUniformLocation(this.prog, 'uSampler');
		this.hasTextureUniform = gl.getUniformLocation(this.prog, 'uHasTexture');
		this.swapUniform = gl.getUniformLocation(this.prog, 'uSwapYZ');
	}

	setMesh(vertices, texCoords) {
		if (texCoords.length !== vertices.length / 3 * 2) {
			console.error('Le coordinate UV non corrispondono alla lunghezza prevista.');
			return;
		}

		this.numVertices = vertices.length / 3;

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
	}

	swapYZ( swap )
	{
		gl.useProgram(this.prog);
		gl.uniform1i(this.swapUniform, swap ? 1 : 0);
	}

	setTexture(img) {
		if (!img.complete || img.naturalWidth === 0) {
			console.error('Texture non caricata correttamente.');
			return;
		}

		this.texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.texture);

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

		this.hasTexture = true;
	}


	draw(trans) {
		gl.useProgram(this.prog);
		gl.uniformMatrix4fv(this.mvp, false, trans);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
		gl.vertexAttribPointer(this.vertPos, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(this.vertPos);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
		gl.vertexAttribPointer(this.texCoord, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(this.texCoord);

		gl.uniform1i(this.hasTextureUniform, this.hasTexture ? 1 : 0);

		if (this.hasTexture) {
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.uniform1i(this.samplerUniform, 0);
		}

		gl.drawArrays(gl.TRIANGLES, 0, this.numVertices);
	}
}

var meshVS = `
    attribute vec3 pos;
    attribute vec2 texCoord;
    uniform mat4 mvp;
    uniform int uSwapYZ;
    varying vec2 vTexCoord;
    void main() {
        if (uSwapYZ == 1) {
            gl_Position = mvp * vec4(pos.x, pos.z, pos.y, 1.0);
        } else {
            gl_Position = mvp * vec4(pos, 1.0);
        }
        vTexCoord = texCoord; 
    }
`;

var meshFS = `
    precision mediump float;
    varying vec2 vTexCoord;
    uniform sampler2D uSampler;
    uniform int uHasTexture;

    void main() {
        if (uHasTexture == 1) {
            gl_FragColor = texture2D(uSampler, vTexCoord);
        } else {
            gl_FragColor = vec4(1,gl_FragCoord.z*gl_FragCoord.z,0,1);
        }
    }
`;
