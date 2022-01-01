import { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage, useField } from 'formik'
import * as Yup from 'yup'
// yup-phone очень много весит (600К)
import 'yup-phone'
import IMask from 'imask'
import Swal from 'sweetalert2'

const MyTextInput = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <>
      <Field type='text' placeholder={placeholder} {...props} {...field} />
      {meta.touched && meta.error ? (
        <ErrorMessage className='error' name={props.name} component='div' />
      ) : null}
    </>
  )
}

const Basic = () => {
  useEffect(() => {
    const phoneMask = IMask(document.getElementById('phone-mask'), {
      mask: '+{7}(000)000-00-00',
    })

    // я пытался :(
    // let dateMask = IMask(
    //   document.getElementById('date-mask'),
    //   {
    //     mask: Date,
    //     min: new Date(1990, 0, 1),
    //     max: new Date(2022, 0, 1),
    //     lazy: false
    //   });
  })

  return (
    <Formik
      initialValues={{
        surname: '',
        name: '',
        patronymic: '',
        email: '',
        birthday: '',
        gender: '',
        telNumber: '',
        customerGroup: '',
        doctorName: '',
        sendSms: false,
        country: '',
        area: '',
        city: '',
        street: '',
        home: '',
        index: '',
        documentType: '',
        docSeries: '',
        docNumber: '',
        issued: '',
        dataIssued: '',
      }}
      validationSchema={Yup.object({
        surname: Yup.string()
          .min(2, 'Минимум 2 символа')
          .max(25, 'Максимум 25 символов')
          .required('Обязательное поле'),
        name: Yup.string()
          .min(2, 'Минимум 2 символа')
          .max(25, 'Максимум 25 символов')
          .required('Обязательное поле'),
        patronymic: Yup.string()
          .min(2, 'Минимум 2 символа')
          .max(25, 'Максимум 25 символов'),
        email: Yup.string()
          .email('Некорректный email')
          .max(30, 'Максимум 25 символов')
          .required('Обязательное поле'),
        birthday: Yup.string().required('Обязательное поле'),
        gender: Yup.string().required('Выберите пол'),
        telNumber: Yup.string()
          .phone('RU', false, 'Некорректный номер телефона')
          .required(),
        customerGroup: Yup.string().required('Выберите группу клиентов'),
        doctorName: Yup.string().required('Выберите врача'),
        country: Yup.string()
          .min(2, 'Минимум 2 символа')
          .max(25, 'Максимум 25 символов')
          .required('Обязательное поле'),
        area: Yup.string()
          .min(2, 'Минимум 2 символа')
          .max(25, 'Максимум 25 символов')
          .required('Обязательное поле'),
        city: Yup.string()
          .min(2, 'Минимум 2 символа')
          .max(25, 'Максимум 25 символов')
          .required('Обязательное поле'),
        street: Yup.string()
          .min(2, 'Минимум 2 символа')
          .max(25, 'Максимум 25 символов')
          .required('Обязательное поле'),
        home: Yup.string()
          .min(2, 'Минимум 2 символа')
          .max(25, 'Максимум 25 символов')
          .required('Обязательное поле'),
        index: Yup.string()
          .min(2, 'Минимум 2 символа')
          .max(25, 'Максимум 25 символов')
          .required('Обязательное поле'),
        documentType: Yup.string().required('Обязательное поле'),
        docSeries: Yup.string()
          .min(2, 'Минимум 2 символа')
          .max(25, 'Максимум 25 символов')
          .required('Обязательное поле'),
        docNumber: Yup.string()
          .min(2, 'Минимум 2 символа')
          .max(25, 'Максимум 25 символов')
          .required('Обязательное поле'),
        issued: Yup.string()
          .min(2, 'Минимум 2 символа')
          .max(100, 'Максимум 100 символов')
          .required('Обязательное поле'),
        dataIssued: Yup.string()
          .min(2, 'Минимум 2 символа')
          .max(25, 'Максимум 25 символов')
          .required('Обязательное поле'),
      })}
      onSubmit={(values) => {
        console.log(JSON.stringify(values, null, 2))
        Swal.fire(
          'Good job!',
          'Пользователь создан!',
          'success'
        )
      }}
    >
      {({ isSubmitting }) => (
        <Form className='form'>
          <h1>Форма</h1>
          <span className='form__span'>* поля обязательное для заполнения</span>

          <MyTextInput placeholder='*Фамилия' name='surname' />
          <MyTextInput placeholder='*Имя' name='name' />
          <MyTextInput placeholder='Отчество' name='patronymic' />

          <Field name='email' type='email' placeholder='*Ваш email' />
          <ErrorMessage className='error' name='email' component='div' />

          <Field name='birthday' type='date' />
          <ErrorMessage className='error' name='birthday' component='div' />

          <Field id='gender' name='gender' as='select'>
            <option value=''>*Пол</option>
            <option value='Мужской'>Мужской</option>
            <option value='Женский'>Женский</option>
            <option value='Робот'>Робот</option>
          </Field>
          <ErrorMessage className='error' name='gender' component='div' />

          <Field name='telNumber' type='tel' id='phone-mask' placeholder='Номер телефона'/>
          <ErrorMessage className='error' name='telNumber' component='div' />

          <Field id='customerGroup' name='customerGroup' as='select'>
            <option value=''>*Группа клиентов</option>
            <option value='VIP'>VIP</option>
            <option value='OMC'>OMC</option>
            <option value='Проблемные'>Проблемные</option>
          </Field>
          <ErrorMessage className='error' name='customerGroup' component='div' />

          <Field id='doctorName' name='doctorName' as='select'>
            <option value=''>Лечащий врач</option>
            <option value='ИвановАА'>Иванов А.А.</option>
            <option value='ЗахаровСВ'>Захаров С.В</option>
            <option value='ЧернышовЮН'>Чернышов Ю.Н</option>
          </Field>
          <ErrorMessage className='error' name='doctorName' component='div' />

          <label className='checkbox'>
            <Field name='sendSms' type='checkbox' />
            Отправлять СМС
          </label>

          <h2>Адрес:</h2>
          <MyTextInput placeholder='*Страна' name='country' />
          <MyTextInput placeholder='*Область' name='area' />
          <MyTextInput placeholder='*Город' name='city' />
          <MyTextInput placeholder='*Улица' name='street' />
          <MyTextInput placeholder='*Дом' name='home' />
          <MyTextInput placeholder='*Индекс' name='index' />

          <h2>Данные:</h2>
          <Field id='documentType' name='documentType' as='select'>
            <option value=''>*Тип документа</option>
            <option value='Паспорт'>Паспорт</option>
            <option value='Свидетельство'>Свидетельство о рождении</option>
            <option value='Водительское'>Водительское удостоверение</option>
          </Field>
          <ErrorMessage className='error' name='documentType' component='div' />

          <MyTextInput placeholder='*Серия' name='docSeries' />
          <MyTextInput placeholder='*Номер' name='docNumber' />
          <MyTextInput placeholder='*Кем выдан' name='issued' />

          <Field name='dataIssued' type='date' placeholder='Дата выдачи'/>
          <ErrorMessage className='error' name='dataIssued' component='div' />

          <button disabled={isSubmitting} type='submit'>
            Отправить
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default Basic
