const Redux = {
    __DO_NOT_USE__ActionTypes: {
        type: "Redux-by-Duyyy",
    },
    createStore(reducer, preloadedState) {
        let state = reducer(preloadedState, this.__DO_NOT_USE__ActionTypes)
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
    },
}

function reducer(state, action) {
    switch (action.type) {
        case "increase":
            return state + 1
        case "decrease":
            return state - 1
        case "reset":
            return 0
        default:
            return state
    }
}

const initValue = 0

export const store = Redux.createStore(reducer, initValue)
