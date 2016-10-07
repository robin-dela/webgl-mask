varying vec2 vUv;
varying float noise;
uniform sampler2D mapOne;
uniform sampler2D map;
uniform sampler2D mapTwo;

uniform float time;
uniform float frequency;
uniform float amplitude;
uniform float speed;


float random( vec3 scale, float seed ){
  return fract( sin( dot( gl_FragCoord.xyz + seed, scale ) ) * 43758.5453 + seed ) ;
}

// void main() {
  // float r = .005 * random( vec3( 1.0, 1.2, 1.5 ), 0.0 );
//   // vec2 tPos = vec2( 1.2, 1.0 - 1.3 * noise + r );
//   vec2 tPos = vec2( 1.2, 0.8 - 1.3 * noise + r );
//   vec4 color = texture2D( tSnow, tPos );
//   gl_FragColor = vec4( color.rgb, 1.0 );
// }

void main() {

  vec4 mapy = texture2D(map, vUv);
  // float distortion = sin(vUv.x * frequency + time * speed) * amplitude;

  // float y = mod(gl_FragCoord.y * mapy + time, 20.) < 10. ? 1. : 0.;
	// float x = mod(gl_FragCoord.x * mapy + time, 20.) < 10. ? 1. : 0.;
  // //
  vec4 mathis = texture2D(mapOne, vUv);
  vec4 soufTexture = texture2D(mapTwo, vUv);
  //
  //
	// gl_FragColor = vec4(vec3(min(x, y)), 1.);


  vec4 color = mod(speed + vUv.y * mapy.r, 2.0) < 1.0 ? vec4(mathis.r, mathis.g, mathis.b, mathis.a) : vec4( soufTexture.r, soufTexture.g, soufTexture.b, soufTexture.a );

  gl_FragColor = color;
}
