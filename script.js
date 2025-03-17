// User data
const user = {username: `admin`, password: `password123`};

// Cart Data global variable for cart as an array
const cart = [];



// Store logged in user

let loggedInUser = null;


//create function to handle login

function handleLogin(event) {

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

    //compare user input to database should use if statement
    console.log(`user.username`, user.username)
    console.log(`user.password`, user.password)
    if(user.username !== username || user.password !== password) {
       alert(`The information you entered is incorrect`);
       return;
    }

    else {
        loggedInUser = user;
        console.log(`loggedInUser`, loggedInUser);
    }

    let welcomeMessageElement = document.getElementById(`welcome-message`);
    welcomeMessageElement.innerText = `Welcome ${loggedInUser.username}`;
    
}

// START ADD TO CART SECTION END USER LOG

function addToCart(item, price) {
    console.log(`cart`, cart);
    console.log(`item`,item);
    console.log(`price`,price);

    let totalCost = 0;

    if(cart.length === 0) {
        const objectToInsert = {
            drink: item, 
            cost: price,
            qty: 1
        }
        cart.push(objectToInsert)
    }

    else {

    // to find if object already exists in the cart

    for (let index = 0; index < cart.length; index++) {


            if(cart[index].drink === item) {
                cart[index].qty++;
            }


        else{
            const objectToInsert = {
                drink: item, 
                cost: price,
                qty: 1
            }
            cart.push(objectToInsert)
        }
  }

  console.log(`cart`, cart)
}

    // console.log(`my object to insert`, objectToInsert);

    // cart.push(objectToInsert);
    // console.log(`cart pushed`, cart); 
    // probably incorrect, jumping around in the lesson

    let ulElement = document.getElementById("cart-items");
    ulElement.innerHTML = ''
    let liElement = document.createElement('li');
    console.log(`liElement`, liElement);

    for (let index = 0; index < cart.length; index++) {
        console.log('index', index);
        console.log('cart index', cart[index]);

        totalCost += cart[index].cost;

        liElement.innerText = `Item: ${cart[index].drink}, Price: $${cart[index].cost.toFixed(2)}, Qty: ${cart[index].qty}`;
        ulElement.appendChild(liElement);
    }
    console.log(`totalCost`, totalCost);

    let totalElement = document.getElementById(`total`);
        totalElement.innerText = totalCost.toFixed(2);
}