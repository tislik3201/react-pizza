import { calcTotalPrice } from './../../utils/caltTotalPrice';
import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCartFromLS } from '../../utils/getCartFromLS';

export type TCartItem = {
  id: string,
  title: string, 
  price: number,
  imageUrl: string,
  type: string,
  size: number,
  count: number
}

interface ICartSliceState {
  totalPrice: number,
  items: TCartItem[]
}

const {items, totalPrice} = getCartFromLS()

const initialState: ICartSliceState = {
    totalPrice: totalPrice,
    items: items
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TCartItem>)  {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if(findItem){
        findItem.count++
      } else {  
        state.items.push({
          ...action.payload,
          count: 1
        })
      }
      state.totalPrice = calcTotalPrice(state.items)
    },  
    plusItem(state, action: PayloadAction<string>)  {
      const findItem = state.items.find(obj => obj.id === action.payload)
      if(findItem){
        findItem.count++
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<string>)  {
      const findItem = state.items.find(obj => obj.id === action.payload)
      if(findItem){
        findItem.count--
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    removeItem(state, action: PayloadAction<string>)  {
        state.items = state.items.filter(obj => obj.id !== action.payload)
        state.totalPrice = calcTotalPrice(state.items)
      },
    clearItems(state)  {
        state.items = []
        state.totalPrice = 0
      },
  },
})

export const selectCart = (state: RootState) => state.cartSlice
export const selectCartitemById = (id: string) => (state: RootState) => state.cartSlice.items.find((obj) => obj.id === id)

export const { addItem, removeItem, plusItem, minusItem, clearItems } = cartSlice.actions
 
export default cartSlice.reducer