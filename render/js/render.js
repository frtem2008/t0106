import { vec3 } from "./math/mth.js";
import { mat4 } from "./math/mth.js";
import { camera } from "./math/mth.js";
import * as res from "./res.js";
import * as tm from "./timer.js";
export { vec3, mat4 };

export class Render {
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

            this.posLoc = this.gl.getAttribLocation(this.prog, "in_pos");
            this.posBuf = this.gl.createBuffer();

            this.loaded = true;
        });

        this.timer = new tm.Timer();
    }

    start() {
        const draw = () => {
            if (!this.loaded) {
                window.requestAnimationFrame(draw);
                return;
            }

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

            this.timer.response("fps window");

            window.requestAnimationFrame(draw);
        };
        draw();
    }

    close() {}
}
