import store from "@/store"
import { useEffect, useState } from "react"

// selector ở đây là một hàm
function useSelector(selector) {
    const [state, setState] = useState(() => {
        return selector(store.getState())
    })

    useEffect(() => {
        const unsubscribe = store.subscribe(() =>
            setState(selector(store.getState()))
        )

        return unsubscribe
    }, [selector])

    return state
}

export default useSelector
