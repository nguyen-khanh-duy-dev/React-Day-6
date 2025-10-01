import PropTypes from "prop-types"

import styles from "./TaskItem.module.scss"
import Buttons from "../Buttons"

function TaskItem({ task, onEdit, onDelete, isDeleting }) {
    return (
        <div className={styles.container}>
            <div>
                <input type="checkbox" id="checkbox" name="checkbox" />
                <span className={styles.taskTitle}>{task.title}</span>
            </div>
            <div className={styles.btns}>
                <Buttons
                    onClick={onEdit}
                    disabled={isDeleting}
                    size="small"
                    className={styles.cusEditBtn}
                >
                    Edit
                </Buttons>
                <Buttons
                    onClick={onDelete}
                    disabled={isDeleting}
                    size="small"
                    className={styles.cusDelBtn}
                >
                    Delete
                </Buttons>
            </div>
        </div>
    )
}

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    isDeleting: PropTypes.bool,
}

export default TaskItem
