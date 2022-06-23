import React from 'react'

function Categories({value, setCategory}) {
  
  const categories = ['Все', 'мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  const onClickCategory = (index) => {
    setCategory(index)
    
  }
  return (
    <div className="categories">
              <ul>
                {categories.map((val, i) => (
                  <li key={i} onClick = {() => onClickCategory(i)} className={value === i ? "active" : ''}>{val}</li>
                ))}
              </ul>
            </div>
  )
}

export default Categories