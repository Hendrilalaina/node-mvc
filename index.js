const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("Home page")
})

app.get('/products', (req, res) => {
    res.send("Products page")
})

const port = 3000
app.listen(port, () => {
    console.log(`App is running in port ${port}`)
})