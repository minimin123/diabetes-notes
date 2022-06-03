import { useQuery } from 'react-query'
import _ from 'lodash'
import store from 'storejs'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { initialState } from 'recoil/diabetesNote'

import { getNutritionDataApi } from 'services/diabetesNote'

import styles from './diet.module.scss'
import { FormEventHandler, useEffect, useState, Suspense } from 'react'
import dayjs from 'dayjs'

const Diet = () => {
  const resetData = useResetRecoilState(initialState)
  const [dailyData, setDailyData] = useRecoilState(initialState)
  const [date, setDate] = useState(Date)
  const [totalCalorie, setTotalCalorie] = useState(0)
  const [totalCarbs, setTotalCarbs] = useState(0)
  const [totalProtein, setTotalProtein] = useState(0)
  const [totalFat, setTotalFat] = useState(0)
  const [foodName, setFoodName] = useState('')
  const [title, setTitle] = useState('')
  const [selectedMenu, setSelectedMenu] = useState([])

  const [meal, setMeal] = useState('')

  const { data, refetch } = useQuery(
    'getNutritionDataApi',
    () =>
      getNutritionDataApi({ desc_kor: foodName }).then((res) => {
        return res.data.body.items
      }),
    {
      retry: 2,
      staleTime: 5 * 60 * 1000,
      suspense: true,
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
    const newDailyData = _.cloneDeep(store.get(`${date}`))
    if (meal === 'breakfast') newDailyData.breakfast.menu.push(newData)
    if (meal === 'lunch') newDailyData.lunch.menu.push(newData)
    if (meal === 'dinner') newDailyData.dinner.menu.push(newData)
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
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.currentTarget.value)
    if (store.has(`${dayjs(e.currentTarget.value).format('YYYY-MM-DD')}`))
      setDailyData(store.get(dayjs(e.currentTarget.value).format('YYYY-MM-DD')))
    else store.set(dayjs(e.currentTarget.value).format('YYYY-MM-DD'), dailyData)
  }

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement> | FormEventHandler<HTMLFormElement> | any) => {
    e.preventDefault()
    setFoodName(title)
  }

  const handleSubmmit = () => {
    store.set(`${date}`, dailyData)
    setTotalCalorie(0)
    setTotalCarbs(0)
    setTotalProtein(0)
    setTotalFat(0)
    setSelectedMenu([])
  }

  useEffect(() => {
    refetch()
  }, [foodName, refetch])

  const TITLE = ['식품명', '1회제공량', '칼로리', '탄수화물', '단백질', '지방']
  return (
    <div className={styles.dietList}>
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
      <form onSubmit={handleSearchClick}>
        <input type='text' onChange={handleSearchInput} />
        <button type='submit' onClick={handleSearchClick}>
          검색하기
        </button>
      </form>
      <Suspense fallback={<div>검색 중...</div>}>
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
      </Suspense>
      <br />
      <div>선택한 식품</div>
      {selectedMenu.length > 0 ? selectedMenu.map((item: any) => item) : '음식을 선택해주세요.'}
      <br />
      칼로리{totalCalorie}kcal 탄수화물{totalCarbs}g 단백질{totalProtein}g 지방{totalFat}g <br />
      <button type='button' onClick={handleDelete}>
        초기화하기
      </button>
      <button type='button' onClick={handleSubmmit}>
        등록하기
      </button>
    </div>
  )
}

export default Diet
