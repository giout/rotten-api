import 'dotenv/config'
import app from './config/app'

const port = process.env.PORT || 0

app.listen(port, () => {
    console.log('Listening on port', port)
})