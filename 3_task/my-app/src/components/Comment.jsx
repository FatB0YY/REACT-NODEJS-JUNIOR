import { useCallback } from "react"

const Comment = ({obj, comments}) => {
  return (
    <div className='comment'>
      <div className='comment__header header-comment'>
        <span className='header-comment__user'>You</span>
        <span className='header-comment__data'>{obj}</span>
      </div>
      <div className='comment__body body-comment'>
        <p>{comments[obj]}</p>
      </div>
    </div>
  )
}

export default Comment
