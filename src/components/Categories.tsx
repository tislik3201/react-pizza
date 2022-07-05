import React from 'react'

type CategoriesProps = {
  value: number,
  setCategory: (i: number) => void
}

const Categories: React.FC<CategoriesProps> = React.memo(({value, setCategory}) => {
  
  const categories = ['Все', 'мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  const onClickCategory = (index: number) => {
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
})

export default Categories