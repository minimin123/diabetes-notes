import { atom } from 'recoil'

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
  medication: string
  menu: {}[]
  exercise: string
  memo: string
}
export const initialState = atom<IData>({
  key: 'initialState',
  default: {
    breakfast: {
      before: 0,
      after: 0,
      medication: '',
      menu: [],
      exercise: '',
      memo: '',
    },
    lunch: {
      before: 0,
      after: 0,
      medication: '',
      menu: [],
      exercise: '',
      memo: '',
    },
    dinner: {
      before: 0,
      after: 0,
      medication: '',
      menu: [],
      exercise: '',
      memo: '',
    },
    night: {
      menu: [],
      memo: '',
    },
  },
})
