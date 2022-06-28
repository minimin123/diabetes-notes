import { useRecoilValue } from 'recoil'
import { dummyState, initialState } from 'recoil/diabetesNote'
import Menu from 'routes/Menu'
import store from 'storejs'
import styles from './note.module.scss'

const targetRange = (glucose: number, category: string) => {
  if (category === '식전' && glucose >= 140) return <div className={styles.pink}>{glucose}</div>
  if (category === '식후' && glucose >= 200) return <div className={styles.orange}>{glucose}</div>
  if (glucose <= 70) return <div className={styles.blue}>{glucose}</div>
  return glucose
}

interface IMenu {
  name: string
}

const Note = () => {
  const dummyData = useRecoilValue(dummyState)
  store.set('2022-00-00', dummyData)
  const dateArr = store
    .keys()
    .filter((date) => date.startsWith('2022'))
    .sort()

  return (
    <div className={styles.wrapper}>
      <main>
        <h1>나의수첩</h1>
        <Menu />

        <h2> 일일 혈당량과 식사, 투약 기록을 입력하고 관리하세요.</h2>

        <section className={styles.contentsBox}>
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
              <div className={styles.div4}>
                {store(date).breakfast.before === 0 || targetRange(store(date).breakfast.before, '식전')}
              </div>
              <div className={styles.div5}>
                {store(date).breakfast.medication === '' || store(date).breakfast.medication}
              </div>
              <div className={styles.div6}>
                {store(date).breakfast.after === 0 || targetRange(store(date).breakfast.after, '식후')}
              </div>
              <div className={styles.div7}>
                {store(date).lunch.before === 0 || targetRange(store(date).lunch.before, '식전')}
              </div>
              <div className={styles.div8}>{store(date).lunch.medication === '' || store(date).lunch.medication}</div>
              <div className={styles.div9}>
                {store(date).lunch.after === 0 || targetRange(store(date).lunch.after, '식후')}
              </div>
              <div className={styles.div10}>
                {store(date).dinner.before === 0 || targetRange(store(date).dinner.before, '식전')}
              </div>
              <div className={styles.div11}>
                {store(date).dinner.medication === '' || store(date).dinner.medication}
              </div>
              <div className={styles.div12}>
                {store(date).dinner.after === 0 || targetRange(store(date).dinner.after, '식후')}
              </div>
              <div className={styles.div13}>{store(date).breakfast.menu.map((el: IMenu) => `∙ ${el.name} `)}</div>
              <div className={styles.div14}>{store(date).lunch.menu.map((el: IMenu) => `∙ ${el.name} `)}</div>
              <div className={styles.div15}>{store(date).dinner.menu.map((el: IMenu) => `∙ ${el.name} `)}</div>
            </div>
          ))}
        </section>
        <ul>
          혈당조절 목표범위에서 벗어난 혈당 수치에는 다음과 같이 색칠되어 표시됩니다.
          <li>
            - 저혈당: <span className={styles.blue}>파란색</span> ( 혈당치 70mg/dL 이하){' '}
          </li>
          <li>
            - 공복 고혈당: <span className={styles.pink}>핑크색</span> ( 혈당치 140mg/dL 이하){' '}
          </li>
          <li>
            - 식후 저혈당: <span className={styles.orange}>주황색</span> ( 혈당치 200mg/dL 이하){' '}
          </li>
        </ul>
      </main>
    </div>
  )
}

export default Note
