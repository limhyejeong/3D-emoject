<template>
  <div class="home">
    <h2>Add</h2>

    <form @submit.prevent="outputEmotion">
      <div>😀😃🥹<input type="text" v-model="emoji" placeholder="이모지" /></div>

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
        <input type="number" v-model="activity" placeholder="활동성" />
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

      <button>output</button>
    </form>
  </div>
</template>

<script>
// import emoColRef from "../firebase";
// import { addDoc } from "firebase/firestore";
import { emojiDoc } from "@/assets/data/emojiDoc";

export default {
  data() {
    return {
      num: 0,
      name: null,
      content: null,
      emoji: null,
      category: null,
      count: 0,
      activity: 0,
      password: null,
      // tag: null,
    };
  },
  methods: {
    async outputEmotion() {
      // 입력된 이모지를 배열화 😀😃🥹
      let emoArray = [...this.emoji];
      let avgActivity,
        sumActivity = 0;

      // 인풋된 이모지를 등록된 이모지에서 찾아서 데이터 불러오기
      emoArray.forEach((element) => {
        for (let i = 0; i < emojiDoc.length; i++) {
          if (element == emojiDoc[i].input) {
            console.log("등록됨, " + element + +emojiDoc[i].num);
            sumActivity += emojiDoc[i].activity;
          }
        }
      });

      // 평균 활성도
      avgActivity = Math.floor(sumActivity / emoArray.length);
      this.activity = avgActivity;

      this.$emitter.emit("inputData", this.activity);

      // const addedDoc = await addDoc(emoColRef, this.$data);
      // alert("Document created successfully!");
      // console.log(addedDoc);
      this.$router.push("/output-emotion");
    },
  },
  mounted() {},
};
</script>
