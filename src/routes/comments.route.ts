import { Router } from "express"
import { authentication } from "../middlewares/auth.middleware"
import { deleteComment, getAllComments, getCommentById, postComment } from "../controllers/comments.controller"

const router = Router()

router.use(authentication) // protected route

router.route('/')

/* get all comments
res: [{
    id: number,
    userId: number,
    reviewId: number,
    content: string,
    date: string
}, ...]
*/
.get(getAllComments)

/* create comment 
req: {
    userId: number,
    reviewId: number,
    content: string
},
res: {
    id: number,
    userId: number,
    reviewId: number,
    content: string,
    date: string
}
*/
.post(postComment)

router.route('/:id')

/* get comment by id
res: {
    id: number,
    userId: number,
    reviewId: number,
    content: string,
    date: string 
}
*/
.get(getCommentById)

/* delete comment 
*/
.delete(deleteComment)

export default router