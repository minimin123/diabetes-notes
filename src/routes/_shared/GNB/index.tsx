import { Link } from 'react-router-dom'
import styles from './gnb.module.scss'

const GNB = () => {
  return (
    <nav className={styles.gnb}>
      <ul>
        당뇨수첩
        <li>
          <Link to='note'>나의수첩</Link>
        </li>
      </ul>
    </nav>
  )
}

export default GNB
