import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type State = {
  name: string
}

type Actions = {
  setName: (data: string) => void
}

const useWebGameStore = create(persist<State & Actions>((set, get) => ({
  name: '',
  setName: (data) => set({ name: data })
}),{
  name: "web-game",
  storage: createJSONStorage(() => sessionStorage),
  // getStorage: () => localStorage
  onRehydrateStorage: () => (state) => {
    // let data = JSON.parse(sessionStorage.getItem(NAME) as any)
    // console.log(data)
    // state?.toggle(false)
    // setTimeout(() => state?.toggle(false))
  }
}))

export default useWebGameStore