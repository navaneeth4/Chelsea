const path = require('path')
const express = require('express')
const cfc = require('./db/data')
require("./db/data")

const app=express()
const bodyParser = require("body-parser")

app.use(express.json())
const publicDirectoryPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Londons best',
        name: 'Chelsea'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Club',
        name: 'Navaneeth'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Chelsea Football Club is an English professional football club based in Fulham, West London. Founded in 1905, they play their home games at Stamford Bridge.'
    })
})

app.get('/player', async (req, res) => {

    try {
    const cfcData = await cfc.find({})
    res.render('new', { data: cfcData })
        } catch (error) {
    console.log(error)
  }
})

app.post("/cfc", async (req, res) => {
    
    const { name,age,position,nationality } = req.body 
    const data = req.body
    console.log(data)
    const CFC = await cfc.create(data)
    res.redirect('/new')
    // res.send({ data: cfc })

})

//postman
app.get('/cfcs', async (req, res) => {
    try {
        const CFC = await cfc.find({})
        res.send({ data: CFC })

    } catch (error) {
        console.log(error)

    }
})

app.get('/new', async (req, res) => {
    try {
      const cfcData = await cfc.find({})
      res.render('new', { data: cfcData })
    } catch (error) {
      console.log(error)
    }
  })
  
app.delete('/cfc/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await cfc.deleteOne({ _id: id })
      res.redirect('/new')
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Internal server error' })
    }
  })


app.get('*',(req,res)=>{
    res.send("Erorr 404")
})

app.listen(3000, () => {
    console.log('Server is up')
})
