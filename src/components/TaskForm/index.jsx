import { useNavigate } from "react-router"
import styles from "./TaskForm.module.scss"
import { useEffect, useRef, useState } from "react"
import Buttons from "../Buttons"
import clsx from "clsx"

function TaskForm({
    initialData = {},
    onSubmit,
    submitText,
    isLoading = false,
}) {
    const navigate = useNavigate()
    const inputRef = useRef()
    const [title, setTitle] = useState(initialData.title)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()

            const length = inputRef.current.value.length
            inputRef.current.setSelectionRange(length, length)
        }
    }, [initialData])

    const handleOnChange = (e) => {
        setTitle(e.target.value)

        if (e.target.value.trim() === "") {
            setError(true)
        } else {
            setError(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (title.trim() !== "") {
            onSubmit({ title: title.trim() })
        }
    }

    return (
        <div className={styles.container}>
            {isLoading && <span>Loading ...</span>}

            {!isLoading && (
                <form className={styles.formBox}>
                    <label className={styles.labelInput}>
                        <input
                            ref={inputRef}
                            onChange={(e) => handleOnChange(e)}
                            name="input"
                            type="text"
                            className={styles.input}
                            placeholder="Your task..."
                            defaultValue={initialData.title}
                        />
                        <span
                            className={clsx(
                                styles.textError,
                                error ? styles.show : ""
                            )}
                        >
                            Cannot be left blank
                        </span>
                    </label>
                    <div className={styles.buttons}>
                        <button
                            type="button"
                            className={styles.cancelBtn}
                            onClick={() => navigate("/task-list")}
                        >
                            Cancel
                        </button>

                        <Buttons
                            disabled={error}
                            className={styles.saveBtn}
                            onClick={(e) => {
                                handleSubmit(e)
                            }}
                            size="small"
                        >
                            {submitText}
                        </Buttons>
                    </div>
                </form>
            )}
        </div>
    )
}

export default TaskForm
