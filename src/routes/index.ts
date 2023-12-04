import { Router } from "express"
import authRouter from './auth'
import ratingRouter from './ratings'
import userRouter from './users'
import genreRouter from './genres'
import commentRouter from './comments'
import reviewRouter from './reviews'
import showRouter from './shows'
import movieRouter from './movies'

const router = Router()

router.use('/auth', authRouter)
router.use('/ratings', ratingRouter)
router.use('/users', userRouter)
router.use('/genres', genreRouter)
router.use('/comments', commentRouter)
router.use('/reviews', reviewRouter)
router.use('/shows', showRouter)
router.use('/movies', movieRouter)

export default router