varying vec2 vUv;
uniform float speed;
uniform sampler2D map;

void main() {
    vUv = uv;
    vec3 newPosition = position + normal;
    gl_Position = projectionMatrix * modelViewMatrix* vec4( newPosition, 1.0 );
}
