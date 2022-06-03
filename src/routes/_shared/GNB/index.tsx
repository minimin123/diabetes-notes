import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import styles from './gnb.module.scss'

const GNB = () => {
  return (
    <nav className={styles.gnb}>
      <ul>
        당뇨수첩
        <li>
          <NavLink to='note' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            나의수첩
          </NavLink>
        </li>
        <li>분석하기</li>
      </ul>
    </nav>
  )
}

export default GNB
