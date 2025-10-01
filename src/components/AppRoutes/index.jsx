import { BrowserRouter, HashRouter, Route, Routes } from "react-router"

import TaskList from "@/pages/TaskList"
import NewTask from "@/pages/NewTask"
import EditTask from "@/pages/EditTask"
import Home from "@/pages/Home"

function AppRoutes() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/task-list" element={<TaskList />} />
                <Route path="/new-task" element={<NewTask />} />
                <Route path="task-list/:id/edit" element={<EditTask />} />
            </Routes>
        </HashRouter>
    )
}

export default AppRoutes
