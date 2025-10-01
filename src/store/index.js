import { createStore } from "@/libs/redux"

import reducer from "./reducers/taskReducer"

const store = createStore(reducer)


export default store
