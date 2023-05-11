import { defineStore } from 'pinia'
import { acceptHMRUpdate } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { groupBy } from 'lodash'
import { useAuthUserStore } from '@/stores/AuthUserStore.js'

// const authUserStore = useAuthUserStore()

export const useCartStore = defineStore(
    'CartStore',
    {
        state: () => {
            return {
                items: useLocalStorage('CartStore:items', []),
            }
        },
        getters: {
            count: (state) => state.items.length,
            isEmpty: (state) => state.count === 0,
            grouped: (state) =>{
                const grouped = groupBy(state.items, (item) => item.name)
                let sorted = Object.keys(grouped).sort()
                let inOrder = {}
                sorted.forEach((key) => (inOrder[key] = grouped[key]))
                return inOrder
            },
            groupCount: (state) => (name) => state.grouped[name].length,
            total: (state) => state.items.reduce((prev, curr) => prev + curr.price, 0),
        },
        actions: {
            checkout() {
                const authUserStore = useAuthUserStore()
                alert(`${authUserStore.username} just bought ${this.count} items at a total of $${this.total}`)
            },
            addItems(count, item) {
                count = parseInt(count)
                // throw new Error('example error');
                // console.log('addItems called');
                for(let index = 0; index < count; index++) {
                    this.items.push({ ...item})
                }
            },
            clearItem(itemName) {
                console.log(this);
                this.items = this.items.filter(item => item.name !== itemName)
            },
            setItemCount(item, count) {
                this.clearItem(item.name)
                this.addItems(count, item)
            }
        }
    }
)

// Hot Module Reload
// https://pinia.vuejs.org/api/modules/pinia.html#Functions-acceptHMRUpdate
if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}