import { BloodIcon, ExerciseIcon, FoodIcon, MemoIcon, SyringeIcon } from 'assets/svgs'
import { Link } from 'react-router-dom'
import styles from './modalMenu.module.scss'

interface IProps {
  handleClose: () => void
}

const ModalMenu = ({ handleClose }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h2>기록 입력하기</h2>
        <button type='button' onClick={handleClose}>
          X
        </button>
      </div>
      <section>
        <Link to='/bloodGlucose'>
          <div className={styles.buttonBox}>
            <button type='button'>
              <BloodIcon />
            </button>
            <span>혈당</span>
          </div>
        </Link>
        <Link to='/drug'>
          <div className={styles.buttonBox}>
            <button type='button'>
              <SyringeIcon />
            </button>
            <span>투약</span>
          </div>
        </Link>
        <Link to='/diet'>
          <div className={styles.buttonBox}>
            <button type='button'>
              <FoodIcon />
            </button>
            <span>식사</span>
          </div>
        </Link>
        <div className={styles.buttonBox}>
          <button type='button'>
            <ExerciseIcon />
          </button>
          <span>운동</span>
        </div>
        <div className={styles.buttonBox}>
          <button type='button'>
            <MemoIcon />
          </button>
          <span>메모</span>
        </div>
      </section>
    </div>
  )
}

export default ModalMenu
