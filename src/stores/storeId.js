import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    // 화살표 함수는 전체 유형 유추을 위해 권장됨. 
    state: () => {
        return {
            // 이 모든 속성은 자동으로 유형이 유추됨.
            count: 0,
            name: 'Eduardo',
            isAdmin: true,
        }
    },
    getters: {
        getUserById: (state) => {
            return (userId) => state.users.find((user) => user.id === userId)
        },
    },
})

