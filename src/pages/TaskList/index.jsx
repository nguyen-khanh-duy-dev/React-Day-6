import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router"
import { FiPlus } from "react-icons/fi"

import useDispatch from "@/hooks/useDispatch/useDispatch"
import useSelector from "@/hooks/useSelector/useSelector"
import styles from "./TaskList.module.scss"
import TaskItem from "@/components/TaskItem"
import Modal from "@/components/Modal"
import Buttons from "@/components/Buttons"
import Header from "@/components/Header"

function TaskList() {
    const dispatch = useDispatch()

    const { tasks, loading, error } = useSelector((state) => state)
    const [isDeleting, setIsDeleting] = useState(false)
    const [currentTask, setCurrentTask] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        // Trước khi fetch data => Dispatch action với loading
        dispatch({
            type: "SET_LOADING",
            payload: true,
        })

        fetch("http://localhost:5000/tasks")
            .then((res) => {
                if (!res.ok) throw new Error("Network error")
                return res.json()
            })
            .then((tasks) =>
                dispatch({
                    type: "SET_TASKS",
                    payload: tasks,
                })
            )
            .catch((error) => {
                dispatch({
                    type: "SET_ERROR",
                    payload: error.message,
                })
            })
    }, [dispatch])

    const handleDelete = async (taskId) => {
        if (!taskId) return
        try {
            // Nếu set loading khi bấm delete sẽ gây ra nhảy giao diện ko cần thiết
            // dispatch({ type: "SET_LOADING", payload: true })
            const response = await fetch(
                `http://localhost:5000/tasks/${taskId}`,
                {
                    method: "DELETE",
                }
            )

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            // Thành công - xóa khỏi store
            dispatch({
                type: "DELETE_TASK",
                payload: taskId,
            })
        } catch (error) {
            dispatch({
                type: "SET_ERROR",
                payload: error.message,
            })
        }

        setCurrentTask(null)
        setIsDeleting(false)
    }

    const closeModal = () => {
        setIsDeleting(false)
    }

    const handleEdit = (id) => {
        navigate(`${id}/edit`)
    }

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                {loading && <div>Đang tải...</div>}
                {error && <div className="error-banner">⚠️ {error}</div>}
                {/* Hiển thị tasks (có thể là data cũ nếu fetch lỗi) */}

                <div className={styles.listItem}>
                    <div className={styles.headerTaskList}>
                        <h1 className={styles.heading}>Daily Tasks</h1>
                        {!error && (
                            <Buttons
                                onClick={() => navigate("/new-task")}
                                className={styles.btnAdd}
                            >
                                <FiPlus /> New Task
                            </Buttons>
                        )}
                    </div>
                    {tasks.length > 0 ? (
                        <>
                            {tasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onEdit={() => {
                                        handleEdit(task.id)
                                    }}
                                    onDelete={() => {
                                        setIsDeleting(true)
                                        setCurrentTask(task.id)
                                    }}
                                    isDeleting={isDeleting}
                                />
                            ))}
                        </>
                    ) : (
                        !error && (
                            <div className={styles.wrapperNothing}>
                                <p>Nothing ...</p>
                            </div>
                        )
                    )}
                </div>

                <Modal isOpen={isDeleting} onRequestClose={() => closeModal()}>
                    <div className={styles.headingModal}>
                        Are you sure delete it ??
                    </div>
                    <div className={styles.btns}>
                        <button
                            onClick={() => setIsDeleting(false)}
                            className={styles.btnModalCancel}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => handleDelete(currentTask)}
                            className={styles.btnModalSure}
                        >
                            Sure
                        </button>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default TaskList
