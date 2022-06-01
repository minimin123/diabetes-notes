import dayjs from 'dayjs'
import { useQuery } from 'react-query'

import { getNutritionDataApi } from 'services/diabetesNote'

import styles from './diet.module.scss'

interface IData {
  breakfast: IElement
  lunch: IElement
  dinner: IElement
  night: {
    menu: {}[]
    memo: string
  }
}

interface IElement {
  before: number
  after: number
  medication: number
  menu: {}[]
  exercise: string
  memo: string
}
const InitialDietMenu: IData = {
  breakfast: {
    before: 0,
    after: 0,
    medication: 0,
    menu: [],
    exercise: '',
    memo: '',
  },
  lunch: {
    before: 0,
    after: 0,
    medication: 0,
    menu: [],
    exercise: '',
    memo: '',
  },
  dinner: {
    before: 0,
    after: 0,
    medication: 0,
    menu: [],
    exercise: '',
    memo: '',
  },
  night: {
    menu: [],
    memo: '',
  },
}

const Diet = () => {
  const { data } = useQuery(
    'getNutritionDataApi',
    () =>
      getNutritionDataApi({ desc_kor: '현미밥' }).then((res) => {
        return res.data.body.items
      }),
    {
      retry: 2,
      staleTime: 5 * 60 * 1000,
      suspense: true,
    }
  )

  const handleDietClick = (e: any) => {
    // console.log(e.currentTarget.dataset.name)
    // console.log(e.currentTarget.dataset.calorie)
    // console.log(e.currentTarget.dataset.carbs)
    // console.log(e.currentTarget.dataset.protein)
    // console.log(e.currentTarget.dataset.fat)
    // console.log(e.currentTarget.dataset.sugar)
    // console.log(e.currentTarget.dataset.sodium)
    InitialDietMenu.breakfast.menu.push({
      name: e.currentTarget.dataset.name,
      calories: e.currentTarget.dataset.calorie,
      carbs: e.currentTarget.dataset.carbs,
      protein: e.currentTarget.dataset.protein,
      fat: e.currentTarget.dataset.fat,
      sugar: e.currentTarget.dataset.sugar,
      sodium: e.currentTarget.dataset.sodium,
    })
    console.log(InitialDietMenu)
  }

  return (
    <div className={styles.dietList}>
      <table>
        <thead>
          <tr>
            <td>식품명</td>
            <td>1회제공량</td>
            <td>칼로리</td>
            <td>탄수화물</td>
            <td>단백질</td>
            <td>지방</td>
            <td>당류</td>
            <td>나트륨</td>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr
              key={index}
              onClick={handleDietClick}
              data-name={item.DESC_KOR}
              data-calorie={item.NUTR_CONT1}
              data-carbs={item.NUTR_CONT2}
              data-protein={item.NUTR_CONT3}
              data-fat={item.NUTR_CONT4}
              data-sugar={item.NUTR_CONT5}
              data-sodium={item.NUTR_CONT6}
            >
              <td>{item.DESC_KOR}</td>
              <td>{item.SERVING_WT}</td>
              <td>{item.NUTR_CONT1}</td>
              <td>{item.NUTR_CONT2}</td>
              <td>{item.NUTR_CONT3}</td>
              <td>{item.NUTR_CONT4}</td>
              <td>{item.NUTR_CONT5}</td>
              <td>{item.NUTR_CONT6}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Diet
