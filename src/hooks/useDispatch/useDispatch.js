import store from "@/store"

function useDispatch() {
    return store.dispatch
}

export default useDispatch
