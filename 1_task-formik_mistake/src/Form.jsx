import { Formik, Form, Field, ErrorMessage, useField } from 'formik'
import * as Yup from 'yup'

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <Field type='text' {...props} {...field} />
      {meta.touched && meta.error ? (
        <ErrorMessage className='error' name={props.name} component='div' />
      ) : null}
    </>
  )
}

const MyForm = () => {
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

  return (
    <Formik
      initialValues={{
        'Сколько вам лет?': '',
        'Как вас зовут?': '',
        'В каком городе вы живете?': '',
        'Ваш любимый цвет?': '',
        'У вас есть собака?': '',
        'Любимая музыка?': '',
      }}
      validationSchema={Yup.object({
        'Сколько вам лет?': Yup.number()
          .min(18, 'Минимум 18 лет')
          .max(150, 'Максимум 150 лет')
          .integer('Только целые числа')
          .required('Обязательное поле'),
        'Как вас зовут?': Yup.string()
          .min(3, 'Минимум 3 символа')
          .max(30, 'Максимум 30 символов')
          .required('Обязательное поле'),
        'В каком городе вы живете?': Yup.string()
          .min(3, 'Минимум 3 символа')
          .max(30, 'Максимум 30 символов')
          .required('Обязательное поле'),
        'Ваш любимый цвет?': Yup.string()
          .min(3, 'Минимум 3 символа')
          .max(30, 'Максимум 30 символов')
          .required('Обязательное поле'),
        'У вас есть собака?': Yup.string()
          .min(3, 'Минимум 3 символа')
          .max(30, 'Максимум 30 символов')
          .required('Обязательное поле'),
        'Любимая музыка?': Yup.string()
          .min(3, 'Минимум 3 символа')
          .max(30, 'Максимум 30 символов')
          .required('Обязательное поле'),
      })}
      onSubmit={(values) => {
          localStorage.clear()
        //   localStorage.setItem(JSON.stringify(values, null, 2))
          console.log(localStorage);
      }}
    >
      {({ isSubmitting }) => (
        <Form className='form'>
          <h2>Форма</h2>

          {data.data.map((item) => {
            return (
              <MyTextInput
                key={item.id}
                label={item.question}
                name={item.question}
                type='text'
              />
            )
          })}

          <button disabled={isSubmitting} type='submit'>
            Отправить
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default MyForm
