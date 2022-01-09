import { memo } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Comment from '../Comment/Comment'

const CommentsList = memo(({ comments, removeComment }) => {
  console.log('2')
  return (
    <TransitionGroup>
      {comments.map((item) => (
        <CSSTransition key={item.id} timeout={380} classNames='comment'>
          <Comment comment={item} remove={removeComment} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
})

export default CommentsList
