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
      :lookAt="{ x: 0, y: 0, z: 0 }"
    />

    <Raycaster ref="" @click="onClick" />

    <Scene ref="scene" background="#000">
      <PointLight :position="{ z: 200, y: 200, z: 200 }" />

      <Box
        v-for="els in etc"
        :ref="setItemRef"
        :key="els.id"
        :scale="{ x: 10, y: 10, z: 10 }"
        :position="{
          x: 0,
          y: 0,
          z: 0,
        }"
        @click="boxClick(els)"
      >
        <PhongMaterial />
      </Box>

      <Sphere
        v-for="joys in joy"
        :ref="setItemRef"
        :key="joys.id"
        :rotation="{
          y: Math.PI / 4,
          z: Math.PI / 4,
        }"
        :scale="{ x: 10, y: 10, z: 10 }"
        :position="{
          x: 20,
          y: 0,
          z: 0,
        }"
        @click="boxClick(joys)"
      >
        <PhongMaterial />
      </Sphere>
    </Scene>
  </Renderer>
</template>

<script>
import { useHomeStore } from "@/stores/home";
import { storeToRefs } from "pinia";
import { THREE, Vector3 } from "three";
import { ref, onUpdated, onMounted } from "vue";
import { gsap } from "gsap";
import {
  Renderer,
  Camera,
  Scene,
  PointLight,
  Box,
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
    Scene,
    PointLight,
    Box,
    PhongMaterial,
    Stats,
  },
  setup() {
    const store = useHomeStore();
    const { joy, etc } = storeToRefs(store);
    const { fetchEmotions } = store;
    const renderer = ref(null);
    const camera = ref(null);
    let seletedData = ref("");
    let seletedMesh = {};
    let isClick = ref(false);

    // emotionBox 배열
    let itemRefs = [];
    const setItemRef = (el) => {
      itemRefs.push(el);
    };

    fetchEmotions();

    // 오브제 클릭
    function boxClick(data) {
      if (isClick.value == false) {
        isClick.value = true;
        seletedData.value = data;
      }

      gsap.to(camera.value.camera.position, {
        z: seletedMesh.pos.z + seletedMesh.scl.z * 5,
        duration: 0.75,
      });
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
      etc,
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
