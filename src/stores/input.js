import { defineStore } from 'pinia'
import emoColRef from "@/firebase";
import { addDoc } from "firebase/firestore";

export const useInputStore = defineStore('input', {
    state: () => ({
        num: 0,
        name: '사용자 이름',
        emoji: '😂',
        content: '경험 설명',
        category: 'none',
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
        createEmotion(name, emoji, content, category, activity) {
            const array = {
                'num': 0,
                'name': name,
                'emoji': emoji,
                'content': content,
                'category': category,
                'activity': activity,
                'time': new Date(),
            };

            addDoc(emoColRef, array);
            this.name = '';
            this.emoji = '';
            this.content = '';
            this.category = '';
            this.activity = 0;
            // this.$router.push("/");
        }
    },
})
