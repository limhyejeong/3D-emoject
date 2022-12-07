import { defineStore } from 'pinia'
import emoColRef from "@/firebase";
import { getDocs, doc, deleteDoc } from "firebase/firestore";


export const useHomeStore = defineStore('home', {
    state: () => ({
        emotions: [],
        isDelete: false,
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
        deleteEmotion(checkPassword, emotionPassword, emotionId) {
            if (emotionPassword == checkPassword.value) {
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
