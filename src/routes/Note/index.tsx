import Menu from 'routes/Menu'
import store from 'storejs'
import styles from './note.module.scss'

const Note = () => {
  const dateArr = store
    .keys()
    .filter((date) => date.startsWith('20'))
    .sort()

  return (
    <div className={styles.wrapper}>
      <main>
        <h1>나의수첩</h1>
        <Menu />
        {/* <button type='button'>기록 작성하기</button> */}
        <div className={styles.contentsBox}>
          <div className={styles.tableHead}>
            <div className={styles.div1}>날짜</div>
            <div className={styles.div2}>구분</div>
            <div className={styles.div3}>아침</div>
            <div className={styles.div4}>점심</div>
            <div className={styles.div5}>저녁</div>
            <div className={styles.div6}>식전</div>
            <div className={styles.div7}>약</div>
            <div className={styles.div8}>식후</div>
            <div className={styles.div9}>식전</div>
            <div className={styles.div10}>약</div>
            <div className={styles.div11}>식후</div>
            <div className={styles.div12}>식전</div>
            <div className={styles.div13}>약</div>
            <div className={styles.div14}>식후</div>
          </div>
          {dateArr.map((date) => (
            <div className={styles.tableBody} key={date}>
              <div className={styles.div1}>{date}</div>
              <div className={styles.div2}>혈당</div>
              <div className={styles.div3}>식사</div>
              <div className={styles.div4}>{store(date).breakfast.before === 0 || store(date).breakfast.before}</div>
              <div className={styles.div5}>-</div>
              <div className={styles.div6}>{store(date).breakfast.after === 0 || store(date).breakfast.after}</div>
              <div className={styles.div7}>{store(date).lunch.before === 0 || store(date).lunch.before}</div>
              <div className={styles.div8}>-</div>
              <div className={styles.div9}>{store(date).lunch.after === 0 || store(date).lunch.after}</div>
              <div className={styles.div10}>{store(date).dinner.before === 0 || store(date).dinner.before}</div>
              <div className={styles.div11}>-</div>
              <div className={styles.div12}>{store(date).dinner.after === 0 || store(date).dinner.after}</div>
              <div className={styles.div13}>{store(date).breakfast.menu.map((el: any) => el.name)}</div>
              <div className={styles.div14}>{store(date).lunch.menu.map((el: any) => el.name)}</div>
              <div className={styles.div15}>{store(date).dinner.menu.map((el: any) => el.name)}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Note
