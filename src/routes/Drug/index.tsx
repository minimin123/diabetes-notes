import _ from 'lodash'
import store from 'storejs'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { initialState } from 'recoil/diabetesNote'
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import styles from './drug.module.scss'
import DatePicker from 'components/DatePicker/DatePicker'
import { CloseIcon, SyringeIcon } from 'assets/svgs'
import { useNavigate } from 'react-router-dom'

const Drug = () => {
  const [, setDailyData] = useRecoilState(initialState)
  const [date, setDate] = useState<undefined | Date>(undefined)
  const [text, setText] = useState('')
  const [meal, setMeal] = useState('')
  const prevValue = store.get(`${dayjs(date).format('YYYY-MM-DD')}`)

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }
  const resetData = useResetRecoilState(initialState)

  const handleSubmit = (e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newDailyData = _.cloneDeep(prevValue)
    if (meal === '아침') newDailyData.breakfast.medication += text
    if (meal === '점심') newDailyData.lunch.medication += text
    if (meal === '저녁') newDailyData.dinner.medication += text
    setDailyData(newDailyData)
    store.set(dayjs(date).format('YYYY-MM-DD'), newDailyData)
    setMeal('')
    toast.success('투약기록이 등록되었습니다.', { position: 'top-center', hideProgressBar: true })
    resetData()
  }

  const getPrevValue = () => {
    if (meal === '아침') return prevValue.breakfast.medication
    if (meal === '점심') return prevValue.lunch.medication
    if (meal === '저녁') return prevValue.dinner.medication
    return ''
  }

  useEffect(() => {
    setMeal('')
    return resetData()
  }, [date])

  const navigate = useNavigate()
  const handleXClick = () => {
    resetData()
    navigate('/note')
  }

  return (
    <div className={styles.wrapper}>
      <ToastContainer />
      <main>
        <h1>나의수첩</h1>
        <h2>
          <SyringeIcon />
          투약 기록하기
        </h2>
        <div className={styles.contentsBox}>
          <div>
            <DatePicker date={date} setDate={setDate} />
          </div>
          <div className={styles.inputsBox}>
            <button type='button' className={styles.xButton} onClick={handleXClick}>
              <CloseIcon />
            </button>
            <h3>{date ? `${dayjs(date).format('M월 D일')}의 ${meal} 투약` : '날짜를 먼저 선택해주세요.'}</h3>
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
            {meal && (
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  placeholder='투약 정보를 입력해주세요.'
                  onChange={handleTextChange}
                  defaultValue={getPrevValue()}
                />
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

export default Drug
