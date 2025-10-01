import clsx from "clsx"
import PropTypes from "prop-types"

import styles from "./Buttons.module.scss"

function Buttons({
    primary = false,
    size = "medium",
    rounded = false,
    bordered = false,
    disabled = false,
    href,
    loading = false,
    onClick = () => {},
    children,
    className,
    ...passProps
}) {
    const classNames = clsx(styles.wrapper, className, styles[size], {
        [styles.primary]: primary,
        [styles.rounded]: rounded,
        [styles.bordered]: bordered,
        [styles.disabled]: disabled,
        [styles.loading]: loading,
    })

    const handleOnclick = (e) => {
        if (disabled || loading) {
            e.preventDefault()
            e.stopPropagation()
            return
        }
        onClick(e)
    }

    const Component = href ? "a" : "button"

    return (
        <>
            <Component
                {...passProps}
                disabled={disabled || loading}
                onClick={handleOnclick}
                className={classNames}
                href={href}
            >
                {loading ? <span>{children}</span> : children}
            </Component>
        </>
    )
}

Buttons.propTypes = {
    primary: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    rounded: PropTypes.bool,
    size: PropTypes.string,
    bordered: PropTypes.bool,
    href: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    onClick: PropTypes.func,
}

export default Buttons
