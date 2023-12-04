import { Router } from "express"

const router = Router()

/* create review 
req: {
    userId: number,
    mediaId: number,
    content: string
},
res: {
    id: number,
    userId: number,
    mediaId: number,
    content: string,
    date: string
}
*/
router.post('/')

/* delete review 
*/
router.delete('/:id')

export default router