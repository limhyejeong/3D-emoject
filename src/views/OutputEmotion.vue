<template>
  <hr />
  <h3>Output</h3>
  <p>{{ name }}, {{ emoji }}, {{ activity }}</p>
  <button @click="createEmotion(name, emoji, activity)">감정 등록</button>
</template>

<script>
import { useInputStore } from "@/stores/input";
import { storeToRefs } from "pinia";
// import emoColRef from "@/firebase";
// import { addDoc } from "firebase/firestore";

export default {
  name: "OutputEmotion",
  setup() {
    const store = useInputStore();

    const { name, emoji, activity } = storeToRefs(store);
    // const inputData = storeToRefs(store);
    const { createEmotion } = store;

    // function createEmotion() {
    //   console.log(store.name);
    //   const addedDoc = addDoc(emoColRef, store);
    //   alert("Document created successfully!");
    //   console.log(addedDoc);
    //   // this.$router.push("/");
    // }

    return {
      store,
      name,
      emoji,
      activity,
      // inputData,
      createEmotion,
    };
  },
  // data() {
  //   return {
  //     store: store,
  //     name: name,
  //     emoji: emoji,
  //     activity: activity,
  //   };
  // },
  // methods: {
  //   async createEmotion() {
  //     console.log("creating");
  //     const addedDoc = await addDoc(emoColRef, this.$data);
  //     alert("Document created successfully!");
  //     console.log(addedDoc);
  //     this.$router.push("/");
  //   },
  // },
};
</script>
