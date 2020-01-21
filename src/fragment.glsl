#ifdef GL_ES
precision lowp float;
#endif

uniform vec2 u_resolution;  // Canvas size (width,height)
uniform vec2 u_mouse;       // mouse position in screen pixels
uniform float u_time;       // Time in seconds since load

void main() {
	gl_FragColor = vec4(vec3(1.0),1.0);
}