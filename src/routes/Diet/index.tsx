import { useQuery } from 'react-query'
import _ from 'lodash'
import { VictoryPie } from 'victory'
import store from 'storejs'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { initialState } from 'recoil/diabetesNote'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { getNutritionDataApi } from 'services/diabetesNote'

import styles from './diet.module.scss'
import { FormEventHandler, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { FoodIcon } from 'assets/svgs'
import DatePicker from 'components/DatePicker/DatePicker'
import { useNavigate } from 'react-router-dom'

const Diet = () => {
  const resetData = useResetRecoilState(initialState)
  const [dailyData, setDailyData] = useRecoilState(initialState)
  const [date, setDate] = useState<undefined | Date>(undefined)
  const [totalCalorie, setTotalCalorie] = useState(0)
  const [totalCarbs, setTotalCarbs] = useState(0)
  const [totalProtein, setTotalProtein] = useState(0)
  const [totalFat, setTotalFat] = useState(0)
  const [foodName, setFoodName] = useState('')
  const [text, setText] = useState('')
  const [selectedMenu, setSelectedMenu] = useState([])

  const [meal, setMeal] = useState('')

  const { data, refetch } = useQuery(
    'getNutritionDataApi',
    () =>
      getNutritionDataApi({ desc_kor: foodName }).then((res) => {
        return res.data.body.items
      }),
    {
      staleTime: 5 * 60 * 1000,
      enabled: false,
    }
  )

  const handleDietClick = (e: any) => {
    const { name, calories, carbs, protein, fat } = e.currentTarget.dataset
    const newData = {
      name,
      calories,
      carbs,
      protein,
      fat,
    }
    const newDailyData = _.cloneDeep(dailyData)
    if (meal === '아침') newDailyData.breakfast.menu.push(newData)
    if (meal === '점심') newDailyData.lunch.menu.push(newData)
    if (meal === '저녁') newDailyData.dinner.menu.push(newData)
    setDailyData(newDailyData)
    setTotalCalorie((prev) => prev + Math.floor(Number(calories)))
    setTotalCarbs((prev) => prev + Math.floor(Number(carbs)))
    setTotalProtein((prev) => prev + Math.floor(Number(protein)))
    setTotalFat((prev) => prev + Math.floor(Number(fat)))
    setSelectedMenu((prev) => prev.concat(newData.name))
  }

  const handleDelete = () => {
    resetData()
    setTotalCalorie(0)
    setTotalCarbs(0)
    setTotalProtein(0)
    setTotalFat(0)
    setSelectedMenu([])
  }

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFoodName(e.target.value)
  }

  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement> | FormEventHandler<HTMLFormElement> | any) => {
    e.preventDefault()
    setText(foodName)
    refetch()
  }

  const handleSubmmit = () => {
    store.set(dayjs(date).format('YYYY-MM-DD'), dailyData)
    setTotalCalorie(0)
    setTotalCarbs(0)
    setTotalProtein(0)
    setTotalFat(0)
    setSelectedMenu([])
    toast.success('식단이 등록되었습니다.', { position: 'top-center', hideProgressBar: true })
  }
  const navigate = useNavigate()
  const handleXClick = () => {
    navigate('/note')
  }

  useEffect(() => {
    setText('')
    setMeal('')
  }, [date])

  const TITLE = ['식품명', '1회제공량', '칼로리', '탄수화물', '단백질', '지방']
  return (
    <div className={styles.wrapper}>
      <ToastContainer />
      <main>
        <h1>나의수첩</h1>
        <h2>
          <FoodIcon />
          식단 기록하기
        </h2>
        <div className={styles.contentsBox}>
          <div>
            <DatePicker date={date} setDate={setDate} />
          </div>
          <div className={styles.inputsBox}>
            <button type='button' className={styles.xButton} onClick={handleXClick}>
              X
            </button>
            <h3>{date ? `${dayjs(date).format('M월 D일')}의 ${meal} 식단` : '날짜를 먼저 선택해주세요.'}</h3>
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
              <form onSubmit={handleSearchClick}>
                <input type='text' onChange={handleSearchInput} />
                <button type='submit' onClick={handleSearchClick} className={styles.submit}>
                  검색하기
                </button>
              </form>
            )}
          </div>
        </div>
        {date && meal && text.length > 0 && (
          <section className={styles.searchList}>
            <h2>검색 결과를 클릭하여 식단을 선택해보세요.</h2>
            <table>
              <thead>
                <tr>
                  {TITLE.map((element) => (
                    <td key={element}>{element}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr
                    key={index}
                    onClick={handleDietClick}
                    data-name={item.DESC_KOR}
                    data-calories={item.NUTR_CONT1}
                    data-carbs={item.NUTR_CONT2}
                    data-protein={item.NUTR_CONT3}
                    data-fat={item.NUTR_CONT4}
                  >
                    <td>{item.DESC_KOR}</td>
                    <td>{item.SERVING_WT}</td>
                    <td>{item.NUTR_CONT1}</td>
                    <td>{item.NUTR_CONT2}</td>
                    <td>{item.NUTR_CONT3}</td>
                    <td>{item.NUTR_CONT4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
        {selectedMenu.length > 0 && (
          <div className={styles.searchList}>
            <section className={styles.nutrition}>
              <ul>
                선택한 식품
                {selectedMenu.map((item: any) => (
                  <li key={item}>{item}</li>
                ))}
                <button type='button' onClick={handleDelete}>
                  초기화하기
                </button>
                <button type='button' onClick={handleSubmmit}>
                  등록하기
                </button>
              </ul>
              <div className={styles.chart}>
                <span>{totalCalorie}kcal</span>
                <VictoryPie
                  innerRadius={80}
                  labelRadius={100}
                  style={{ labels: { fill: 'white', fontSize: 16, fontWeight: 'bold' } }}
                  colorScale={['tomato', 'orange', 'gold']}
                  animate={{
                    duration: 500,
                  }}
                  data={[
                    { x: '탄', y: ((totalCarbs * 4) / totalCalorie) * 100 },
                    { x: '단', y: ((totalProtein * 4) / totalCalorie) * 100 },
                    { x: '지', y: ((totalFat * 9) / totalCalorie) * 100 },
                  ]}
                />
                <p>
                  탄수화물{totalCarbs}g 단백질{totalProtein}g 지방{totalFat}g
                </p>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}

export default Diet
