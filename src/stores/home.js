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
        // fetchEmotions() {
        //     let emotionsSnapshot = getDocs(emoColRef);

        //     emotionsSnapshot.then((emotionsSnap) => {
        //         emotionsSnap.forEach((emotion) => {
        //             let emotionData = emotion.data();
        //             if (emotionData.category == 'joy')
        //                 this.cate.joy.push(emotionData);
        //             else if (emotionData.category == 'trust')
        //                 this.cate.trust.push(emotionData);
        //             else if (emotionData.category == 'anticipation')
        //                 this.cate.anticipation.push(emotionData);
        //             else if (emotionData.category == 'sadness')
        //                 this.cate.sadness.push(emotionData);
        //             else if (emotionData.category == 'surprise')
        //                 this.cate.surprise.push(emotionData);
        //             else if (emotionData.category == 'anger')
        //                 this.cate.anger.push(emotionData);
        //             else if (emotionData.category == 'fear')
        //                 this.cate.fear.push(emotionData);
        //             else if (emotionData.category == 'disgust')
        //                 this.cate.disgust.push(emotionData);
        //             else
        //                 console.log("해당되는 카테고리가 없습니다.")
        //         });
        //     })

        //     this.cate.joy = [];
        //     this.cate.trust = [];
        //     this.cate.anticipation = [];
        //     this.cate.sadness = [];
        //     this.cate.surprise = [];
        //     this.cate.anger = [];
        //     this.cate.fear = []
        //     this.cate.disgust = [];
        // },


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
                deleteDoc(emoRef);
                alert("감정이 삭제되었습니다");
                location.reload();
            }
        },
    },
})
