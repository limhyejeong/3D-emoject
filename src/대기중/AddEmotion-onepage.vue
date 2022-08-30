<template>
  <div class="home">
    <h2>Add</h2>

    <form @submit.prevent="createEmotion">
      <div>
        <input type="text" v-model="emoji" placeholder="이모지" />
      </div>

      <div>
        <label>번호</label>
        <input type="number" v-model="num" placeholder="번호" />
        <br />
        <label>감정 종류</label>
        <select v-model="category">
          <option value="joy">Joy</option>
          <option value="sad">Sad</option>
        </select>
        <br />
        <label>복합성</label>
        <input type="number" v-model="count" placeholder="복합성" />
        <br />
        <label>활동성</label>
        <input type="number" v-model="activation" placeholder="활동성" />
      </div>

      <div>
        <input type="text" v-model="name" placeholder="이름" />
      </div>

      <br />
      <div>
        <textarea
          name=""
          v-model="content"
          cols="30"
          rows="10"
          placeholder="설명"
        ></textarea>
      </div>

      <div>
        <input type="password" v-model="password" placeholder="password" />
      </div>

      <!-- <input type="password" v-model="password" placeholder="password"> -->

      <button type="">Create</button>
    </form>
  </div>
</template>

<script>
import emoColRef from "../firebase";
import { addDoc } from "firebase/firestore";

export default {
  name: "AddEmotion",
  data() {
    return {
      num: 0,
      name: null,
      content: null,
      emoji: null,
      category: null,
      count: 0,
      activation: 0,
      password: null,
      // tag: null,
    };
  },
  methods: {
    async createEmotion() {
      console.log("creating");
      const addedDoc = await addDoc(emoColRef, this.$data);
      alert("Document created successfully!");
      console.log(addedDoc);
      this.$router.push("/");
    },
  },
};
</script>
