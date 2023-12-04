import { Router } from "express"

const router = Router()

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
router.post('/')

/* delete comment 
*/
router.delete('/:id')

export default router