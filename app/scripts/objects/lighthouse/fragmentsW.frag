varying vec2 vUv;
uniform sampler2D map;
uniform sampler2D mapOne;
uniform sampler2D mapTwo;
uniform float speed;

void main() {

  vec4 mapy = texture2D(map, vUv);
  vec4 textureOne = texture2D(mapOne, vUv);
  vec4 textureTwo = texture2D(mapTwo, vUv);

  vec4 color = mod(speed + vUv.y * mapy.r, 2.0) < 1.0 ? vec4(textureOne.r, textureOne.g, textureOne.b, textureOne.a) : vec4( textureTwo.r, textureTwo.g, textureTwo.b, textureTwo.a );

  gl_FragColor = color;
}
