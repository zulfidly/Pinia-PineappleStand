<script setup>
import { ref, reactive } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import AppButton from '@/components/AppButton.vue'
import { useProductStore } from '@/stores/ProductStore.js'
import { useCartStore } from '@/stores/CartStore.js'

const cartStore = useCartStore()
const productStore = useProductStore()   //when used with v-for="product in productStore.products"

const doingHistory = ref(false)
const history = reactive([])
const future = reactive([])
history.push(JSON.stringify(cartStore.$state))    // records the initial blank state

const redo = ()=> {
  const latestState = future.pop()
  if(!latestState) return
  doingHistory.value = true
  history.push(latestState)
  cartStore.$state = JSON.parse(latestState)
  doingHistory.value = false
}

const undo = ()=> {           // revert to previous cartStore state
  if(history.length === 1) return
  doingHistory.value = true
  future.push(history.pop())
  cartStore.$state = JSON.parse(history.at(-1))     // -1 returns the last element of the array
  doingHistory.value = false
}

// Subscribe to the State
cartStore.$subscribe((mutation, state) => {
  if(!doingHistory.value) {
    history.push(JSON.stringify(state))     // history will track the cartStore state after every addItems
    future.splice(0, future.length)
  }
  console.log(mutation);
  console.log(state);         // see the current state after the mutation has completed
})


// Subscribing to Actions using $onAction
// In this lesson, we learn how to subscribe to Pinia actions in order to perform custom side effects on the run, completion, and/or error of an action.
// can be used to implement a undo/redo feature
cartStore.$onAction(({name, store, args, after, onError}) => {
  if(name === 'addItems') {
    after(() => {               // run console.log only after the addItems action executed
      console.log(args[0])    
    })
    onError((error) => {        // simulating an error after addItems is executed
      console.log('Hello error: ', error.message);
    })
  }
})

productStore.fill()
// import { storeToRefs } from "pinia";
// const {products} = storeToRefs(useProductStore()) //destructure the store object using storeToRefs, use with: v-for="product in products"

// const addToCart2 = (count, product) => {      // use this with  @addToCart="addToCart($event, product)"
//   console.log(count);
//   count = parseInt(count)
//   cartStore.$patch(state => {     // example when using $patch 
//     for (let index = 0; index < count; index++) {
//       state.items.push(product)
//     }
//     console.log(state);
//     console.log(state.items);
//   })
// }
</script>

<template>
  <div class="container">
    <TheHeader />

    <div class='mb-5 flex justify-end'>
      <AppButton @click="undo">Undo</AppButton>
      <AppButton class="ml-2" @click="redo">Redo</AppButton>
    </div>

    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard        
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.addItems($event, product)"
      />
    </ul>
  </div>
</template>
