import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum SortPropertyEnum {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title'
}

export type TSort = {
  name: string,
  sortProperty: SortPropertyEnum
}

export interface IFilterState {
  searchValue: string,
    categoryId: number,
    currentPage: number,
    sort: TSort
}

const initialState: IFilterState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
      name: 'популярности', sortProperty: SortPropertyEnum.RATING
    }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>)  {
      state.categoryId = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>)  {
      state.searchValue = action.payload
    },
    setSort(state, action: PayloadAction<TSort>) {
      state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<IFilterState>) {
      if(Object.keys(action.payload).length){
        state.currentPage = Number(action.payload.currentPage)
      state.sort = action.payload.sort
      state.categoryId = Number(action.payload.categoryId)
      } else{
        state.currentPage = 1
        state.categoryId =  0
        state.sort = {
          name: 'популярности',
          sortProperty: SortPropertyEnum.RATING
        }
      }
    },
  },
})

export const selectFilter = (state: RootState) => state.filterSlice
export const selectFilterSort = (state: RootState) => state.filterSlice.sort
export const selectFilterSortProperty = (state: RootState) => state.filterSlice.sort.sortProperty

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer