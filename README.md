# [The Pineapple Stand](https://gleeful-souffle-56603a.netlify.app/)
- a coding practice on [Vue 3](https://vuejs.org/guide/introduction.html) Composition & [Pinia](https://pinia.vuejs.org/) state management

![Pinia logo](/dist/images/logos.png)
- a tutorial by [vueschool.io](https://vueschool.io/courses/pinia-the-enjoyable-vue-store)

## Pinia integration
```
npm install pinia
```
```
// main.js
import {createPinia} from 'pinia'
createApp(App).use(createPinia()).mount("#app")
```
```
// CartStore.js
import { defineStore } from 'pinia'
import { acceptHMRUpdate } from 'pinia';
export const useCartStore = defineStore(
    'CartStore',
    {
        state: ....,
        getter: ....,
        actions: ....,
    }
)
```
```
// CartWidget.vue
import { useCartStore } from '@/stores/CartStore.js'
const cartStore = useCartStore()
// we can now access cartStore properties as a reactive object
```






## How to Use Tutorial
```
npx degit vueschool/pinia-course-boilerplate 
npm install
npm run dev
npm run build
```
