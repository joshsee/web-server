const path = require('path')
const express = require('express')
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

app.set('view engine', 'hbs')

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App', 
        name: 'Josh'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'Weather App', 
        name: 'Josh'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Weather App', 
        helpText: 'This is some helpful text',
        name: 'Josh'
    })
})

app.use(express.static(publicDirectoryPath))

// app.get('/help', (req, res)=>{
//     res.send({
//         name: 'Andrew',
//         age: 27
//     })
// })

app.get('/weather', (req, res)=>{
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})