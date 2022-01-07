import { useCallback } from "react"

const Comment = ({value, date}) => {
  return (
    <div className='comment'>
      <div className='comment__header header-comment'>
        <span className='header-comment__user'>You</span>
        <span className='header-comment__data'>{date}</span>
      </div>
      <div className='comment__body body-comment'>
        <p>{value}</p>
      </div>
    </div>
  )
}

export default Comment
