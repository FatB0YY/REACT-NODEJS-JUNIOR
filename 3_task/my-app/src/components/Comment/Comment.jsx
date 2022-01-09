import deleteIcon from '../img/trash-alt-solid.svg'

import './comment.scss'

const Comment = ({ comment, remove }) => {
  return (
    <div className='comment'>
      <div className='comment__header header-comment'>
        <div>
          <span className='header-comment__user'>You</span>
          <span className='header-comment__data'>{comment.date}</span>
        </div>

        <button className='btn-delete' onClick={() => remove(comment)}>
          <img src={deleteIcon} alt='deleteIcon' />
        </button>
      </div>
      <div className='comment__body body-comment'>
        <p>{comment.value}</p>
      </div>
    </div>
  )
}

export default Comment
