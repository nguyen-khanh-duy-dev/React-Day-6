const __DO_NOT_USE__ActionTypes = {
    type: "Redux-by-Duyyy",
}

const createStore = (reducer, preloadedState) => {
    let state = reducer(preloadedState, __DO_NOT_USE__ActionTypes)
    let listeners = []
    return {
        getState() {
            return state
        },
        dispatch(action) {
            state = reducer(state, action)
            listeners.forEach((listener) => listener())
        },
        subscribe(listener) {
            listeners.push(listener)

            return () => {
                listeners = listeners.filter((lis) => lis !== listener)
            }
        },
    }
}

export { createStore }
