const express = require('express')
var cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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

// User data
const user = {username: `admin`, password: `password123`};


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/getMenu', (req, res) => {
    console.log(`gn2 /getMenu`)
    //reach out to the db to get menu
    res.json(menu)
  })

  app.post('/login', (req, res) => {
    console.log(`gn2 /login`, typeof req.body)

    const {password, username} = req.body;
    //check user login

    console.log(`username`, username);
    console.log(`password`, password);

    if(username != user.username || password != user.password) {
      res.status(400).json({message: "Not Authorized"});
    
    }

  // res.json(menu)
    res.status(200).json({message: `Success`, menu:menu})

  
  })  

app.listen(3000), () => {
  console.log('server listening on port 3000')
}