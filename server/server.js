const express = require('express')
var cors = require('cors')

const app = express()
app.use(cors())

const menu = [
    {
        name: 'Americano', 
        price: 2.5, 
        type: 'hot',
    },
    {name: 'Latte', price: 3.0, type: 'hot'},
    {name: 'Cappuccino', price: 3.5, type: 'hot'},
    {name: 'Frozen Americano', price: 4.5, type: 'cold'},
    {name: 'Frozen Latte', price: 2.5, type: 'cold'},
    {name: 'Pup Cup', price: 0, type: 'cold'},
];




app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/getMenu', (req, res) => {
    console.log(`gn2 /getMenu`)
    //reach out to the db to get menu
    res.json(menu)
  })

app.listen(3000)