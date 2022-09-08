<template>
  <aside v-show="isClick" class="info">
    <div class="infoNum">{{ seletedData.num }}th Emoject</div>
    <div class="infoName">{{ seletedData.name }}</div>
    <div class="infoEmoji">{{ seletedData.emoji }}</div>
    <p class="infoContent">{{ seletedData.content }}</p>

    <button @click="closeInfo">close</button>
  </aside>

  <Renderer ref="renderer" antialias orbitCtrl resize="window">
    <Stats />
    <Camera
      ref="camera"
      :position="{ x: 0, y: 0, z: 100 }"
      :look-at="{ x: 0, y: 0, z: 100 }"
    />

    <Raycaster ref="raycaster" @click="onClick" />

    <Scene ref="scene" background="#000">
      <AmbientLight :position="{ x: 100, y: 100, z: 100 }" :intensity="0.5" />
      <PointLight :position="{ x: 100, y: 100, z: 100 }" />

      <Box
        :ref="setItemRef"
        v-for="joyBox in joy"
        :key="joyBox.id"
        :scale="{ x: 10, y: 10, z: 10 }"
        :position="{
          x: Math.floor(Math.random() * 60 - 30),
          y: Math.floor(Math.random() * 60 - 30),
          z: Math.floor(Math.random() * 60 - 30),
        }"
        @click="boxClick(joyBox)"
      >
        <PhongMaterial color="#42b983" />
      </Box>

      <Sphere
        :ref="setItemRef"
        v-for="sadnessBox in sadness"
        :key="sadnessBox.id"
        :scale="{ x: 10, y: 10, z: 10 }"
        :position="{
          x: Math.floor(Math.random() * 60 - 30),
          y: Math.floor(Math.random() * 60 - 30),
          z: Math.floor(Math.random() * 60 - 30),
        }"
        @click="boxClick(sadnessBox)"
      >
        <PhongMaterial color="#42b983" />
      </Sphere>

      <Torus
        :ref="setItemRef"
        v-for="surpriseBox in surprise"
        :key="surpriseBox.id"
        :scale="{ x: 10, y: 10, z: 10 }"
        :position="{
          x: Math.floor(Math.random() * 60 - 30),
          y: Math.floor(Math.random() * 60 - 30),
          z: Math.floor(Math.random() * 60 - 30),
        }"
        @click="boxClick(surpriseBox)"
      >
        <PhongMaterial color="#42b983" />
      </Torus>

      <Octahedron
        :ref="setItemRef"
        v-for="disgustBox in disgust"
        :key="disgustBox.id"
        :scale="{ x: 10, y: 10, z: 10 }"
        :position="{
          x: Math.floor(Math.random() * 60 - 30),
          y: Math.floor(Math.random() * 60 - 30),
          z: Math.floor(Math.random() * 60 - 30),
        }"
        @click="boxClick(disgustBox)"
      >
        <PhongMaterial color="#42b983" />
      </Octahedron>
    </Scene>
  </Renderer>
</template>

<script>
import { useHomeStore } from "@/stores/home";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import {
  Renderer,
  Camera,
  Raycaster,
  Scene,
  AmbientLight,
  PointLight,
  Box,
  Sphere,
  Torus,
  Octahedron,
  PhongMaterial,
} from "troisjs";
import Stats from "troisjs/src/components/misc/Stats";

export default {
  name: "EmotionSpace",
  components: {
    Renderer,
    Camera,
    Raycaster,
    Scene,
    AmbientLight,
    PointLight,
    Box,
    Sphere,
    Torus,
    Octahedron,
    PhongMaterial,
    Stats,
  },
  setup() {
    const store = useHomeStore();
    const { cate } = storeToRefs(store);
    const { fetchEmotions } = store;

    const renderer = ref(null);
    const camera = ref(null);

    let seletedData = ref("");
    let seletedMesh = {};
    let isClick = ref(false);

    fetchEmotions();

    const joy = cate.value.joy;
    const sadness = cate.value.sadness;
    const surprise = cate.value.surprise;
    const disgust = cate.value.disgust;

    // 오브젝트 배열
    let itemRefs = [];
    const setItemRef = (el) => {
      itemRefs.push(el);
    };

    // 메쉬 클릭 시 정보 표시
    function boxClick(data) {
      if (isClick.value == false) {
        isClick.value = true;
        seletedData.value = data;
      }

      // gsap.to(camera.value.camera.position, {
      //   z: seletedMesh.pos.z + seletedMesh.scl.z * 5,
      //   duration: 0.75,
      // });
    }

    // 클릭한 메쉬의 정보 가져오기
    function onClick(event) {
      seletedMesh.pos = event.component.mesh.position;
      seletedMesh.scl = event.component.mesh.scale;
    }

    // 정보 닫기
    function closeInfo() {
      isClick.value = false;
      // gsap.to(camera.value.camera.position, {
      //   x: 0,
      //   y: 0,
      //   z: 100,
      //   duration: 1,
      // });
    }

    onMounted(() => {
      renderer.value.onBeforeRender(() => {
        itemRefs.forEach((item) => {
          item.mesh.rotation.y += 0.01;
        });
      });
    });

    return {
      seletedData,
      boxClick,
      isClick,
      onClick,
      closeInfo,
      renderer,
      camera,
      setItemRef,
      itemRefs,
      joy,
      sadness,
      surprise,
      disgust,
    };
  },
};
</script>

<style lang="scss">
.info {
  position: absolute;
  padding: 30px;
  background: #171a1f;
  color: #fff;
  border-radius: 10px;
  box-shadow: inset -12px -8px 20px #000;
  // box-shadow: inset 6px 4px 16px #888;
  z-index: 10000;

  .infoNum {
    font-size: 2rem;
    font-weight: 900;
  }

  .infoName {
    font-size: 0.9rem;
  }
}
</style>
