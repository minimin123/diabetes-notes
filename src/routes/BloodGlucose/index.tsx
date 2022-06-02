import _ from 'lodash'
import store from 'storejs'
import { useRecoilState } from 'recoil'
import { initialState } from 'recoil/diabetesNote'
import { ChangeEvent, FormEventHandler, MouseEvent, useState } from 'react'
import dayjs from 'dayjs'

const BloodGlucose = () => {
  const [dailyData, setDailyData] = useRecoilState(initialState)
  const [date, setDate] = useState(Date)
  const [text, setText] = useState('')
  const [meal, setMeal] = useState('')
  const [time, setTime] = useState('')

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.currentTarget.value)
    if (store.has(`${dayjs(e.currentTarget.value).format('YYYY-MM-DD')}`))
      setDailyData(store.get(dayjs(e.currentTarget.value).format('YYYY-MM-DD')))
    else store.set(dayjs(e.currentTarget.value).format('YYYY-MM-DD'), dailyData)
  }

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }

  const handleSubmit = (e: MouseEvent<HTMLButtonElement> | FormEventHandler<HTMLFormElement> | any) => {
    e.preventDefault()
    const newDailyData = _.cloneDeep(store.get(`${date}`))
    if (meal === 'breakfast' && time === 'before') newDailyData.breakfast.before = Number(text)
    if (meal === 'breakfast' && time === 'after') newDailyData.breakfast.after = Number(text)
    if (meal === 'lunch' && time === 'before') newDailyData.lunch.before = Number(text)
    if (meal === 'lunch' && time === 'after') newDailyData.lunch.after = Number(text)
    if (meal === 'dinner' && time === 'before') newDailyData.dinner.before = Number(text)
    if (meal === 'dinner' && time === 'after') newDailyData.dinner.after = Number(text)
    setDailyData(newDailyData)
    store.set(dayjs(date).format('YYYY-MM-DD'), newDailyData)
  }

  return (
    <div>
      <input type='date' onChange={handleDateChange} />
      <button type='button' onClick={() => setMeal('breakfast')}>
        아침
      </button>
      <button type='button' onClick={() => setMeal('lunch')}>
        점심
      </button>
      <button type='button' onClick={() => setMeal('dinner')}>
        저녁
      </button>
      <button type='button' onClick={() => setTime('before')}>
        식전
      </button>
      <button type='button' onClick={() => setTime('after')}>
        식후
      </button>
      <form onSubmit={handleSubmit}>
        <input type='number' onChange={handleTextChange} />
        <button type='submit' onClick={handleSubmit}>
          등록하기
        </button>
      </form>
    </div>
  )
}

export default BloodGlucose
