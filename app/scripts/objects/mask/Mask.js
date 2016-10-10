import THREE from 'three';
import forEach from 'lodash.foreach'
const glslify = require('glslify');
let start = Date.now();

export default class Lighthouse extends THREE.Object3D {
  constructor() {
    super();

    function replaceThreeChunkFn(a, b) {
      return THREE.ShaderChunk[b] + '\n';
    }

    function shaderParse(glsl) {
        return glsl.replace(/\/\/\s?chunk\(\s?(\w+)\s?\);/g, replaceThreeChunkFn);
    }

    let vs = glslify('./verticesW.vert');
    let fs = glslify('./fragmentsW.frag');

    let vexterShader = shaderParse(vs);
    let fragmentShader = shaderParse(fs);

    this.materialThing = new THREE.ShaderMaterial({
        uniforms: {
            mapOne: {
                type: "t",
                value: new THREE.TextureLoader().load( './assets/testMap.jpg' )
            },
            mapTwo: {
              type: "t",
              value: new THREE.TextureLoader().load( './assets/testMap2.jpg' )
            },
            map: {
              type: "t",
              value: new THREE.TextureLoader().load('./assets/noise.gif')
            },
            speed: {
              type: "f",
              value: 0.0
            }
        },
        vertexShader: vexterShader,
        fragmentShader: fragmentShader,
        wireframe: false,
        wireframeLinewidth: 1,
        transparent: true,
        opacity: 0.5,
        depthTest: true,
        depthWrite: true,
        side: THREE.DoubleSide
    })

    this.geometryThing = new THREE.PlaneGeometry( 16, 9, 32, 32 );
    this.thing = new THREE.Mesh( this.geometryThing, this.materialThing );
    this.add( this.thing );

    this.materialThing.uniforms.needsUpdate = true;

    this.textures = {
      dot : new THREE.TextureLoader().load('./assets/dot.jpg'),
      heightMap : new THREE.TextureLoader().load('./assets/heightMap.png'),
      smoke : new THREE.TextureLoader().load('./assets/smoke.jpg'),
      line : new THREE.TextureLoader().load('./assets/line.jpg'),
      noise : new THREE.TextureLoader().load('./assets/noise.gif'),
      weird : new THREE.TextureLoader().load('./assets/weird.jpg'),
      circle : new THREE.TextureLoader().load('./assets/circle.jpg'),
      ramen : new THREE.TextureLoader().load('./assets/ramen.jpg'),
      thing : new THREE.TextureLoader().load('./assets/thing.jpg')
    }
  }

  nightMode(night) {
    this.night = night;

    if (this.night) {
      TweenMax.to(this.materialThing.uniforms.speed, 1, {value: 1.01, ease: Power2.easeOut})
    } else {
      TweenMax.to(this.materialThing.uniforms.speed, 1, {value: 0.0, ease: Power2.easeIn})
    }
  }

  addGUI(folder) {
    this.maskfolder = window.gui.addFolder('Mask');
    this.maskfolder.add(this.materialThing.uniforms.speed, 'value', 0.0, 1.0).name('control animation').step(0.01);

    var self = this
    this.texture = new function(){
      this.changeMask = function(e){
        switch(e){
          case "dot":
          self.materialThing.uniforms.map.value = self.textures.dot;
          break;

          case "random":
          self.materialThing.uniforms.map.value = self.textures.random;
          break;

          case "smoke":
          self.materialThing.uniforms.map.value = self.textures.smoke;
          break;

          case "line":
          self.materialThing.uniforms.map.value = self.textures.line;
          break;

          case "noise":
          self.materialThing.uniforms.map.value = self.textures.noise;
          break;

          case "weird":
          self.materialThing.uniforms.map.value = self.textures.weird;
          break;

          case "circle":
          self.materialThing.uniforms.map.value = self.textures.circle;
          break;

          case "ramen":
          self.materialThing.uniforms.map.value = self.textures.ramen;
          break;

          case "thing":
          self.materialThing.uniforms.map.value = self.textures.thing;
          break;
        }
      }
    }

    this.maskfolder.add(this.texture, "changeMask", ['dot', 'random', 'smoke', 'line', 'noise', 'weird', 'circle', 'ramen', 'thing']).onChange(this.texture.changeMask);
    this.maskfolder.open();

  }

  update() {
  }
}
