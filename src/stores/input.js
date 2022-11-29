import { defineStore } from 'pinia'
import emoColRef from "@/firebase";
import { addDoc } from "firebase/firestore";
import router from "@/router/index"

export const useInputStore = defineStore('input', {
    state: () => ({
        name: '',
        emoji: '',
        content: '',
        category: 'none',
        categoryData: {},
        activity: 0,
        step: 0,
        color: '',
        password: '',
    }),
    getters: {
    },
    actions: {
        // DB에 추가하기
        addEmotion(name, emoji, content, category, activity, color, categoryData, password) {
            const array = {
                'name': name,
                'emoji': emoji,
                'content': content,
                'category': category,
                'activity': activity,
                'color': color,
                'time': new Date(),
                'categoryData': categoryData,
                'password': password
            };
            addDoc(emoColRef, array).then(() => {
                alert("감정이 등록되었습니다!");
                router.replace("/");
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
            this.categoryData = {};
            this.password = '';
        },
        prevStep() {
            this.step--;
        },
        nextStep() {
            this.step++;
        }
    },
})
