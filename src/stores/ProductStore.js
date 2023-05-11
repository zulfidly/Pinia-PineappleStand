import { defineStore } from 'pinia'
import { acceptHMRUpdate } from 'pinia';

// import products from '@/data/products.json'

export const useProductStore = defineStore(
    'ProductStore',
    {
        state: () => {
            return {
                products: [],
            }
        },
        actions: {
            async fill() {
                console.log(this);
                this.products = (await import('@/data/products.json')).default      //might need a catch
            }
        }
    }
)

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}