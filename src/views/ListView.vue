<template>
  <div class="home">
    <h2>Home</h2>
    <div>
      <ul>
        <li v-for="emotion in emotions" :key="emotion.id">
          {{ emotion.name }}
          <router-link :to="{ path: `/emotions/${emotion.id}` }" class="editBtn"
            >Edit</router-link
          >
          <a href="#" class="delBtn" @click="deleteEmotion(emotion.id)"
            >Delete</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import emoColRef from "../firebase";
import { getDocs, doc, deleteDoc } from "firebase/firestore";

export default {
  name: "ListView",
  components: {},
  data() {
    return {
      emotions: [],
      seletedDoc: null,
    };
  },
  methods: {
    async fetchEmotions() {
      let emotionsSnapshot = await getDocs(emoColRef);
      let emotions = [];
      emotionsSnapshot.forEach((emotion) => {
        let emotionData = emotion.data();
        emotionData.id = emotion.id;
        emotions.push(emotionData);
      });
      this.emotions = emotions;
    },
    async deleteEmotion(emotionId) {
      let emoRef = doc(emoColRef, emotionId);
      await deleteDoc(emoRef);
      alert("emotion deleted successully");
      this.$router.go();
    },
  },
  created() {
    this.fetchEmotions();
  },
};
</script>

<style lang="scss">
li {
  border: 1px solid #eee;
  padding: 20px 0;
  margin-bottom: 10px;
  list-style: none;
}
.editBtn {
  background: blue;
  color: white;
  padding: 10px;
  border-radius: 50%;
}
.delBtn {
  background: red;
  color: white;
  padding: 10px;
  border-radius: 50%;
}
</style>
