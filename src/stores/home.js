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
        deleteEmotion(emotionPassword, emotionId) {
            let pass = prompt('삭제를 위해 등록 시 입력한 암호를 입력해주세요.');
            if (emotionPassword == pass) {
                let emoRef = doc(emoColRef, emotionId);
                deleteDoc(emoRef).then(() => {
                    alert("감정이 삭제되었습니다");
                    window.location.reload();
                });
            } else {
                alert("암호가 맞지 않습니다.");
            }
        },
    },
})
