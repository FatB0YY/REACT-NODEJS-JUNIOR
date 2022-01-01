import React, { useState } from 'react'
import FormItem from './FormItem'

const Form = () => {
  const data = {
    data: [
      { question: 'Сколько вам лет?', id: 1 },
      { question: 'Как вас зовут?', id: 2 },
      { question: 'В каком городе вы живете?', id: 3 },
      { question: 'Ваш любимый цвет?', id: 4 },
      { question: 'У вас есть собака?', id: 5 },
      { question: 'Любимая музыка?', id: 6 },
    ],
  }

  const [values, setValues] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const updateData = (questionInput, valueInput) => {
    const obj = { ...values, [questionInput]: valueInput }
    setValues(obj)
  }

  const setLS = (event) => {
    event.preventDefault()
    localStorage.setItem('data', JSON.stringify(values, null, 2))
    setIsSubmit(true)
  }

  return (
    <form className='form' onSubmit={(event) => setLS(event)}>
      <h2>Форма</h2>
      {data.data.map((item) => (
        <FormItem item={item} key={item.id} setLS={updateData} />
      ))}

      {!isSubmit ? (
        <button type='submit'>Отправить</button>
      ) : (
        <span style={{ color: 'green' }}>Форма отправленна</span>
      )}
    </form>
  )
}

export default Form
