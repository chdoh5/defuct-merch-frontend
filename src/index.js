//vars 
const container = document.querySelector('.card');
const row = document.getElementById('first-row');
let card
let user = ""
let username
const userInput = document.getElementById('login-input');
const loginButton = document.getElementById('login-submit');
const loginForm = document.getElementById('login-form');

const fetchProducts =() => {
    
    fetch('http://localhost:3000/products')
    .then( resp => resp.json() )
    .then( product => renderProducts(product) )
    
}

const renderProducts = (product) => {
    product.forEach(product => {
        // const card=`<div class="card"><h2>${product.name}</h2><img src="${product.image_url}"></div>`

       const card=`<img src="${product.image_url}" class="card-img-top" alt="...">
       <div class="card-body">
         <h5 class="card-title">${product.name}</h5>
         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        
       </div>`
        container.innerHTML += card 
    })
}

// const userLogin
// let user = ""
// hit submit if value takes value 
// do a fetch post to backend
// findorcreateby on backend
// render in json 
// feed return value into new function 
// set user = "name" 
// set form to display=block (show) none (hide) 


const fetchCurrentUser = () => {
username = userInput.value
event.preventDefault()
if(username==""){
    alert("Please enter username")
} else {
    fetch('http://localhost:3000/users')
        .then( resp => resp.json() )
        .then( currentUserData => renderCurrentUser(currentUserData) )
}}
    


const renderCurrentUser = (currentUserData) => {
    const userList = currentUserData.filter(data => data.username == userInput.value)
    
    if (userList[0]){
        console.log("ture")
        loginForm.innerHTML=`Welcome Back ${username}!`
    } else {
        
        postNewUser()
    }
}

const postNewUser = () => {
    fetch('http://localhost:3000/users', createNewUser(username) )
        .then( resp => resp.json() )
        .then( newUserData => renderNewUser(newUserData) )
}


function createNewUser(username) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: username
      })
    }
  }

const renderNewUser = (newUserData) => {
    loginForm.innerHTML=`Welcome ${username}!`
}


//event listeners
loginButton.addEventListener('click', fetchCurrentUser)

//run it 
fetchProducts()