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
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted, onUpdated } from "@vue/runtime-core";
import { makeNoise4D } from "open-simplex-noise";
import * as dat from "dat.gui";
import { vertexShader, fragmentShader } from "@/assets/js/twist";
// import { asd } from "@/assets/js/perlin";
import { noise, perlin3 } from "perlin";

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
    camera.position.set(1, 1, 1);

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(sizes.width, sizes.height);
    const light = new THREE.AmbientLight(0x404040);
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(100, 1000, 100);
    let geometry = null;
    let material = null;
    let cube = null;
    const axes = new THREE.AxesHelper(5);
    let controls = [];
    let speed = 0.01;
    scene.add(camera);
    scene.add(light);
    scene.add(spotLight);
    scene.add(axes);
    light.position.set(0, 0, 10);
    camera.position.z = 5;
    scene.background = new THREE.Color("hsl(0, 100%, 100%)");
    controls = new OrbitControls(camera, renderer.domElement);

    const gui = new dat.GUI();
    const settings = {
      speed: 0.5,
      density: 1,
      strength: 0.8,
      frequency: 2.0,
      amplitude: 10.0,
      intensity: 1,
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

    createObj();

    function createObj() {
      cube = null;

      if (category.value == "joy") {
        geometry = new THREE.BoxGeometry(1, 1, 1);
      } else {
        geometry = new THREE.SphereGeometry(1, 128, 128);
      }
      material = new THREE.MeshStandardMaterial({
        side: THREE.FrontSide,
        color: "hsl(0, 50%, 50%)",
        wireframe: false,
      });
      // material = new THREE.MeshNormalMaterial({});
      // material = new THREE.ShaderMaterial({
      //   vertexShader,
      //   fragmentShader,
      //   uniforms: {
      //     uTime: { value: 0 },
      //     uSpeed: { value: settings.speed },
      //     uNoiseDensity: { value: settings.density },
      //     uNoiseStrength: { value: settings.strength },
      //     uFrequency: { value: settings.frequency },
      //     uAmplitude: { value: settings.amplitude },
      //     uIntensity: { value: settings.intensity },
      //   },
      //   // wireframe: true,
      // });
      cube = new THREE.Mesh(geometry, material);
      // cube.scale.set(0.5, 0.5, 0.5);
      cube.receiveShadow = true;
      cube.castShadow = true;
      cube.rotation.x = -Math.PI / 4;

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
    let amplitude = 5; // 진폭
    let radius = 0.3; // 반경
    let mesh_speed = 1; // 속도

    function animation() {
      let t = clock.getElapsedTime();

      geometry.positionData.forEach((p, idx) => {
        let setNoise = noise4D(
          p.x * amplitude,
          p.y * amplitude,
          p.z * amplitude,
          t * mesh_speed
        );
        v3.copy(p).addScaledVector(p, setNoise * radius);
        geometry.attributes.position.setXYZ(idx, v3.x, v3.y, v3.z);
      });

      geometry.computeVertexNormals();
      geometry.attributes.position.needsUpdate = true;
    }

    function twist() {
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
        cube.rotation.y += speed;
        animation();
        // twist();
        // perli();
      }
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

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
      renderer,
      createObj,
      createEmotion,
    };
  },
};
</script>

<style lang="scss">
canvas {
  display: inherit;
  position: inherit;
}
</style>
