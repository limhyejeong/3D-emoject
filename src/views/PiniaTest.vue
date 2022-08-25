<template>
  <button @click="increment">증가</button>
  <button @click="randomizeCounter">랜덤</button>
  <div>{{ name }}</div>
  <div>{{ doubleCount }}</div>
  <div>{{ store }}</div>
  <p>Count is {{ store.count }}</p>
  <p>Double count is {{ store.doubleCount }}</p>
</template>

<script>
import { useCounterStore } from "@/stores/counter";
// import { useStore } from "@/stores/storeId";
import { storeToRefs } from "pinia";

export default {
  name: "PiniaTest",
  setup() {
    const store = useCounterStore();
    // const store = useStore();

    // `name`과 `doubleCount`는 반응형 refs임.
    // 이것은 플러그인에 의해 추가된 속성에 대한 'refs'도 생성함.
    // 그러나 모든 액션 또는 비반응형(ref/반응형이 아닌) 속성을 건너뜀.
    const { name, doubleCount } = storeToRefs(store);
    // increment 액션은 그냥 추출 가능.
    const { increment } = store;
    const { randomizeCounter } = store;

    // 값 변경
    store.$patch({
      count: store.count,
      age: 120,
      //   name: "DIO",
    });

    store.$subscribe((mutation, state) => {
      mutation.type; // 'direct' | 'patch object' | 'patch function'
      mutation.storeId; // `cartStore.$id`와 동일.
      // `mutation.type === 'patch object'`에서만 사용 가능.
      mutation.payload; // cartStore.$patch()에 전달된 패치 객체

      // 변경될 때마다 전체 상태를 로컬 스토리지에 유지
      localStorage.setItem("cart", JSON.stringify(state));
    });

    return {
      store,
      name,
      doubleCount,
      increment,
      randomizeCounter,
    };
  },
  computed: {},
  method: {
    randomizeCounter() {
      this.store.randomizeCounter();
      console.log("랜덤숫자: ", this.store.count);

      //   this.count = Math.round(100 * Math.random());
    },
  },
};
</script>
