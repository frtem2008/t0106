import { vec3 } from "./math/mth.js";
import { mat4 } from "./math/mth.js";

class VERTEX {
    constructor() {
        this.P = []; // Position
        this.T = []; // Texture coordinates
        this.N = []; // Normals
        this.C = []; // Color
    }
}

class PRIM {
    constructor() {
        this.v = []; // Vertex
        this.vA = []; // OpenGL vertex array Id
        this.vBuf = []; // OpenGL vertex buffer Id
        this.iBuf = []; // OpenGL index buffer Id
        this.numOfElements = 0; // Number of elements
        this.trans = new mat4(); // Additional transformation matrix
    }

    createSphere(R) {
        for (
            let i = 0, theta = Math.PI;
            i < 100;
            i++, theta -= Math.PI / (100 - 1)
        ) {
            for (
                let j = 0, phi = 0;
                j < 100;
                j++, phi += (2 * Math.PI) / (100 - 1)
            ) {
                this.v[i * 100 + j].N = vec3().set(
                    Math.sin(theta) * Math.sin(phi),
                    Math.cos(theta),
                    Math.sin(theta) * Math.cos(phi)
                );
                this.v[i * 100 + j].P = vec3().set(
                    R * Math.sin(theta) * Math.sin(phi),
                    R * Math.cos(theta),
                    R * Math.sin(theta) * Math.cos(phi)
                );
            }
        }
    }
}
