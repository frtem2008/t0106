#version 300 es

precision highp float;

out vec4 o_color;
in vec2 pos;

void main() {
    o_color = vec4(pos.x, pos.y, 0.6, 1);
}