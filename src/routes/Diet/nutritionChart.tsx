import { VictoryPie } from 'victory'
import styles from './diet.module.scss'

interface IProps {
  totalCalorie: number
  totalCarbs: number
  totalProtein: number
  totalFat: number
}

const NutritionChart = ({ totalCalorie, totalCarbs, totalProtein, totalFat }: IProps) => {
  return (
    <div className={styles.chart}>
      <span>{totalCalorie} kcal</span>
      <VictoryPie
        padAngle={2}
        cornerRadius={4}
        innerRadius={70}
        labelRadius={105}
        style={{ labels: { fill: 'white', fontSize: 16 } }}
        colorScale={['#ff839e', '#ffd67c', '#64b4ef']}
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
  )
}

export default NutritionChart
