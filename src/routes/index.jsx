import { Routes, Route } from 'react-router-dom'
import styles from './routes.module.scss'

import GNB from 'routes/_shared/GNB'

import Diet from './Diet'
import BloodGlucose from './BloodGlucose'
import Note from './Note'
import Drug from './Drug'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <GNB />
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<Note />} />
          <Route path='note' element={<Note />} />
          <Route path='diet' element={<Diet />} />
          <Route path='bloodGlucose' element={<BloodGlucose />} />
          <Route path='drug' element={<Drug />} />
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
