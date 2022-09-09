<template>
  <div class="info">
    <div>선택한 이모지 : {{ emoji }}</div>
    <div>이름 : {{ name }}</div>
    <div>설명 : {{ content }}</div>
    <br />
    <div>감정 : {{ category }}</div>
    <div>활성도 : {{ activity }}</div>

    <button @click="createObj">createObj</button>

    <button @click="createEmotion(name, emoji, content, category, activity)">
      감정 등록
    </button>
  </div>

  <div class="canvas"></div>
</template>

<script>
import { useInputStore } from "@/stores/input";
import { storeToRefs } from "pinia";
// import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import * as THREE from "three";
// import TrackballControls from "three-trackballcontrols";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted, onUpdated } from "@vue/runtime-core";
// import { noise, perlin3 } from "perlin";
// import perlinNoise3d from "perlin-noise-3d";
import { makeNoise4D } from "open-simplex-noise";
import * as dat from "dat.gui";

export default {
  name: "TheCanvas",

  setup() {
    const store = useInputStore();
    const { name, emoji, content, category, activity } = storeToRefs(store);
    const { createEmotion } = store;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const light = new THREE.AmbientLight(0x404040);
    let geometry = null;
    let material = null;
    let cube = null;
    const axes = new THREE.AxesHelper(5);
    let controls = [];
    let speed = 0.01;
    scene.add(camera);
    scene.add(light);
    scene.add(axes);
    renderer.setSize(window.innerWidth, window.innerHeight);
    light.position.set(0, 0, 10);
    camera.position.z = 5;
    scene.background = new THREE.Color("hsl(0, 100%, 100%)");
    controls = new OrbitControls(camera, renderer.domElement);
    // controls.rotateSpeed = 1.0;
    // controls.zoomSpeed = 5;
    // controls.panSpeed = 0.8;
    // controls.noZoom = false;
    // controls.noPan = false;
    // controls.dynamicDampingFactor = 0.3;

    const gui = new dat.GUI();
    const settings = {
      speed: 0.5,
      density: 1,
      strength: 0.5,
      frequency: 2.0,
      amplitude: 10.0,
      intensity: 5,
    };
    const folder1 = gui.addFolder("Noise");
    const folder2 = gui.addFolder("Rotation");
    const folder3 = gui.addFolder("Color");
    folder1.add(settings, "speed", 0.1, 1, 0.01);
    folder1.add(settings, "density", 0, 10, 0.01);
    folder1.add(settings, "strength", 0, 2, 0.01);
    folder2.add(settings, "frequency", 0, 10, 0.1);
    folder2.add(settings, "amplitude", 0, 10, 0.1);
    folder3.add(settings, "intensity", 0, 10, 0.1);

    const noise = `
      // GLSL textureless classic 3D noise "cnoise",
      // with an RSL-style periodic variant "pnoise".
      // Author:  Stefan Gustavson (stefan.gustavson@liu.se)
      // Version: 2011-10-11
      //
      // Many thanks to Ian McEwan of Ashima Arts for the
      // ideas for permutation and gradient selection.
      //
      // Copyright (c) 2011 Stefan Gustavson. All rights reserved.
      // Distributed under the MIT license. See LICENSE file.
      // https://github.com/ashima/webgl-noise
      //

      vec3 mod289(vec3 x)
      {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }

      vec4 mod289(vec4 x)
      {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }

      vec4 permute(vec4 x)
      {
        return mod289(((x*34.0)+1.0)*x);
      }

      vec4 taylorInvSqrt(vec4 r)
      {
        return 1.79284291400159 - 0.85373472095314 * r;
      }

      vec3 fade(vec3 t) {
        return t*t*t*(t*(t*6.0-15.0)+10.0);
      }

      // Classic Perlin noise, periodic variant
      float pnoise(vec3 P, vec3 rep)
      {
        vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
        vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
        Pi0 = mod289(Pi0);
        Pi1 = mod289(Pi1);
        vec3 Pf0 = fract(P); // Fractional part for interpolation
        vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;

        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);

        vec4 gx0 = ixy0 * (1.0 / 7.0);
        vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);

        vec4 gx1 = ixy1 * (1.0 / 7.0);
        vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);

        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;

        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);

        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
        return 2.2 * n_xyz;
      }
    `;

    const rotation = `
      mat3 rotation3dY(float angle) {
        float s = sin(angle);
        float c = cos(angle);

        return mat3(
          c, 0.0, -s,
          0.0, 1.0, 0.0,
          s, 0.0, c
        );
      }

      vec3 rotateY(vec3 v, float angle) {
        return rotation3dY(angle) * v;
      }
    `;

    const vertexShader = `
      varying vec2 vUv;
      varying float vDistort;

      uniform float uTime;
      uniform float uSpeed;
      uniform float uNoiseDensity;
      uniform float uNoiseStrength;
      uniform float uFrequency;
      uniform float uAmplitude;

      ${noise}

      ${rotation}

      void main() {
        vUv = uv;

        float t = uTime * uSpeed;
        float distortion = pnoise((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;

        vec3 pos = position + (normal * distortion);
        float angle = sin(uv.y * uFrequency + t) * uAmplitude;
        pos = rotateY(pos, angle);

        vDistort = distortion;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      varying float vDistort;

      uniform float uTime;
      uniform float uIntensity;

      vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
        return a + b * cos(6.28318 * (c * t + d));
      }

      void main() {
        float distort = vDistort * uIntensity;

        // vec3 roughness = vec3(0.5, 0.5, 0.5);
        vec3 brightness = vec3(0.5, 0.5, 0.5);
        vec3 contrast = vec3(0.5, 0.5, 0.5);
        vec3 oscilation = vec3(1.0, 1.0, 1.0);
        vec3 phase = vec3(0.0, 0.1, 0.2);

        vec3 color = cosPalette(distort, brightness, contrast, oscilation, phase);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    createObj();

    function createObj() {
      cube = null;

      if (category.value == "joy") {
        geometry = new THREE.BoxGeometry(1, 1, 1);
      } else {
        geometry = new THREE.SphereGeometry(1, 64, 64);
        console.log(category.value);
      }
      // material = new THREE.MeshStandardMaterial({
      //   side: THREE.FrontSide,
      //   color: "hsl(0, 100%, 50%)",
      //   wireframe: false,
      // });
      // material = new THREE.MeshNormalMaterial();
      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          roughness: { value: 0.5 },
          uTime: { value: 0 },
          uSpeed: { value: settings.speed },
          uNoiseDensity: { value: settings.density },
          uNoiseStrength: { value: settings.strength },
          uFrequency: { value: settings.frequency },
          uAmplitude: { value: settings.amplitude },
          uIntensity: { value: settings.intensity },
        },

        // wireframe: true,
      });
      cube = new THREE.Mesh(geometry, material);

      scene.add(cube);
      // console.log(cube);
    }

    geometry.positionData = [];

    let v3 = new THREE.Vector3();

    for (let i = 0; i < geometry.attributes.position.count; i++) {
      v3.fromBufferAttribute(geometry.attributes.position, i);
      geometry.positionData.push(v3.clone());
    }

    let noise4D = makeNoise4D(Date.now());
    let clock = new THREE.Clock();
    let 진폭 = 2;
    let 반경 = 0.3;
    let 속도 = 0.8;

    function animation() {
      // Get the time
      let t = clock.getElapsedTime();

      geometry.positionData.forEach((p, idx) => {
        // Create noise for each point in our sphere
        let setNoise = noise4D(p.x * 진폭, p.y * 진폭, p.z * 진폭, t * 속도);
        // Using our Vector3 function, copy the point data, and multiply it by the noise
        // this looks confusing - but it's just multiplying noise by the position at each vertice
        v3.copy(p).addScaledVector(p, setNoise * 반경);
        // Update the positions
        geometry.attributes.position.setXYZ(idx, v3.x, v3.y, v3.z);
      });

      // Some housekeeping so that the sphere looks "right"
      geometry.computeVertexNormals();
      geometry.attributes.position.needsUpdate = true;
      // Render the sphere onto the page again.
      renderer.render(scene, camera);
    }

    function updateUniform() {
      // Update uniforms
      cube.material.uniforms.uTime.value = clock.getElapsedTime();
      cube.material.uniforms.uSpeed.value = settings.speed;
      cube.material.uniforms.uNoiseDensity.value = settings.density;
      cube.material.uniforms.uNoiseStrength.value = settings.strength;
      cube.material.uniforms.uFrequency.value = settings.frequency;
      cube.material.uniforms.uAmplitude.value = settings.amplitude;
      cube.material.uniforms.uIntensity.value = settings.intensity;
    }

    function animate() {
      if (cube !== null) {
        // cube.rotation.y += speed;
        // animation();
        updateUniform();
      }
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    onMounted(() => {
      document.querySelector(".canvas").appendChild(renderer.domElement);
      animate();
    });

    onUpdated(() => {
      //   rotate: () => {
      //     if (this.speed === "") {
      //       return 0;
      //     } else {
      //       return this.speed;
      //     }
      //   };
    });

    return {
      name,
      emoji,
      content,
      category,
      activity,
      scene,
      camera,
      controls,
      //   rotate,
      renderer,
      light,
      cube,
      axes,
      speed,
      animate,
      createObj,
      createEmotion,
    };
  },
  data: function () {
    return {};
  },
  created: function () {},
  mounted: function () {},
  methods: {},
  computed: {},
};
</script>

<style lang="scss">
canvas {
  position: inherit;
  border: 1px solid #999;
}
</style>
