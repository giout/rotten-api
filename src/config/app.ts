import express from 'express'
import cors from 'cors'
import { errorHandler } from '../middlewares/error.middleware'

const app = express()

app.use(cors())
app.use(errorHandler)

export default app