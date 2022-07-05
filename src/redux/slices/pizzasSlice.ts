import { RootState } from './../store';
import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export type TSearchPizzaParams = {
  category: string,
  search: string,
  currentPage: string,
  sortBy: string
}

export const fetchPizzas = createAsyncThunk<TPizzaItem[], TSearchPizzaParams>(
    'pizzas/fetchPizzas',
    async (params) => {
      const {category,  
        search,
        currentPage,
        sortBy} = params
        const {data} = await axios.get<TPizzaItem[]>(`https://62ae0fa7b735b6d16a3e5009.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=desc ${search}`)
      return data
    }
  )

type TPizzaItem = {
  id: string,
  title: string,
  price: number,
  imageUrl: string,
  sizes: number[],
  types: number[]
}  

interface IPizzaSliceState {
  items: TPizzaItem[],
  status: 'loading' | 'success' | 'error'
}

const initialState: IPizzaSliceState = {
    items: [],
    status: 'loading'
}

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<TPizzaItem[]>)  {
      state.items = action.payload
    },  
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading'
      state.items = []
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = 'success'
    })

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error'
      state.items = []
    })
  }
})

export const selectPizzasData = (state: RootState) => state.pizzasSlice

export const { setPizzas } = pizzasSlice.actions
 
export default pizzasSlice.reducer