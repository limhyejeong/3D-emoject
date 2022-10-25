<template>
  <aside v-show="isClick" class="info">
    <!-- <div>{{ seletedData.num }}<div> -->
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
      <PointLight :position="{ z: 200, y: 200, z: 200 }" />

      <Box
        v-for="joyBox in joy"
        :ref="setItemRef"
        :key="joyBox.id"
        :scale="{ x: 10, y: 10, z: 10 }"
        :position="{
          x: 0,
          y: 0,
          z: 0,
        }"
        @click="boxClick(joyBox)"
      >
        <PhongMaterial color="#ffffff" />
      </Box>

      <Sphere
        v-for="sadnessBox in sadness"
        :ref="setItemRef"
        :key="sadnessBox.id"
        :scale="{ x: 10, y: 10, z: 10 }"
        :position="{
          x: 30,
          y: 0,
          z: 0,
        }"
        @click="boxClick(sadnessBox)"
      >
        <PhongMaterial color="#ffffff" />
      </Sphere>
    </Scene>
  </Renderer>
</template>

<script>
import { useHomeStore } from "@/stores/home";
import { storeToRefs } from "pinia";
import { Object3D } from "three";
// import { THREE, Vector3 } from "three";
import { ref, onUpdated, onMounted } from "vue";
import { gsap } from "gsap";
import {
  Renderer,
  Camera,
  Raycaster,
  Scene,
  PointLight,
  Box,
  Sphere,
  PhongMaterial,
} from "troisjs";
import Stats from "troisjs/src/components/misc/Stats";
// import ViewInfo from "../components/ViewInfo.vue";

export default {
  name: "EmotionSpace",
  // props: ["emotionArray"],
  components: {
    Renderer,
    Camera,
    Raycaster,
    Scene,
    PointLight,
    Box,
    Sphere,
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

    // const camera1 = new Object3D();
    // camera1.copy(camera);
    // camera1.lookAt({ x: 100, y: 10, z: 10 });
    // camera1.updateMatrix();
    // console.log(camera1);

    // emotionBox 배열
    let itemRefs = [];
    const setItemRef = (el) => {
      itemRefs.push(el);
    };

    // 오브제 클릭
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

    function onClick(event) {
      seletedMesh.pos = event.component.mesh.position;
      seletedMesh.scl = event.component.mesh.scale;
    }

    // 설명 닫기
    function closeInfo() {
      isClick.value = false;
      gsap.to(camera.value.camera.position, {
        x: 0,
        y: 0,
        z: 100,
        duration: 1,
      });
    }

    onMounted(() => {
      renderer.value.onBeforeRender(() => {
        // itemRefs.forEach((item) => {
        //   item.mesh.rotation.x += 0.01;
        // });
      });
    });

    onUpdated(() => {});

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
    };
  },
  data() {
    return {
      hover: false,
    };
  },
  created() {},
  mounted() {},
  methods: {},
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
