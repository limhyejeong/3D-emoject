import { defineStore } from 'pinia'
import emoColRef from "@/firebase";
import { addDoc } from "firebase/firestore";
import router from "@/router/index"

export const useInputStore = defineStore('input', {
    state: () => ({
        num: 0,
        name: '혜정',
        emoji: '',
        content: '프로토타입용 생성 감정입니다',
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
        addEmotion(name, emoji, content, category, activity, color, categoryData) {
            const array = {
                'num': 0,
                'name': name,
                'emoji': emoji,
                'content': content,
                'category': category,
                'activity': activity,
                'color': color,
                'time': new Date(),
                'categoryData': categoryData
            };
            addDoc(emoColRef, array).then(() => {
                alert("감정이 등록되었습니다!");
                router.replace("/");
            });
        },
        clearInput() {
            this.name = '혜정';
            this.emoji = '';
            this.content = '프로토타입용 생성 감정입니다';
            this.category = 'none';
            this.activity = 0;
            this.step = 0;
            this.color = '';
            this.categoryData = '';
        },
        prevStep() {
            this.step--;
        },
        nextStep() {
            this.step++;
        }
    },
})
