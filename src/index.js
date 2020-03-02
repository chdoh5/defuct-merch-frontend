//vars 
const container = document.querySelector('.card');
const row = document.getElementById('first-row');
let card

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








//event listeners


//run it 
fetchProducts()