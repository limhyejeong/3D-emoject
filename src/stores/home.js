import { defineStore } from 'pinia'
import emoColRef from "@/firebase";
import { getDocs } from "firebase/firestore";

export const useHomeStore = defineStore('home', {
    state: () => ({
        joy: [],
        etc: []
    }),
    getters: {

    },
    actions: {
        fetchEmotions() {
            this.joy = []; // 비우기
            this.etc = [];

            let emotionsSnapshot = getDocs(emoColRef);

            emotionsSnapshot.then((emotionsSnap) => {
                emotionsSnap.forEach((emotion) => {
                    let emotionData = emotion.data();
                    // emotionData.id = emotion.id;
                    if (emotionData.category == "joy") {
                        this.joy.push(emotionData);
                    } else {
                        this.etc.push(emotionData);
                    }
                });
            })

        },
    },
})
