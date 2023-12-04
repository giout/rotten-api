import { Router } from "express"
import authRouter from './auth.route'
import ratingRouter from './ratings.route'
import userRouter from './users.route'
import genreRouter from './genres.route'
import commentRouter from './comments.route'
import reviewRouter from './reviews.route'
import showRouter from './shows.route'
import movieRouter from './movies.route'

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