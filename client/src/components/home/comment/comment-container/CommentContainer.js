import React, {useState, useEffect} from 'react'
import Comment from '../Comment'
import CreateComment from '../create-comment/CreateComment'

const CommentContainer = ({data}) => {
    const [comments, setComments] = useState(data.comments)

    useEffect(()=>{

    }, [comments])


    return (
        <div>
            <hr/>
            {comments.map(comment=>(
                <Comment key={comment.message} comment={comment}/>
            ))}
            <CreateComment data={data} comments={comments} setComments={setComments}/>
        </div>
    )
}

export default CommentContainer
