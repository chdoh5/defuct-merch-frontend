//vars 
const container = document.querySelector('.container');
const row = document.getElementById('first-row');
let card

const fetchProducts =() => {
    
    fetch('http://localhost:3000/products')
    .then( resp => resp.json() )
    .then( product => renderProducts(product) )
    
}

const renderProducts = (product) => {
    product.forEach(product => {
        const card=`<div class="card"><h2>${product.name}</h2></div>`
        container.innerHTML += card 
    })
}



//functions
// function fetchProducts(){
//     fetch('http://localhost:3000/products')
//         .then( resp => resp.json() )
//         .then( products => {
//             products.data.attributes.forEach(function(product){
//                 const card = `<div class="card"><h2>${product.name}</h2></div>`
//                 container.innerHTML += card
//             })
//         })
//     }

// const renderProducts = (productData) => {
//     productData.data.forEach( product =>{
//          card = `<div class="card" data-id=${product.id}><p>${product.name}</p></div>`
//     })
//     container.innerHTML += card
// }




//event listeners


//run it 
fetchProducts()