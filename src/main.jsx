import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import { Provider as ProviderRedux } from "./libs/react-redux.jsx"
import store from "./store/index.js"

createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <ProviderRedux store={store}>
        <App />
    </ProviderRedux>
    // </StrictMode>,
)
