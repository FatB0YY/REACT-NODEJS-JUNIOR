import img404 from '../../img/404.png'

import './404.scss'

const Page404 = () => {
  return (
    <section className='not-found'>
      <div className='not-found__block'>
        <h1>Ты заблудился</h1>
        <p>
          мы не можем найти страницу, <br /> которую ты ищешь
        </p>
        <img src={img404} alt="404 page" />
      </div>
    </section>
  )
}

export default Page404
