import styles from "./Header.module.scss"

function Header({ title = "", subtitle = "" }) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{title}</h1>
            <h3 className={styles.subtitle}>{subtitle}</h3>
        </div>
    )
}

export default Header
