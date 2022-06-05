import _ from 'lodash'
import store from 'storejs'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { initialState } from 'recoil/diabetesNote'
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import styles from './bloodGlucose.module.scss'
import DatePicker from 'components/DatePicker/DatePicker'
import { BloodIcon, CloseIcon } from 'assets/svgs'
import { useNavigate } from 'react-router-dom'

const BloodGlucose = () => {
  const [, setDailyData] = useRecoilState(initialState)
  const [date, setDate] = useState<undefined | Date>(undefined)
  const [text, setText] = useState('')
  const [meal, setMeal] = useState('')
  const [time, setTime] = useState('')

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }
  const resetData = useResetRecoilState(initialState)

  const handleSubmit = (e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newDailyData = _.cloneDeep(store.get(`${dayjs(date).format('YYYY-MM-DD')}`))
    if (meal === '아침' && time === '식전') newDailyData.breakfast.before = Number(text)
    if (meal === '아침' && time === '식후') newDailyData.breakfast.after = Number(text)
    if (meal === '점심' && time === '식전') newDailyData.lunch.before = Number(text)
    if (meal === '점심' && time === '식후') newDailyData.lunch.after = Number(text)
    if (meal === '저녁' && time === '식전') newDailyData.dinner.before = Number(text)
    if (meal === '저녁' && time === '식후') newDailyData.dinner.after = Number(text)
    setDailyData(newDailyData)
    store.set(dayjs(date).format('YYYY-MM-DD'), newDailyData)
    setMeal('')
    setTime('')
    toast.success('혈당량이 등록되었습니다.', { position: 'top-center', hideProgressBar: true })
    resetData()
  }

  useEffect(() => {
    setMeal('')
    setTime('')
  }, [date])

  const navigate = useNavigate()
  const handleXClick = () => {
    navigate('/note')
  }

  return (
    <div className={styles.wrapper}>
      <ToastContainer />
      <main>
        <h1>나의수첩</h1>
        <h2>
          <BloodIcon />
          혈당 기록하기
        </h2>
        <div className={styles.contentsBox}>
          <div>
            <DatePicker date={date} setDate={setDate} />
          </div>
          <div className={styles.inputsBox}>
            <button type='button' className={styles.xButton} onClick={handleXClick}>
              <CloseIcon />
            </button>
            <h3>{date ? `${dayjs(date).format('M월 D일')}의 ${meal} ${time} 혈당` : '날짜를 먼저 선택해주세요.'}</h3>
            {date && !meal && (
              <section className={styles.mealButtons}>
                <button type='button' onClick={() => setMeal('아침')}>
                  아침
                </button>
                <button type='button' onClick={() => setMeal('점심')}>
                  점심
                </button>
                <button type='button' onClick={() => setMeal('저녁')}>
                  저녁
                </button>
              </section>
            )}
            {meal !== '' && !time && (
              <section className={styles.mealButtons}>
                <button type='button' onClick={() => setTime('식전')}>
                  식전
                </button>
                <button type='button' onClick={() => setTime('식후')}>
                  식후
                </button>
              </section>
            )}
            {time && (
              <form onSubmit={handleSubmit}>
                <input type='number' placeholder='혈당량을 입력해주세요.' onChange={handleTextChange} />
                <section>
                  <button className={styles.submit} type='submit' onClick={handleSubmit}>
                    등록하기
                  </button>
                </section>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default BloodGlucose
