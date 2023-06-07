#version 300 es

precision highp float;

in vec4 in_pos;
out vec2 pos;

void main() {
    gl_Position = in_pos;
    pos = vec2(in_pos.x, in_pos.y);
}