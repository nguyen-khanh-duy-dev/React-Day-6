import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

import useDispatch from "@/hooks/useDispatch/useDispatch"
import useSelector from "@/hooks/useSelector/useSelector"
import TaskForm from "@/components/TaskForm"

function EditTask() {
    const [formValue, setFormValue] = useState({
        id: "",
        title: "",
    })
    const param = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()
    const { tasks } = useSelector((state) => state)

    useEffect(() => {
        if (tasks.length > 0) {
            const currentTask = tasks.filter((task) => task.id === param.id)
            setFormValue({
                id: currentTask[0].id,
                title: currentTask[0].title,
            })
        }
    }, [param.id, tasks])

    const updateTask = async (inputValue) => {
        setIsLoading(true)
        try {
            const response = await fetch(
                `http://localhost:5000/tasks/${param.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: inputValue.title,
                    }),
                }
            )
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            dispatch({
                type: "UPDATE_TASK",
                payload: { id: param.id, title: inputValue.title },
            })

            navigate("/")
        } catch (error) {
            setIsLoading(false)
            dispatch({
                type: "SET_ERROR",
                payload: error.message,
            })
        }
    }

    return (
        <TaskForm
            initialData={formValue}
            onSubmit={updateTask}
            submitText={"Update"}
            isLoading={isLoading}
        />
    )
}

export default EditTask
