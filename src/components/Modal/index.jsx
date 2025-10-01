import { IoClose } from "react-icons/io5"
import PropTypes from "prop-types"
import {
    useEffect,
    forwardRef,
    useImperativeHandle,
    useState,
    useRef,
} from "react"
import clsx from "clsx"

import styles from "./Modal.module.scss"

const Modal = forwardRef(function Modal(
    {
        children,
        shouldCloseOnOverlayClick = true,
        shouldCloseOnEsc = true,
        onAfterOpen,
        onAfterClose,
        isOpen = false,
        closeTimeoutMS = 300,
        className,
        onRequestOpen,
        onRequestClose,
        overlayClassName, // <— đúng spec
        bodyOpenClassName,
        htmlOpenClassName = "modal-open", // <— thêm HTML class theo spec
    },
    ref
) {
    const [mounted, setMounted] = useState(isOpen)
    const [visible, setVisible] = useState(isOpen)
    const prevFocusedRef = useRef(null)
    const contentRef = useRef(null)
    const openTimer = useRef(null)
    const closeTimer = useRef(null)

    // Bài 38: Update modal sử dụng forwardRef and props đặc biệt ref
    useImperativeHandle(
        ref,
        () => ({
            open: () => onRequestOpen?.(),
            close: () => onRequestClose?.(),
            toggle: () => (isOpen ? onRequestClose?.() : onRequestOpen?.()),
        }),
        [isOpen, onRequestOpen, onRequestClose]
    )

    // phản ứng theo isOpen
    useEffect(() => {
        if (isOpen) {
            setMounted(true)
            requestAnimationFrame(() => setVisible(true))

            if (bodyOpenClassName)
                document.body.classList.add(bodyOpenClassName)
            if (htmlOpenClassName)
                document.documentElement.classList.add(htmlOpenClassName)
            prevFocusedRef.current = document.activeElement

            clearTimeout(openTimer.current)
            openTimer.current = setTimeout(() => {
                contentRef.current?.focus()
                onAfterOpen?.()
            }, closeTimeoutMS)
        } else if (mounted) {
            setVisible(false)
            clearTimeout(closeTimer.current)
            closeTimer.current = setTimeout(() => {
                onAfterClose?.()
                if (bodyOpenClassName)
                    document.body.classList.remove(bodyOpenClassName)
                if (htmlOpenClassName)
                    document.documentElement.classList.remove(htmlOpenClassName)
                prevFocusedRef.current?.focus?.()
                setMounted(false)
            }, closeTimeoutMS)
        }
        return () => {
            clearTimeout(openTimer.current)
            clearTimeout(closeTimer.current)
        }
    }, [isOpen, mounted, closeTimeoutMS, bodyOpenClassName, htmlOpenClassName, onAfterOpen, onAfterClose])

    // ESC
    useEffect(() => {
        if (!shouldCloseOnEsc || !mounted) return
        const handler = (e) => {
            if (e.key === "Escape") onRequestClose?.()
        }
        document.addEventListener("keydown", handler)
        return () => document.removeEventListener("keydown", handler)
    }, [shouldCloseOnEsc, mounted, onRequestClose])

    if (!mounted) return null

    return (
        <div className={styles.modal}>
            <div
                ref={contentRef}
                tabIndex={-1}
                className={clsx(
                    styles.content,
                    className,
                    visible ? styles.contentOpen : styles.contentClose
                )}
                role="dialog"
                aria-modal="true"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <button
                    className={styles.closeBtn}
                    onClick={() => onRequestClose?.()}
                >
                    <IoClose />
                </button>
                <div className={styles.inner}>{children}</div>
            </div>

            <div
                className={clsx(
                    styles.overlay,
                    overlayClassName,
                    visible ? styles.overlayOpen : styles.overlayClose
                )}
                onMouseDown={(e) => {
                    if (!shouldCloseOnOverlayClick) return
                    // chỉ khi click đúng overlay
                    if (e.target === e.currentTarget) onRequestClose?.()
                }}
            />
        </div>
    )
})

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onRequestClose: PropTypes.func,
    onRequestOpen: PropTypes.func,
    closeTimeoutMS: PropTypes.number,
    overlayClassName: PropTypes.string,
    className: PropTypes.string,
    bodyOpenClassName: PropTypes.string,
    shouldCloseOnEsc: PropTypes.bool,
    shouldCloseOnOverlayClick: PropTypes.bool,
    onAfterClose: PropTypes.func,
    onAfterOpen: PropTypes.func,
    htmlOpenClassName: PropTypes.string,
}

export default Modal
