import { create } from "zustand"

type State = {
  showLoginModal: boolean
}

type Actions = {
  setShowLoginModal: (data: boolean) => void
}

const useWebModalStore = create<State & Actions>(set => ({
  showLoginModal: false,
  setShowLoginModal: (data) => set({
    showLoginModal: data
  }),
})
)

export default useWebModalStore