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
        isSave: false,
    }),
    getters: {
    },
    actions: {
        // DB에 추가하기
        addEmotion(password) {
            const array = {
                'name': this.name,
                'emoji': this.emoji,
                'content': this.content,
                'category': this.category,
                'activity': this.activity,
                'color': this.color,
                'time': new Date(),
                'categoryData': this.categoryData,
                'password': password
            };
            addDoc(emoColRef, array).then(() => {
                alert("감정이 등록되었어요!\n메인 화면 한 가운데에 띄워질 거예요.");
                this.isSave = false;
                // router.replace("/");
                window.location.href = "/";
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
