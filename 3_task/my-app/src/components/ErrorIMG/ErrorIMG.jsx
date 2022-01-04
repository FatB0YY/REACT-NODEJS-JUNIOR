import img from './error.png'

const ErrorIMG = () => {
  const style = {
    display: 'block',
    width: '250px',
    height: '250px',
    objectFit: 'contain',
    margin: '0 auto',
  }

  return <img style={style} src={img} alt='error' />
}

export default ErrorIMG

