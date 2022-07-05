import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import Skeleton from './PizzaBlock/Skeleton'
    
const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string,
        title: string,
        price: number
    }>()
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://62ae0fa7b735b6d16a3e5009.mockapi.io/items/' + id)
                setPizza(data)
            } catch (error) {
                alert(error)
                navigate('/')
            }
        }
        fetchPizza()
    },[])   

    if(!pizza) {
        return <div className="fullPizza__container"><Skeleton /></div>
    }

  return (
    <div className='fullPizza__container'>
        <img className='fullPizza__img' src={pizza.imageUrl} alt="pizza" />
        <h2>{pizza.title}</h2>
        <h4>{pizza.price} руб</h4>
    </div>
  )
}

export default FullPizza