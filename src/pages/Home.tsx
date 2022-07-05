import React, { useCallback, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import {selectFilterSortProperty, selectFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import { fetchPizzas, selectPizzasData, TSearchPizzaParams} from '../redux/slices/pizzasSlice'
import { useNavigate } from 'react-router-dom'
import Skeleton from '../components/PizzaBlock/Skeleton'
import PizzaBlock from '../components/PizzaBlock'
import Categories from '../components/Categories'
import qs from 'qs'
import Sort, { list } from '../components/Sort'
import Pagination from '../components/Pagination'
import { useAppDispatch } from '../redux/store'

const Home: React.FC = () => {
  const {categoryId, currentPage, searchValue} = useSelector(selectFilter)
  const sortBy = useSelector(selectFilterSortProperty)
  const {items, status} = useSelector(selectPizzasData)
  const dispatch = useAppDispatch()
  const navigate =  useNavigate()
  const isMounted = useRef(false)
  
    const getPizzas = async () => {
       
        const category = categoryId > 0 ? `&category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        dispatch(
          fetchPizzas({
          category,
          search,
          currentPage: String(currentPage),
          sortBy
        }))
       window.scrollTo(0, 0)   
    }

    // Если изменили параметры и был первый рендер
    // useEffect(() => {
    //   if (isMounted.current) {
    //     const params = {
    //       categoryId: categoryId > 0 ? categoryId : null,
    //       sortProperty: sortBy,
    //       currentPage
    //     }
    //     const queryString = qs.stringify(params, {skipNulls: true});
  
    //     navigate(`/?${queryString}`);
    //   }

    //   if(!window.location.search){
    //     dispatch(fetchPizzas({} as TSearchPizzaParams))
    //   }
    // }, [categoryId, sortBy, searchValue, currentPage]);

    // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
    // useEffect(() => {
    //   if (window.location.search) {
    //     const params = (qs.parse(window.location.search.substring(1)) as unknown) as TSearchPizzaParams
  
    //     const sort = list.find((obj) => obj.sortProperty === params.sortBy);
    //     dispatch(
    //       setFilters({
    //         searchValue: params.search,
    //         categoryId:  Number(params.category),
    //         currentPage: Number(params.currentPage),
    //         sort: sort || list[0]
    //       }),
    //     );
    //   } 
    //   isMounted.current = true
    // }, []);

    // Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
      window.scrollTo(0, 0);
        getPizzas();
    }, [categoryId, sortBy, searchValue, currentPage]);

    
  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx))
  }, [])

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const pizzas =  items.map((obj: any) => 
  <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(6)].map((val, index) =>
  <Skeleton key={index}/>)

  return (
    <div className="container">
    <div className="content__top">
            <Categories value={categoryId} setCategory={onChangeCategory}/>
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          {status === 'error' ? <div className='content__error-info'>
            <h2>Пиццы не отобразились</h2>
            <p>Видимо что то не так...</p>
          </div> : <div className="content__items">
            { status === 'loading' ? skeletons : pizzas}
          </div>}
          <Pagination value={currentPage} onChangePage={onChangePage}/>
    </div>
  )
}

export default Home