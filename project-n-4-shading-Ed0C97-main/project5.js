function GetModelViewMatrix(translationX, translationY, translationZ, rotationX, rotationY) {
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
	return mvMatrix;
}

class MeshDrawer {
	constructor() {
		this.vertexBuffer = gl.createBuffer();
		this.texCoordBuffer = gl.createBuffer();
		this.normalBuffer = gl.createBuffer();
		this.numVertices = 0;
		this.texture = null;
		this.hasTexture = false;
		this.prog = InitShaderProgram(meshVS, meshFS);
		this.mvp = gl.getUniformLocation(this.prog, 'mvp');
		this.mv = gl.getUniformLocation(this.prog, 'mv');
		this.normalMatrix = gl.getUniformLocation(this.prog, 'normalMatrix');
		this.vertPos = gl.getAttribLocation(this.prog, 'pos');
		this.texCoord = gl.getAttribLocation(this.prog, 'texCoord');
		this.normalAttrib = gl.getAttribLocation(this.prog, 'normal');
		this.samplerUniform = gl.getUniformLocation(this.prog, 'uSampler');
		this.hasTextureUniform = gl.getUniformLocation(this.prog, 'uHasTexture');
		this.lightDirUniform = gl.getUniformLocation(this.prog, 'uLightDir');
		this.shininessUniform = gl.getUniformLocation(this.prog, 'uShininess');
		this.swapUniform = gl.getUniformLocation(this.prog, 'uSwapYZ');
	}

	setMesh(vertices, texCoords, normals) {
		if (texCoords.length !== vertices.length / 3 * 2) {
			console.error('Le coordinate UV non corrispondono alla lunghezza prevista.');
			return;
		}
		this.numVertices = vertices.length / 3;

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
	}

	draw(matrixMVP, matrixMV, matrixNormal) {
		gl.useProgram(this.prog);

		gl.uniformMatrix4fv(this.mvp, false, matrixMVP);
		gl.uniformMatrix4fv(this.mv, false, matrixMV);
		gl.uniformMatrix3fv(this.normalMatrix, false, matrixNormal);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
		gl.vertexAttribPointer(this.vertPos, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(this.vertPos);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
		gl.vertexAttribPointer(this.texCoord, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(this.texCoord);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
		gl.vertexAttribPointer(this.normalAttrib, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(this.normalAttrib);

		gl.uniform1i(this.hasTextureUniform, this.hasTexture ? 1 : 0);
		if (this.hasTexture) {
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.uniform1i(this.samplerUniform, 0);
		}

		gl.drawArrays(gl.TRIANGLES, 0, this.numVertices);
	}

	swapYZ(swap) {
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

	setLightDir(x, y, z) {
		const length = Math.sqrt(x * x + y * y + z * z);
		
		if (length === 0) {
			console.error('Invalid light direction. The vector should not be zero.');
			return;
		}
		
		const normalizedX = x / length;
		const normalizedY = y / length;
		const normalizedZ = z / length;
		
		gl.useProgram(this.prog);
		gl.uniform3f(this.lightDirUniform, normalizedX, normalizedY, normalizedZ);
	}

	setShininess(shininess) {
		gl.useProgram(this.prog);
		gl.uniform1f(this.shininessUniform, shininess);
	}

}

var meshVS = `
    attribute vec3 pos;
    attribute vec2 texCoord;
    attribute vec3 normal;
    uniform mat4 mvp;
    uniform mat4 mv;
    uniform mat3 normalMatrix;
    uniform int uSwapYZ;
    varying vec2 vTexCoord;
    varying vec3 fragNormal;
    void main() {
        vec3 transformedNormal = normalize(normalMatrix * normal);
        if (uSwapYZ == 1) {
            gl_Position = mvp * vec4(pos.x, pos.z, pos.y, 1.0);
        } else {
            gl_Position = mvp * vec4(pos, 1.0);
        }
        vTexCoord = texCoord;
        fragNormal = transformedNormal;
    }
`;

var meshFS = `
    precision mediump float;
    varying vec2 vTexCoord;
    varying vec3 fragNormal;
    uniform sampler2D uSampler;
    uniform int uHasTexture;
    uniform vec3 uLightDir;
    uniform float uShininess;
    void main() {
        vec3 lightDir = normalize(uLightDir);
        vec3 normal = normalize(fragNormal);
        float diffuse = max(dot(normal, lightDir), 0.0);
        
        vec3 viewDir = vec3(0.0, 0.0, 1.0); // Assuming camera facing towards -Z
        vec3 halfwayDir = normalize(lightDir + viewDir);
        float specular = pow(max(dot(normal, halfwayDir), 0.0), uShininess);
        
        vec4 textureColor;
        if (uHasTexture == 1) {
            textureColor = texture2D(uSampler, vTexCoord);
        } else {
            textureColor = vec4(1.0); // Set initial color to white
        }
        
        vec3 diffuseColor = textureColor.rgb * diffuse;
        vec3 specularColor = vec3(1.0) * specular;
        
        vec3 finalColor = diffuseColor + specularColor;
        
        // Shadow color: set the final color to black if diffuse is close to zero
        finalColor *= mix(vec3(0.0), vec3(1.0), step(0.1, diffuse));

        gl_FragColor = vec4(finalColor, 1.0);
    }
`;
