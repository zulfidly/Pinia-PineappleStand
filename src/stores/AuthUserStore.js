import { defineStore } from 'pinia'
// import { acceptHMRUpdate } from 'pinia'

export const useAuthUserStore = defineStore(
    'AuthUserStore',
    {
        state: () => {
            return {
                username: 'yourNameIs',
            }
        }
    }
)

// if(import.meta.hot) {
//     import.meta.hot.accept(acceptHMRUpdate(useAuthUserStore, import.meta.hot))
// }