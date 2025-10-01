import { useNavigate } from "react-router"
import styles from "./Header.module.scss"

function Header() {
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <h1 onClick={() => navigate("/")} className={styles.title}>
                Redux
            </h1>
            <h3 className={styles.subtitle}>
                <a href="http://localhost:5173/React-Day-6/redux.html">
                    Redux core
                </a>{" "}
                &{" "}
                <span onClick={() => navigate("/task-list")}>React Redux</span>
            </h3>
        </div>
    )
}

export default Header
