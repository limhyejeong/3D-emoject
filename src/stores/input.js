import { defineStore } from 'pinia'
import emoColRef from "@/firebase";
import { addDoc } from "firebase/firestore";
import router from "@/router/index"

export const useInputStore = defineStore('input', {
    state: () => ({
        num: 0,
        name: '',
        emoji: '',
        content: '',
        category: 'none',
        activity: 0,
        step: 0,
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
        addEmotion(name, emoji, content, category, activity) {
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
            alert("등록 완료");

            router.push("/");
        },
        clearInput() {
            this.name = '';
            this.emoji = '';
            this.content = '';
            this.category = 'none';
            this.activity = 0;
            this.step = 0;
        },
        prevStep() {
            this.step.value--;
        },
        nextStep() {
            this.step.value++;
        }
    },
})
