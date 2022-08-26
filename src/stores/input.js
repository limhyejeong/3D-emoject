import { defineStore } from 'pinia'
import emoColRef from "@/firebase";
import { addDoc } from "firebase/firestore";

export const useInputStore = defineStore('input', {
    state: () => ({
        name: '헤정',
        emoji: '😀',
        content: '좋은 경험',
        activity: 0
    }),
    getters: {
        // doubleCount(state) {
        //     return state.count * 2
        // },
        // create(state) {
        //     return state.name, state.emoji
        // }
    },
    actions: {
        // DB에 추가하기
        createEmotion(name, emoji, content, activity) {
            const array = {
                'name': name,
                'emoji': emoji,
                'content': content,
                'activity': activity,
                'time': new Date(),
            };
            console.log(array);

            const addedDoc = addDoc(emoColRef, array);
            // alert("Document created successfully!");
            console.log(addedDoc);
            // this.$router.push("/");
        }
    },
})
