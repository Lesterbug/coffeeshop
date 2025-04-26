// Cart Data global variable for cart as an array
const cart = [];



// Store logged in user

let loggedInUser = null;


//create function to handle login

async function handleLogin(event) {

    // must prevent default refresh using event.preventdefault();
    event.preventDefault();

    // need to get into the document by id, so we must use DOM, but to do this we must construct the variable

    const usernameElement = document.getElementById(`username`);

    // log what is happening... log from the document the text username and placeholder, then log usernameElement
    // which is what the username entered into the ID 

    console.log(`username`,usernameElement);

    // Now we must const a variable (username) and place the value the user inputted into the form into a variable username
    const username = usernameElement.value;

    //log what is happening
    console.log(`username`,username);
    const passwordElement = document.getElementById(`password`);
    console.log(`password`,passwordElement);
    const password = passwordElement.value;
    console.log(`password`, password);


//ISSUES HERE HARRASS FOLKS
    const response = await fetch('http://localhost:3000/login',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })

if(!response.ok){
    alert(`invalid credentials`)

}

let responseJson = await response.json()
console.log(`responseJson`, responseJson)

    let welcomeMessageElement = document.getElementById(`welcome-message`);
    welcomeMessageElement.innerText = `Welcome ${username}`;
    
}


function createMenu(menu){
    let ulElement = document.getElementById("menu");
    ulElement.style.listStyleType = 'none';
    if(menu && menu.length > 0){
        for (let i = 0; i < menu.length; i++) {
            const liElement = document.createElement('li')
            liElement.innerHTML = `
            <div class= "menu-item">
            <span id="${menu[i].name}">${menu[i].name}</span>
            <button onclick="addToCart('${menu[i].name}', '${menu[i].price}')">Add To Cart ($${menu[i].price.toFixed(2)})</button>

            </div>
         `;
         ulElement.appendChild(liElement);
        }
    }

}

function addToCart(name, price){
    console.log('item in addToCart', name, price)

    price = parseFloat(price);

    // If the cart is empty, add the first item directly
    if(cart.length === 0){
        const objectToInsert = {
            drink: name,
            cost: price,
            quantity: 1
        }
        cart.push(objectToInsert)
    }
    // if cart is not empty, we need to check if the passed in item exists
    else{

        // you will see booleans created like this pretty often. it's typically called a flag.  
        let itemExists = false;

        // check if item already exists in cart. if it is then increase the quantity and set the flag to true
        // you will notice 'break'.  this is a keyword in javascript.  it breaks out of the loop.  it is used here to break out as soon if the item is found since there is no need to keep going. unlike return, which would exit the entire function, break just exits the loop
        for (let index = 0; index < cart.length; index++) {
            if(cart[index].drink === name){
                cart[index].quantity++
                itemExists = true
                break
            }
        }

        // if there are items in the cart, but this item does not exist, add it to the cart
        if(!itemExists){
            const objectToInsert = {
                drink: name,
                cost: price,
                quantity: 1
            }
            cart.push(objectToInsert)
        }
    }
    
    // call (invoke) the updateCart() function.  we orginally had the updateCart() code in the addToCart() function, but it is more readable to separate it out. 
    updateCart()

}



function updateCart() {

    //set total cost to zero
    let totalCost = 0;

    let ulElement = document.getElementById("cart-items");
    ulElement.innerHTML = "";
    

    for (let index = 0; index < cart.length; index++) {
        console.log('index', index);
        console.log('cart index', cart[index]);

        totalCost += cart[index].cost * cart[index].quantity;

        const liElement = document.createElement('li');
        liElement.innerHTML = `Item: ${cart[index].drink}, Price: $${cart[index].cost.toFixed(2)}, Qty: ${cart[index].quantity};
        <button onclick="removeQty(${index})">-</button><button onclick="addQty(${index})">+</button><button onclick="removeItem(${index})">Remove</button>`                
        ulElement.appendChild(liElement);
        console.log(`liElement`, liElement);
    }
    console.log(`totalCost`, totalCost);

    let totalElement = document.getElementById(`total`);
        totalElement.innerText = totalCost.toFixed(2);
}

function removeItem(index){
cart.splice(index, 1);
updateCart();
}

function addQty(index) {
    cart[index].quantity++;
    updateCart()
} 
function removeQty(index) {
    if (cart[index].quantity === 1) {
        removeItem(index)
    } else {
    cart[index].quantity--
    updateCart()
    }
} 

// Function to handle checkout
// this function just empties the cart.  this is where you would add a payment system. 
// i did add a ternary operator on the alert.  

// ${loggedInUser && loggedInUser.username ? loggedInUser.username : 'Human'} - this bit is saying 'if loggedInUser is exists AND loggedInUser.username exists then display the value of loggedInUser.username.  if loggedInUser doesnt exist OR loggedInUser.username doesnt exist the display Human.  so you can think of the ? as an if and the : as an else.  you can have very long and confusing ternary operators so in most cases an if/else block might be a better way to go...for now :)
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert(`Thank you for your purchase, ${loggedInUser && loggedInUser.username ? loggedInUser.username : 'Human'}!`);
    cart.length = 0;
    updateCart();
}

// function getUserLocation(){
//     console.log(`getUserLocation`)
//     if (navigator.geolocation) {
//         // get the user's current position
//         navigator.geolocation.getCurrentPosition(function(position){
//             console.log(`position`, position)
//             const latitude = position.coords.latitutde;
//             const longitude = position.coords.longitude;

            //now that we have coordinates, we can use them to fetch weather data

//             getWeather(latitude, longitude);
//         }, function(error) {
//             console.log("Error getting geolocation: " + error.message);
//         }
//     )
//     }
// }

function practiceGetRoute() {
    const response = fetch(`http://localhost:3000`)
    console.log(`response`, response)
}

async function getMenuFromServer() {
    const response = await fetch(`http://localhost:3000/getMenu`)
    console.log(`response`, response)
    if(response.status !=200) {
        console.error(`response error not ok`)
        return;
    }
    
    let data = await response.json();
    console.log(`data`, data);

    createMenu(data);
}

document.addEventListener("DOMContentLoaded", function() {
    // createMenu();
    // getUserLocation();
    getMenuFromServer();
});