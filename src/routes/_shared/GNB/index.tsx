import styles from './gnb.module.scss'

const GNB = () => {
  return (
    <nav className={styles.gnb}>
      <ul>
        <li>당뇨수첩</li>
        <li>분석하기</li>
      </ul>
    </nav>
  )
}

export default GNB
