import _ from 'lodash'
import store from 'storejs'
import styles from './note.module.scss'

const Note = () => {
  const dateArr = store
    .keys()
    .filter((date) => date.startsWith('20'))
    .sort()

  return (
    <body className={styles.wrapper}>
      <main>
        <h1>통합조회</h1>
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
              <div className={styles.div4}>{store(date).breakfast.before}</div>
              <div className={styles.div5}>약</div>
              <div className={styles.div6}>{store(date).breakfast.after}</div>
              <div className={styles.div7}>{store(date).lunch.before}</div>
              <div className={styles.div8}>약</div>
              <div className={styles.div9}>{store(date).lunch.after}</div>
              <div className={styles.div10}>{store(date).dinner.before}</div>
              <div className={styles.div11}>식후</div>
              <div className={styles.div12}>{store(date).dinner.after}</div>
              <div className={styles.div13}>{store(date).breakfast.menu.map((el: any) => el.name)}</div>
              <div className={styles.div14}>{store(date).lunch.menu.map((el: any) => el.name)}</div>
              <div className={styles.div15}>{store(date).dinner.menu.map((el: any) => el.name)}</div>
            </div>
          ))}
        </div>
      </main>
    </body>
  )
}

export default Note
