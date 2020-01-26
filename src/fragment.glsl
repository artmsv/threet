#ifdef GL_ES
precision lowp float;
#endif

//uniform vec2 u_resolution;  // Canvas size (width,height)
//uniform vec2 u_mouse;       // mouse position in screen pixels
//uniform float u_time;       // Time in seconds since load

uniform vec3 iResolution;
// uniform float iTime;

uniform sampler2D image;
varying vec2 vUv;

// void mainImage( out vec4 fragColor, in vec2 fragCoord )
//   {
//       // Normalized pixel coordinates (from 0 to 1)
//       vec2 uv = fragCoord/iResolution.xy;

//       // Time varying pixel color
//       vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

//       // Output to screen
//       fragColor = vec4(col,1.0);
//   }

void main() {
	//gl_FragColor = vec4(vec3(1.0),1.0);
  vec4 color = texture2D(image, vUv);
  gl_FragColor = color;
	// mainImage(gl_FragColor, gl_FragCoord.xy);
}