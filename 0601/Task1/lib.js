const vs = `#version 300 es
        
        in highp vec4 in_pos;
        out highp vec3 color;

        float W = 2.0;
        float H = 2.0;

        float X0 = -2.0;
        float X1 = 2.0;
        float Y0 = -2.0;
        float Y1 = 2.0;

        struct CMPL 
        {
            float Re;
            float Im;
        };

        CMPL add( CMPL A, CMPL B )
        {
            return CMPL(A.Re + B.Re, A.Im + B.Im);
        }

        CMPL mul( CMPL A, CMPL B )
        {
            return CMPL(A.Re * B.Re - A.Im * B.Im, A.Re * B.Im + A.Im * B.Re);            
        }

        CMPL square( CMPL A )
        {
            return mul(A, A);
        }

        float cmod( CMPL A )
        {
            return sqrt(A.Re * A.Re + A.Im * A.Im);
        }

        float cmod2( CMPL A )
        {
            return A.Re * A.Re + A.Im * A.Im;
        }

        float mandl( CMPL Z )
        {
            float n = 0.0;
            CMPL Z0 = CMPL(Z.Re, Z.Im);

            while (n < 255.0 && cmod2(Z) < 4.0)
            {
                Z = add(square(Z), Z0);
                n += 1.0;
            }

            return n;            
        }

        float fromPosX( void )
        {
            return -X0 / 2.0 + in_pos.x * 4.0;            
        }

        float fromPosY( void )
        {
            return -Y0 / 2.0 + in_pos.y * 4.0;            
        }
    
        vec3 calcColor( void )
        {
            // calculate color depended on position
            CMPL Z = CMPL(fromPosX(), fromPosY());
            float n = mandl(Z);
            // n /= 255.0;
            return vec3(n, n / 8.0, n / 4.0);
            // return vec3(n / 255.0, 0, 0);
            // return vec3(Z.Re, Z.Im, 0);
            // return vec3(in_pos.xy, 1);
        }

        void main( void ) 
        {
            gl_Position = in_pos;
            color = calcColor();
            //color = vec3(in_pos.xy, 1);
        }
    `;

const fs = `#version 300 es

        out highp vec4 o_color;
        in highp vec3 color;

        void main( void ) 
        {
            o_color = vec4(color, 1);
        }
    `;

function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Failed shader load!\n" + gl.getShaderInfoLog(shader));
        console.error(gl.getShaderInfoLog(shader));
    }

    return shader;
}

export function initGL() {
    const canvas = document.getElementById("an2Canvas");
    /** @type {WebGLRenderingContext} */
    const gl = canvas.getContext("webgl2");

    gl.clearColor(0.3, 0.47, 0.8, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vertexSh = loadShader(gl, gl.VERTEX_SHADER, vs);
    const fragmentSh = loadShader(gl, gl.FRAGMENT_SHADER, fs);

    const prog = gl.createProgram();

    gl.attachShader(prog, vertexSh);
    gl.attachShader(prog, fragmentSh);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        alert("Failed shader prog link!\n" + gl.getProgramInfoLog(prog));
    }

    const posLoc = gl.getAttribLocation(prog, "in_pos");

    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    const pos = [-1, 1, 0, 1, -1, -1, 0, 1, 1, 1, 0, 1, 1, -1, 0, 1];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);
    gl.vertexAttribPointer(posLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posLoc);

    gl.useProgram(prog);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
