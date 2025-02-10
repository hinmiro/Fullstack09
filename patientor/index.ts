import app from './app'

const PORT = 3001
const host = '127.0.0.1'




app.listen(PORT, host, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
})
