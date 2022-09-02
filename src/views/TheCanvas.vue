<template>
  <div ref="canvas"></div>
</template>

<script>
// import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import * as THREE from "three";
import TrackballControls from "three-trackballcontrols";
import { onMounted, onUpdated } from "@vue/runtime-core";
import { ref } from "vue";
// import {
//   BloomEffect,
//   EffectComposer,
//   GlitchPass,
//   EffectPass,
//   RenderPass,
// } from "postprocessing";

export default {
  name: "TheCanvas",

  setup() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const light = new THREE.DirectionalLight("hsl(0, 100%, 100%)");
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      side: THREE.FrontSide,
      color: "hsl(0, 100%, 50%)",
      wireframe: false,
    });
    const cube = new THREE.Mesh(geometry, material);
    const axes = new THREE.AxesHelper(5);
    let controls = [];

    scene.add(camera);
    scene.add(light);
    scene.add(cube);
    scene.add(axes);
    renderer.setSize(window.innerWidth, window.innerHeight);
    light.position.set(0, 0, 10);
    camera.position.z = 5;
    scene.background = new THREE.Color("hsl(0, 100%, 100%)");
    // controls = new TrackballControls(camera);
    // controls.rotateSpeed = 1.0;
    // controls.zoomSpeed = 5;
    // controls.panSpeed = 0.8;
    // controls.noZoom = false;
    // controls.noPan = false;
    // controls.staticMoving = true;
    // controls.dynamicDampingFactor = 0.3;

    function animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
      this.cube.rotation.y += this.speed;
      this.controls.update();
    }

    onMounted(() => {
      this.$refs.canvas.appendChild(this.renderer.domElement);
      this.animate();
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
      scene,
      camera,
      controls,
      animate,
      //   rotate,
      renderer,
      light,
      cube,
      axes,
      speed: 0.01,
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
