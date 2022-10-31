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
        categoryData: {},
        activity: 0,
        step: 0,
        color: '',
    }),
    getters: {
    },
    actions: {
        // DB에 추가하기
        addEmotion(name, emoji, content, category, activity, color) {
            const array = {
                'num': 0,
                'name': name,
                'emoji': emoji,
                'content': content,
                'category': category,
                'activity': activity,
                'color': color,
                'time': new Date(),
            };
            addDoc(emoColRef, array).then(() => {
                alert("감정이 등록되었습니다!");
                router.replace("/");
                window.location.reload();
            });
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
