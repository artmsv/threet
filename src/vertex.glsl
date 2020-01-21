void main() {
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 0.5);
  gl_Position = projectionMatrix * modelViewPosition; 
}