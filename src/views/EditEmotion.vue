<template>
  <div class="home">
    <h2>Edit emotion</h2>

    <form @submit.prevent="updateEmotion">
        <input type="text" v-model="emotionInfo.name" id="name" placeholder="name"/>
        <textarea name="" v-model="emotionInfo.content" cols="30" rows="10" placeholder="감정 설명"></textarea>

        <button type="">Edit Emotion</button>
    </form>
  </div>
</template>

<script>
import emoColRef from '../firebase';
import { getDoc, doc, setDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      selectedEmotion: {},
      emotionId: null,
      docRef: null,
      name: null,
      emotionInfo: {
        name: null,
        content: null
      }
    }
  },
  methods: {
    async getEmotion() {
      let emotionRef = doc(emoColRef, this.emotionId);
      this.docRef = emotionRef;
      let emotion = await getDoc(this.docRef);
      let emotionData = emotion.data();
      this.emotionInfo.name = emotionData.name;
      this.emotionInfo.content = emotionData.content;
    },
    async updateEmotion() {
      await setDoc(this.docRef, this.emotionInfo)
      alert(`The city with ID of ${this.emotionId} has been updated successfully`);
      this.$router.push("/");
    },
  },
  created() {
    let emotionId = this.$route.params.emotionId;
    this.emotionId = emotionId;
    this.getEmotion();
  }
}
</script>
