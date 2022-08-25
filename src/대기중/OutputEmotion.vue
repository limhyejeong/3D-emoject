<template>
  <!-- <h2>{{ activity }}</h2> -->
  <button :count="count" @click="inc">btn</button>
  {{ count }}
</template>

<script setup></script>

<script>
import { ref, onMounted, onBeforeUpdate, onUpdated } from "vue";

export default {
  name: "OutputEmotion",
  emits: [],
  // setup(emit) {
  //   console.log(emit);
  //   let activity = ref(20);

  //   // onBeforeUpdate(() => {
  //   //   // this.$emitter?.on("inputData", alertData);
  //   //   console.log("onBeforeUpdate");
  //   // });
  //   // onUpdated(() => {
  //   //   console.log(activity);
  //   //   console.log("onUpdated");
  //   // });

  //   function getData(indata) {
  //     console.log(indata);
  //     activity.value = indata;
  //     console.log(this.activity);
  //   }

  //   onMounted(() => {
  //     console.log("onMounted");
  //     this?.$emitter?.on("inputData");
  //   });

  //   return {
  //     activity,
  //     getData,
  //   };
  // },
  data() {
    return {
      // activity: 100,
    };
  },
  mounted() {
    // this.$emitter.on("inputData", this.alertData);
    // this.alertData;
  },
  methods: {
    // alertData(indata) {
    //   this.activity = indata;
    //   console.log(this.activity);
    // },
  },
};
</script>
