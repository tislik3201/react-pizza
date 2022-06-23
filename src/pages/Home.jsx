import {React, useState, useEffect, useContext} from 'react'
import Skeleton from '../components/PizzaBlock/Skeleton'
import PizzaBlock from '../components/PizzaBlock'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'

function Home() {
  const{searchValue} = useContext(SearchContext)
    const [items, setItems] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortType, setSortType] = useState({
      name: 'популярности', sortProperty:'rating'
    })


    useEffect(() => {
      setLoading(true)
        const category = categoryId > 0 ? `&category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        fetch(`https://62ae0fa7b735b6d16a3e5009.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sortProperty}&order=desc ${search}` )
        .then((res)=> res.json())
        .then((arr)=> {
        setItems(arr);
        setLoading(false)
    })
    window.scrollTo(0, 0);
  },[categoryId, sortType, searchValue, currentPage])

  const pizzas =  items.map((obj) => 
  <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(6)].map((val, index) =>
  <Skeleton key={index}/>)

  return (
    <div className="container">
    <div className="content__top">
            <Categories value={categoryId} setCategory={setCategoryId}/>
            <Sort sortValue={sortType} setSort={setSortType}/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            { isLoading ? skeletons : pizzas}
          </div>
          <Pagination onChangePage={number => setCurrentPage(number)}/>
    </div>
  )
}

export default Home