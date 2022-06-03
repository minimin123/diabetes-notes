import { useRef, useState } from 'react'

import useOnClickOutside from 'hooks/worker/useOnClickOutside'

import ModalMenu from './ModalMenu'
import Modal from 'components/Modal'

import styles from './menu.module.scss'

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)
  useOnClickOutside(ref, () => setIsOpen(false))
  const handleClick = () => setIsOpen((prev) => !prev)

  return (
    <>
      <div className={styles.btnBox}>
        <button type='button' onClick={handleClick}>
          기록 입력하기
        </button>
      </div>
      {isOpen && (
        <Modal>
          <div className={styles.modalBox} ref={ref}>
            <ModalMenu handleClose={handleClick} />
          </div>
        </Modal>
      )}
    </>
  )
}
