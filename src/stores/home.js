import { defineStore } from 'pinia'
import emoColRef from "@/firebase";
import { getDocs, doc, deleteDoc } from "firebase/firestore";


export const useHomeStore = defineStore('home', {
    state: () => ({
        emotions: [],
        // cate: {
        //     joy: [],
        //     trust: [],
        //     anticipation: [],
        //     sadness: [],
        //     surprise: [],
        //     anger: [],
        //     fear: [],
        //     disgust: [],
        // }
    }),
    getters: {

    },
    actions: {
        // 데이터 불러오기
        fetchEmotions() {
            let emotionsSnapshot = getDocs(emoColRef);
            let emotions = [];

            emotionsSnapshot.then((emotionsSnap) => {
                emotionsSnap.forEach((emotion) => {
                    let emotionData = emotion.data();
                    emotionData.id = emotion.id;
                    emotions.push(emotionData);
                });
                this.emotions = emotions;
            });
        },

        // 데이터 삭제
        deleteEmotion(emotionId) {
            if (confirm("감정을 삭제하시겠습니까?")) {
                let emoRef = doc(emoColRef, emotionId);
                deleteDoc(emoRef).then(() => {
                    alert("감정이 삭제되었습니다");
                    window.location.reload();
                });
            }
        },
    },
})
