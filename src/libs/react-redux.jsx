import { createContext } from "react"
import store from "@/store"

const Context = createContext()

const Provider = ({ children }) => {
    // eslint-disable-next-line no-undef
    return <Context.Provider value={store}>{children}</Context.Provider>
}

export { Provider }
