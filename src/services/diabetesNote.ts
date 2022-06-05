import { axios } from 'hooks/worker'

interface Params {
  desc_kor: string
}

interface IItems {
  ANIMAL_PLANT: string
  BGN_YEAR: string
  DESC_KOR: string
  NUTR_CONT1: string
  NUTR_CONT2: string
  NUTR_CONT3: string
  NUTR_CONT4: string
  NUTR_CONT5: string
  NUTR_CONT6: string
  NUTR_CONT7: string
  NUTR_CONT8: string
  NUTR_CONT9: string
  SERVING_WT: string
}

interface IHeader {
  resultCode: string
  resultMsg: string
}

interface IBody {
  items: IItems[]
  numOfRows: number
  pageNo: number
  totalCount: number
}

interface INutritionDataRes {
  header: IHeader
  body: IBody
}

export const getNutritionDataApi = (params: Params) => {
  const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy/'

  const URL = '1471000/FoodNtrIrdntInfoService1/getFoodNtrItdntList1'
  const API_KEY = process.env.REACT_APP_API_KEY

  try {
    const res = axios.get<INutritionDataRes>(`${PROXY}${URL}?ServiceKey=${API_KEY}&type=json`, {
      params,
    })
    return res
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
