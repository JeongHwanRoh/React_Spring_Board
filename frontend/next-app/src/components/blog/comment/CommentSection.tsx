'use client'

import PostComment from "@/components/blog/comment/PostComment"
import PostCommentEditor from "@/components/blog/comment/PostCommentEditor"
import { useState } from "react"

type CommentType = {
  id: number;
  author: string;
  text: string;
  created_at: string;
};


export default function CommentSection({postId, intitialComments}:{
    postId:number
    intitialComments:CommentType[]
}){

    const [comments, setComments] = useState(intitialComments)

    const refreshComments = async () => {
        const res = await fetch(`http://localhost:8089/api/blog/comments/${postId}`, { cache: 'no-store' });
        const data = await res.json();
        setComments(data);
    }


    return(
        <>
        <PostCommentEditor postId={postId} onCommentSubmit={refreshComments}/>
        <div>
        {comments.map((comment : any)=> {
          return(
           <PostComment 
           key={comment.id} 
           id={comment.id} 
           author={comment.author} 
           comment={comment.text} 
           created_at = {comment.created_at}
            onDelete={refreshComments}
           />
          )
        })

        }
      </div>
        </>

    )

}