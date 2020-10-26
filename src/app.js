const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars enginer and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App', 
        name: 'Josh'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me', 
        name: 'Josh'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help', 
        helpText: 'This is some helpful text',
        name: 'Josh'
    })
})

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('/help', (req, res)=>{
//     res.send({
//         name: 'Andrew',
//         age: 27
//     })
// })

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
        return
    }

    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/product', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404', 
        errorMessage: 'Help Article not found',
        name: 'Josh'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404', 
        errorMessage: 'My 404 page',
        name: 'Josh'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})