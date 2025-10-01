const initState = {
    tasks: [],
    loading: false,
    error: null,
}

function reducer(state = initState, action) {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload,
                error: null,
            }
        case "SET_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case "SET_TASKS":
            return {
                ...state,
                tasks: action.payload,
                loading: false,
                error: null,
            }
        case "ADD_TASK":
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
            }
        case "UPDATE_TASK":
            console.log(action.payload)

            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id
                        ? { ...task, title: action.payload.title }
                        : task
                ),
            }
        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
                loading: false,
                error: null,
            }
        default:
            return state
    }
}

export default reducer
