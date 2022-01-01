import { useState, useEffect } from 'react'

const FormItem = ({ item, setLS }) => {
  const [value, setValue] = useState('')
  const [toched, setToched] = useState(false)
  const [error, setError] = useState('Обязательное поле')

  const blurHandler = (event) => {
    if (event.target.name == item.id) {
      setToched(true)
    }
  }

  const InputHandler = (event) => {
    setValue(event.target.value)
    if (event.target.value.length < 2 || event.target.value.length > 15) {
      setError('Не больше 15 и не меньше 2 символов')
      if (!event.target.value) {
        setError('Обязательное поле')
      }
    } else {
      setError('')
    }
  }

  useEffect(() => {
    if (!error) {
      setLS(item.question, value)
    }
  }, [value])

  return (
    <>
      <label htmlFor={item.id}>{item.question}</label>
      <input
        type='text'
        name={item.id}
        value={value}
        onChange={(event) => InputHandler(event)}
        onBlur={(event) => blurHandler(event)}
        required
      />
      {toched && error && <span className='error'>{error}</span>}
    </>
  )
}

export default FormItem
