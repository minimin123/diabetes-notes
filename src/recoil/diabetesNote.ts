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
  medication: number
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
  },
})

export const dateArrState = atom({
  key: 'dateArrState',
  default: [],
})
