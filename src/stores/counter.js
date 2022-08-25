import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
    state: () => ({ count: 0, name: 'Eduardo' }),
    getters: {
        // 자동으로 반환 유형을 숫자로 유추함.
        doubleCount(state) {
            return state.count * 2
        },
        // // 반환 유형은 **반드시** 명시적으로 설정되어야 함.
        // doublePlusOne(): number {
        //     // 전체 스토어에 대한 자동 완성 및 타이핑 ✨
        //     return this.doubleCount + 1
        // },
    },
    actions: {
        increment() {
            this.count++
        },
        randomizeCounter() {
            this.count = Math.round(100 * Math.random())
        },
    },
})

