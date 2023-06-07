import { vec3 } from "./math/mth.js";
import { mat4 } from "./math/mth.js";
import { camera } from "./math/mth.js";
import * as res from "./res.js";
export { vec3, mat4 };

export class render {
    constructor() {
        this.canvas = document.getElementById("canvas");

        /** @type {WebGLRenderingContext} */
        this.gl = this.canvas.getContext("webgl2");
        // todo set camera params
        this.camera = new camera();
        console.log(camera);
        res.createProgram(
            this,
            this.gl,
            "../shaders/vert.glsl",
            "../shaders/frag.glsl",
            this.prog
        );

        this.loaded = false;
        window.addEventListener("Shader program loaded", () => {
            console.log(typeof this.prog);
            console.log("Program created! Program:" + this.prog);

            render.posLoc = this.gl.getAttribLocation(this.prog, "in_pos");
            render.posBuf = this.gl.createBuffer();
            this.loaded = true;
        });
    }

    start() {
        const draw = () => {
            if (!this.loaded) return;
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.posBuf);
            const pos = [-1, 1, 0, 1, -1, -1, 0, 1, 1, 1, 0, 1, 1, -1, 0, 1];

            this.gl.bufferData(
                this.gl.ARRAY_BUFFER,
                new Float32Array(pos),
                this.gl.STATIC_DRAW
            );
            this.gl.vertexAttribPointer(
                this.posLoc,
                4,
                this.gl.FLOAT,
                false,
                0,
                0
            );
            this.gl.enableVertexAttribArray(this.posLoc);

            this.gl.useProgram(this.prog);
            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
            // console.log("render");
            window.requestAnimationFrame(draw);
        };
        draw();
    }

    close() {}
}
