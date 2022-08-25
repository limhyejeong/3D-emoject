import { defineStore } from 'pinia'
import emoColRef from "@/firebase";
import { addDoc } from "firebase/firestore";

export const useInputStore = defineStore('input', {
    state: () => ({
        name: '헤정',
        emoji: '😀',
        activity: 0
    }),
    getters: {
        doubleCount(state) {
            return state.count * 2
        },
        create(state) {
            return state.name, state.emoji
        }
    },
    actions: {
        increment() {
            this.count++
        },
        randomizeCounter() {
            this.count = Math.round(100 * Math.random())
        },
        createEmotion(name, emoji, activity) {
            const array = { 'name': name, 'emoji': emoji, 'activity': activity };
            console.log(array);

            const addedDoc = addDoc(emoColRef, array);
            // alert("Document created successfully!");
            console.log(addedDoc);
            // this.$router.push("/");
        }
    },
})
