import useDispatch from "@/hooks/useDispatch/useDispatch"
import { useNavigate } from "react-router"

import styles from "./NewTask.module.scss"
import TaskForm from "@/components/TaskForm"
import Header from "@/components/Header"

function NewTask() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleAddTask = async (inputValue) => {
        try {
            const response = await fetch(`http://localhost:5000/tasks/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: inputValue.title,
                }),
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const newTask = await response.json()

            dispatch({
                type: "ADD_TASK",
                payload: newTask,
            })

            navigate("/task-list")
        } catch (error) {
            dispatch({
                type: "SET_ERROR",
                payload: error.message,
            })
        }
    }
    return (
        <div className={styles.container}>
            <Header />
            <TaskForm
                initialData={{}}
                onSubmit={handleAddTask}
                submitText={"Create"}
            />
        </div>
    )
}

export default NewTask
