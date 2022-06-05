import NutritionChart from './nutritionChart'

import styles from './diet.module.scss'

interface IProps {
  selectedMenu: never[]
  handleSubmit: () => void
  totalCalorie: number
  totalCarbs: number
  totalProtein: number
  totalFat: number
}

const SearchList = ({ totalCalorie, totalCarbs, totalProtein, totalFat, selectedMenu, handleSubmit }: IProps) => {
  return (
    <div className={styles.searchList}>
      <section className={styles.nutrition}>
        <ul>
          선택한 식품
          {selectedMenu.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
          <button type='button' onClick={handleSubmit}>
            등록하기
          </button>
        </ul>
        <NutritionChart
          totalCalorie={totalCalorie}
          totalCarbs={totalCarbs}
          totalProtein={totalProtein}
          totalFat={totalFat}
        />
      </section>
    </div>
  )
}

export default SearchList
