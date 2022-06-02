import _ from 'lodash'
import store from 'storejs'

const Note = () => {
  const dateArr = store
    .keys()
    .filter((date) => date.startsWith('20'))
    .sort()

  return (
    <div>
      {dateArr.map((date) => (
        <div key={date}>
          날짜 {date}
          <div>
            아침
            <div>식전혈당{store(date).breakfast.before}</div>
            <div>식후혈당{store(date).breakfast.after}</div>
            <div>식사기록{store(date).breakfast.menu.map((el: any) => el.name)}</div>
          </div>
          <div>
            점심
            <div>식전혈당{store(date).lunch.before}</div>
            <div>식후혈당{store(date).lunch.after}</div>
            <div>식사기록{store(date).lunch.menu.map((el: any) => el.name)}</div>
          </div>
          <div>
            저녁
            <div>식전혈당{store(date).dinner.before}</div>
            <div>식후혈당{store(date).dinner.after}</div>
            <div>식사기록{store(date).dinner.menu.map((el: any) => el.name)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Note
