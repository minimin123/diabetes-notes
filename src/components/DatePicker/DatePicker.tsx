import Calendar from 'react-calendar'
import { useRecoilState } from 'recoil'
import { initialState } from 'recoil/diabetesNote'

import './calendar.scss'
import store from 'storejs'
import dayjs from 'dayjs'

interface IProps {
  date: Date | undefined
  setDate: (date: Date) => void
}

const DatePicker = ({ date, setDate }: IProps) => {
  const [dailyData, setDailyData] = useRecoilState(initialState)

  const handleDateChange = (dateValue: Date) => {
    setDate(dateValue)
    if (store.has(`${dayjs(dateValue).format('YYYY-MM-DD')}`))
      setDailyData(store.get(dayjs(dateValue).format('YYYY-MM-DD')))
    else store.set(dayjs(dateValue).format('YYYY-MM-DD'), dailyData)
  }

  return <Calendar onChange={handleDateChange} value={date} view='month' />
}
export default DatePicker
