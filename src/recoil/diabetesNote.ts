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

export const dummyState = atom({
  key: 'dummyState',
  default: {
    breakfast: {
      before: 110,
      after: 150,
      medication: '',
      menu: [
        {
          name: '고구마,찐것',
          calories: '130.00',
          carbs: '31.30',
          protein: '1.50',
          fat: '-2.00',
        },
      ],
      exercise: '',
      memo: '',
    },
    lunch: {
      before: 69,
      after: 300,
      medication: '123',
      menu: [
        {
          name: '햄버거,와퍼주니어',
          calories: '630.42',
          carbs: '52.14',
          protein: '26.86',
          fat: '34.76',
        },
        {
          name: '콜라',
          calories: '47.00',
          carbs: '11.80',
          protein: '-2.00',
          fat: '0.00',
        },
      ],
      exercise: '',
      memo: '',
    },
    dinner: {
      before: 143,
      after: 250,
      medication: '',
      menu: [
        {
          name: '탕수육',
          calories: '456.72',
          carbs: '51.83',
          protein: '17.48',
          fat: '19.94',
        },
      ],
      exercise: '',
      memo: '',
    },
    night: {
      menu: [],
      memo: '',
    },
  },
})
