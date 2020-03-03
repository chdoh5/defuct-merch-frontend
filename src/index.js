//vars 
const container = document.querySelector('.row');
const row = document.getElementById('first-row');
let card
let user = ""
let username
const userInput = document.getElementById('login-input');
const loginButton = document.getElementById('login-submit');
const loginForm = document.getElementById('login-form');
const productDetailContainer = document.getElementById('product-detail')
const cartDropdown = document.getElementById('cart-dropdown')
const dropdownButton = document.getElementById('navbarDropdown')

const fetchProducts =() => {
    
    fetch('http://localhost:3000/products')
    .then( resp => resp.json() )
    .then( product => renderProducts(product) )
    
}

// const renderProducts = (product) => {
//     product.forEach(product => {
//        const card=`<div id="product-card" data-id=${product.id}><img data-id=${product.id} src="${product.image_url}" class="card-img-top" alt="...">
//        <div class="card-body">
//          <h5 class="card-title">${product.name}</h5>
//          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        
//        </div></div>`
//         container.innerHTML += card 
//     })
// }

const renderProducts = product => {
    product.forEach(product => {
      // console.log(product);
      const card = `
      <div class="product-column col-lg-3 col-md-6">   
      <div class="card">
            <div class="card-header">
              <h3>${product.name}</h3>
            </div>
            <div class="card-body">
            <img class="card-img-top" src=${product.image_url}>
              <h2 class="price-text">$${product.price}</h2>
              <button class="see-more-button" data-id="${product.id} class="btn btn-lg btn-block btn-outline-dark" type="button">See More...</button>
            </div>
            </div>`;
      container.innerHTML += card;
    });
  };

const fetchOneProduct = () => {
    const clicked = event.target
    const productId = clicked.dataset.id
    if(clicked.className=="see-more-button") {
    fetch(`http://localhost:3000/products/${productId}`)
        .then( resp => resp.json() )
        .then( oneProductData => renderOneProduct(oneProductData) )
    }
}

const renderOneProduct = (oneProductData) => {
    const productInfo = oneProductData.data.attributes
    const oneProductDetailCard = `<h1>${productInfo.name}</h1>
    <img src=${productInfo.image_url} >
    <h3>$${productInfo.price}</h3>
    <p>${productInfo.description}</p>
    <a class="nav-link" href="#product-detail">
    <button id="add-to-cart" data-id=${productInfo.id} class="btn btn-info">
      Add to Cart
    </button></a>`
    productDetailContainer.innerHTML = oneProductDetailCard
    
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
    user = userList
    
    if (userList[0]){
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

const fetchCarts = () => {
    fetch('http://localhost:3000/carts')
        .then(resp => resp.json() )
        .then( cartData => renderCarts(cartData) )
        
}

const renderCarts = (cartData) => {

}


//event listeners
loginButton.addEventListener('click', fetchCurrentUser)
container.addEventListener('click', fetchOneProduct)
// dropdownButton.addEventListener('click', fetchCarts)

//run it 
fetchProducts()
