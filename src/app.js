const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Marriam'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'Abouttt Page',
        name: 'Marriam'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        HelpMessage: 'This is a help page. You contact it if you need any kind of guidance or are facing any problem.',
        title: 'Help Page',
        name: 'Marriam'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
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

app.get('/products', (req,res)=> {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=> {
    res.render('404Page', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Marriam'
    }) 
})

app.get('*', (req,res)=> {
    res.render('404Page', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Marriam'
    }) 
})


//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
    console.log('Server is up on port 3000')
})