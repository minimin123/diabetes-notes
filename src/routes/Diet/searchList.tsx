import NutritionChart from './nutritionChart'

import styles from './diet.module.scss'

interface IProps {
  selectedMenu: never[]
  handleSubmit: () => void
  totalCalorie: number
  totalCarbs: number
  totalProtein: number
  totalFat: number
  prevValue: IPrevValue[]
}

interface IPrevValue {
  name: string
  calories: number
  carbs: number
  protein: number
  fat: number
}

const SearchList = ({
  totalCalorie,
  totalCarbs,
  totalProtein,
  totalFat,
  selectedMenu,
  handleSubmit,
  prevValue,
}: IProps) => {
  const prevSelectedMenu: any = []
  let prevCalorie = 0
  let prevCarbs = 0
  let prevProtein = 0
  let prevFat = 0
  for (let i = 0; i < prevValue.length; i += 1) {
    prevSelectedMenu.push(prevValue[i].name)
    prevCarbs += Number(prevValue[i].carbs)
    prevProtein += Number(prevValue[i].protein)
    prevFat += Number(prevValue[i].fat)
    prevCalorie += Number(prevValue[i].calories)
  }

  return (
    <div className={styles.searchList}>
      <section className={styles.nutrition}>
        <ul>
          선택한 식품
          {prevSelectedMenu && selectedMenu.length === 0
            ? prevSelectedMenu.map((item: string) => <li key={item}>{item}</li>)
            : selectedMenu.map((item: string) => <li key={item}>{item}</li>)}
          <button type='button' onClick={handleSubmit}>
            등록하기
          </button>
        </ul>
        <NutritionChart
          totalCalorie={prevCalorie && !totalCalorie ? prevCalorie : totalCalorie}
          totalCarbs={prevCarbs && !totalCarbs ? prevCarbs : totalCarbs}
          totalProtein={prevProtein && !totalProtein ? prevProtein : totalProtein}
          totalFat={prevFat && !totalFat ? prevFat : totalFat}
        />
      </section>
    </div>
  )
}

export default SearchList
