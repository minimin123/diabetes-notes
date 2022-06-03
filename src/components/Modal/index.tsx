import Portal from '../Portal'

import styles from './modal.module.scss'

interface IProps {
  children: React.ReactNode
}

const Modal = ({ children }: IProps) => {
  return (
    <Portal>
      <article className={styles.overlay}>{children}</article>
    </Portal>
  )
}

export default Modal
