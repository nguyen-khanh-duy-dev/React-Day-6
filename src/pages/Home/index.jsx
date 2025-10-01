import Header from "@/components/Header"
import styles from "./Home.module.scss"
import Buttons from "@/components/Buttons"
import { useNavigate } from "react-router"

function Home() {
    const navigate = useNavigate()

    return (
        <div className={styles.container}>
            <Header title="Redux" subtitle="Redux core & React Redux" />

            <div className={styles.content}>
                <Buttons
                    target="_blank"
                    href={"http://localhost:5173/React-Day-6/redux.html"}
                    className={styles.customBtn}
                >
                    <div className={styles.contentBox}>
                        <div className={styles.headerBox}>
                            <img src="redux-icon.png" alt="redux-icon" />
                            <h3>Redux Core</h3>
                        </div>
                        <span>Counter App Demo</span>
                    </div>
                </Buttons>
                <Buttons
                    onClick={() => {
                        navigate("/task-list")
                    }}
                    className={styles.customBtn}
                >
                    <div className={styles.contentBox}>
                        <div className={styles.headerBox}>
                            <img src="redux-icon.png" alt="redux-icon" />
                            <h3>React Redux</h3>
                        </div>
                        <span>Todyy App Demo</span>
                    </div>
                </Buttons>
                
            </div>
        </div>
    )
}

export default Home
