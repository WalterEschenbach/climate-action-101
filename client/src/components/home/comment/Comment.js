import React from 'react'

const Comment = ({comment}) => {
    return (
        <div>
            <h3>{comment.author?.name}</h3>
            <p>{comment.message}</p>
            <hr/>
        </div>
    )
}

export default Comment
