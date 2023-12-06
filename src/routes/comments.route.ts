import { Router } from "express"
import { authentication } from "../middlewares/auth.middleware"
import { deleteComment, getCommentById, postComment } from "../controllers/comments.controller"

const router = Router()

router.use(authentication) // protected route

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
router.post('/', postComment)

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