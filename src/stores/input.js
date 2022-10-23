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
        color: '',
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
            alert("A emotion have been uploaded!");
            router.push("/");
        },
        clearInput() {
            this.name = '';
            this.emoji = '';
            this.content = '';
            this.category = 'none';
            this.activity = 0;
            this.step = 0;
            this.color = '';
        },
        prevStep() {
            this.step--;
        },
        nextStep() {
            this.step++;
        }
    },
})
